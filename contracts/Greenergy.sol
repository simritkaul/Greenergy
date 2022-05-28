// SPDX-License-Identifier: Unlicenced

pragma solidity ^0.8.0;

contract Greenergy {
    address public owner;

    struct Member {
        uint256 id;
        string name;
        string house;
        address acc;
        bool active;
    }

    struct Request {
        uint256 memid;
        uint256 reqid;
        bool reqStatus;
    }

    mapping(uint256 => bool) requested; // to check if this account has already made a request
    mapping(uint256 => uint256) idmap; // to update details of an account if the connection is removed

    uint256 public memberCount;

    uint256 public reqCount;

    Member[] public Members;

    Request[] public Requests;

    constructor() {
        owner = msg.sender;
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
        require(Members[_id - 1].acc == address(0), "Wallet already linked");
        require(
            Members[_id - 1].active == true,
            "The member account is disabled"
        );
        Members[_id - 1].acc = msg.sender;
    }

    function requestSolar(uint256 _id) public {
        require(
            Members[_id - 1].acc == msg.sender,
            "Members must request using their own accounts"
        );
        require(!requested[_id - 1], "An active request already exists");
        Request memory req;
        req.memid = _id;
        req.reqid = reqCount + 1;
        idmap[_id] = reqCount + 1;
        req.reqStatus = true;
        Requests.push(req);
        requested[_id - 1] = true;
        reqCount++;
    }

    function stopRequest(uint256 _id) public {
        require(
            Members[_id - 1].acc == msg.sender,
            "Members must stop request using their own accounts"
        );
        require(requested[_id - 1], "No active request exists");
        requested[_id - 1] = false;
        Requests[idmap[_id - 1]].reqStatus = false;
    }
}
