// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

contract Greenergy {
    address payable public owner;

    struct Member {
        uint256 id;
        string name;
        string house;
        address payable acc;
        bool active;
    }

    struct Request {
        uint256 memid;
        uint256 reqid;
        bool reqStatus;
    }

    mapping(uint256 => bool) requested; // to check if this account has already made a request
    mapping(uint256 => uint256) idmap; // to update details of an account if the connection is removed

    mapping(address => uint256) addToId;

    uint256 public memberCount;

    uint256 public reqCount;

    Member[] public Members;

    Request[] public Requests;

    uint256 fee;

    constructor() {
        owner = payable(msg.sender);
        addMembers();
    }

    function addMembers() public {
        createMember("Anthony", "A-12");
        createMember("Brian", "B-2");
        createMember("Chris", "C-9");
        createMember("Daniel", "D-3");
        createMember("Ethan", "E-10");
    }

    function createMember(string memory _name, string memory _house) public {
        require(msg.sender == owner, "Only the owner can add members");
        Member memory newMember;
        newMember.id = memberCount + 1;
        newMember.name = _name;
        newMember.house = _house;
        newMember.active = true;
        Members.push(newMember);
        memberCount++;
    }

    function removeMember(uint256 _id) public {
        require(msg.sender == owner, "Only the owner can remove members");
        Members[_id - 1].active = false;
    }

    function addMemberWallet(uint256 _id) public {
        require(_id > 0 && _id <= memberCount, "Invalid ID");
        require(
            Members[_id - 1].active == true,
            "The member account is disabled"
        );
        Members[_id - 1].acc = payable(msg.sender);
        addToId[msg.sender] = _id;
    }

    function requestSolar() public {
        require(
            !requested[addToId[msg.sender] - 1],
            "An active request already exists"
        );
        Request memory req;
        req.memid = addToId[msg.sender];
        req.reqid = reqCount + 1;
        idmap[addToId[msg.sender]] = reqCount + 1;
        req.reqStatus = true;
        Requests.push(req);
        requested[addToId[msg.sender] - 1] = true;
        reqCount++;
    }

    function stopRequest() public {
        require(requested[addToId[msg.sender] - 1], "No active request exists");
        requested[addToId[msg.sender] - 1] = false;
        Requests[idmap[addToId[msg.sender] - 1]].reqStatus = false;
    }

    function payment() public payable {
        require(
            Members[addToId[msg.sender] - 1].active,
            "Only active members have to pay the maintainance amount"
        );
        // if (requested[addToId[msg.sender] - 1]) {
        //     fee = 0.008 ether;
        // } else {
        //     fee = 0.002 ether;
        // }

        fee = 0.005 ether;
        require(msg.value == fee, "Insufficient to cover fees");
    }

    function getMembers() public view returns (Member[] memory) {
        return Members;
    }

    function getRequests() public view returns (Request[] memory) {
        return Requests;
    }
}
