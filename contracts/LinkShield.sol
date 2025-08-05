// SPDX-License-Identifier: MIT

pragma solidity ^0.8.30;

contract LinkShield {
    
    // Estrutura dos objetos
    struct Link {
        string url;
        address owner;
        uint256 fee;
    }

    uint256 public commission = 1;
    mapping (string => Link) private links; // Mapping para mapear cada objeto link
    mapping (string => mapping ( address => bool)) public hasAccess; // mapping para verificar se o usuario tem acesso

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
}