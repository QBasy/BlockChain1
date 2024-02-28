// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./ERC721.sol";

contract TestERC721 {
    ERC721 erc721;

    constructor() {
        erc721 = new ERC721("Test NFT", "TNFT");
    }

    function testMint() external {
        erc721.mint(address(0x123), 1, "ipfs://123");
        assert(erc721.tokenURI(1) == "ipfs://123", "Minting failed");
    }

    function testTransfer() external {
        erc721.mint(address(0x456), 2, "ipfs://456");
        erc721.safeTransferFrom(address(0x456), address(0x123), 2);
        assert(erc721.ownerOf(2) == address(0x123), "Transfer failed");
    }

    function testApproval() external {
        erc721.mint(address(0x789), 3, "ipfs://789");
        erc721.approve(address(0xabc), 3);
        assert(erc721.getApproved(3) == address(0xabc), "Approval failed");
    }
}