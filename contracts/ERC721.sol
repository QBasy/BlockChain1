// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract ERC721 {
    string public _name;
    string public _symbol;
    mapping(uint256 => address) private _tokenOwners;
    mapping(address => uint256) private _ownershipTokenCount;
    mapping(uint256 => string) private _tokenURIs;
    mapping(uint256 => address) private _tokenApprovals;
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);

    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    function mint(address to, uint256 tokenId, string memory tokenURI) external {
        require(tokenOwners[tokenId] == address(0), "Token already exists");
        _tokenOwners[tokenId] = to;
        _ownershipTokenCount[to]++;
        _tokenURIs[tokenId] = tokenURI;
        emit Transfer(address(0), to, tokenId);
    }

    function safeTransferFrom(address from, address to, uint256 tokenId) external {
        require(msg.sender == from || msg.sender == _tokenOwners[tokenId] || msg.sender == _tokenApprovals[tokenId], "Not approved to transfer");
        require(to != address(0), "Transfer to the zero address");
        require(from == _tokenOwners[tokenId], "Not the owner of the token");

        _tokenOwners[tokenId] = to;
        _ownershipTokenCount[from]--;
        _ownershipTokenCount[to]++;

        emit Transfer(from, to, tokenId);
    }

    function approve(address to, uint256 tokenId) external {
        require(msg.sender == _tokenOwners[tokenId], "Not the owner of the token");
        _tokenApprovals[tokenId] = to;
        emit Approval(msg.sender, to, tokenId);
    }

    function setApprovalForAll(address operator, bool approved) external {
        _operatorApprovals[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }

    function tokenURI(uint256 tokenId) external view returns (string memory) {
        require(_tokenOwners[tokenId] != address(0), "Token does not exist");
        return _tokenURIs[tokenId];
    }
}
