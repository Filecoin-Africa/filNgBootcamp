// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Attendance {
    // TASKS
    // creating a form
    // form inputs - name,location, topic, rating, wallet address, feedback/comments.
    // location - online or onsite
    // rating - 1,2,3,4,5
    // function to set the info
    // function to retrieve the info

    enum Location {
        Online,
        Onsite
    }

    enum Rating {
        VeryDissatisfied,
        Dissatisfied,
        SomewhatSatisfied,
        Satisfied,
        VerySatisfied
    }

    struct FormDetail {
        string name;
        Location location;
        string topic;
        Rating rating;
        address walletAddress;
        bytes32 feedback;
    }

    FormDetail[] public list;

    function form(
        string memory _name,
        Location _location,
        string memory _topic,
        Rating _rating,
        bytes32 _feedback
    ) public returns (bool success) {
        list.push(
            FormDetail(_name, _location, _topic, _rating, msg.sender, _feedback)
        );

        success;
    }

    function retrieve() public view returns (FormDetail[] memory) {
        return list;
    }
}
