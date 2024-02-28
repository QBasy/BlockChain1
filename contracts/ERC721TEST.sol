// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./ERC20.sol";

contract TestERC20 {
    ERC20 erc20;

    constructor() {
        erc20 = new ERC20("Test Token", "TST", 1000000);
    }

    function testMint() external {
        erc20.mint(address(0x123), 1000);
        assert(erc20.balances(address(0x123)) == 1000, "Minting failed");
    }

    function testTransfer() external {
        erc20.mint(address(0x456), 500);
        erc20.transfer(address(0x123), 200);
        assert(erc20.balances(address(0x456)) == 300, "Transfer failed");
        assert(erc20.balances(address(0x123)) == 200, "Transfer failed");
    }

    function testApproval() external {
        erc20.approve(address(0x789), 100);
        assert(erc20.allowance(address(this), address(0x789)) == 100, "Approval failed");
    }
}