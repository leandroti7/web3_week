// SPDX-License-Identifier: MIT

pragma solidity ^0.8.30;

struct Campaign {
    address author;
    string title;
    string description;
    string videoUrl;
    string imageUrl;
    uint256 balance;
    bool active;
}

contract DonateCrypto {
    uint256 public fee = 100;
    uint256 public nextId = 0;

    mapping (uint256 => Campaign) public campaigns;

    function addCampaigns(string calldata title, string calldata description, string calldata videoUrl, string calldata imageUrl) public  {
        Campaign memory newCampaign;
        newCampaign.title = title;
        newCampaign.description = description;
        newCampaign.videoUrl = videoUrl;
        newCampaign.imageUrl = imageUrl;
        newCampaign.active = true;
        newCampaign.author = msg.sender;

        nextId++;
        campaigns[nextId] = newCampaign;
    }

    function donate(uint256 id) public payable {
        require(msg.value > 0, "You need to donate more than 0");
        require(campaigns[id].active == true, "Campaign is not active");

        campaigns[id].balance += msg.value;
    }

    function withdraw(uint256 id) public {
        Campaign memory campaign = campaigns[id];
        require(campaign.author == msg.sender, "You are not the author of this campaign");
        require(campaign.active == true, "This campaign is closed");
        require(campaign.balance > fee, "This campaign does not have enough balance");

        address payable recipient = payable(campaign.author);
        (bool success, ) = recipient.call{value: campaign.balance - fee}("Withdraw success");
        require(success, "transfer fsiled");
        campaigns[id].active = false;
    }
}