// SPDX-License-Identifier: MIT

pragma solidity ^0.8.30;

contract LinkShield {
    
    // Estrutura dos objetos
    struct Link {
        string url;
        address owner;
        uint256 fee;
        uint256 sales;
        uint256 atCreate;
    }

    uint256 public commission = 1;
    mapping (string => Link) private links; // Mapping para mapear cada objeto link
    mapping (string => mapping ( address => bool)) public hasAccess; // mapping para verificar se o usuario tem acesso
    uint256 public creationTimestamp;
    address public immutable admin;

    constructor() {
        creationTimestamp = block.timestamp;
        admin = msg.sender;
    }

    function deleteLlink(string calldata linkId) public  {
        require(msg.sender == admin, "Unauthorized");
        delete links[linkId];
    }

    function setComi(uint256 newComission) public {
        require(msg.sender == admin, "Unauthorized");
        commission = newComission;
    }

    function getHoursMinSec(string calldata linkId) public view returns  (Link memory) {
        Link memory link = links[linkId];
        uint totalSeconds = creationTimestamp % 86400;
        uint8 hour = uint8(totalSeconds / 3600);
        uint8 minute = uint8(totalSeconds %  3600 / 60);
        
        link.atCreate = hour;
        return link;
    }

    function addLink(string calldata url, string calldata linkId, uint256 fee) public {
        Link memory link = links[linkId];
        require(link.owner == address(0) || link.owner == msg.sender, "This linkId already has an owner");
        require(fee == 0 || fee > commission, "Fee too low");

        link.url = url;
        link.fee = fee;
        link.owner = msg.sender;

        links[linkId] = link;
        hasAccess[linkId][msg.sender] = true;
    }
    
    function payLink(string calldata linkId) public payable  {
        Link memory link = links[linkId];
        require(link.owner != address(0), "This linkId not found"); // Verifica se o link existe
        require(hasAccess[linkId][msg.sender] == false, "You alread has access"); // Verifica se o usuario ja tem acesso
        require(msg.value >= link.fee, "Insufficient payment"); // Verifica se ja foi pago

        links[linkId].sales += msg.value - commission; // Atualiza o valor das vendas do link
        links[linkId].sales++;

        hasAccess[linkId][msg.sender] = true;
        payable(link.owner).transfer(msg.value - commission); // Transfere para o dono do link) 
    }

    function getlink(string calldata linkId) public view returns (Link memory){
        Link memory link = links[linkId];
        if(link.fee == 0) return link;
        if(hasAccess[linkId][msg.sender] == false)
            link.url = "";

        return  link;
    }

    function withdraw() public  {
        require(msg.sender == admin, "Ypu do not permission");
        uint256 amount = address(this).balance;
        payable(admin).transfer(amount);
    }
}