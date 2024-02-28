// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract ERC20 {
    string private _name;
    string private _symbol;
    uint256 private _totalSupply;
    mapping(address => uint256) public balances;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Mint(address indexed account, uint256 amount);
    event BlockRewardSet(uint256 amount);
    event ContractDestroyed(address indexed recipient, uint256 amount);

    constructor(string memory name_, string memory symbol_, uint256 totalSupply_){
        _name = name_;
        _symbol = symbol_;
        _totalSupply = totalSupply_;
    }

    function _mint(address account, uint256 amount) internal {
        require(account != address(0), "Mint to the 0 address");
        balances[account] += amount;
        _totalSupply += amount;
        emit Mint(account, amount);
        emit Transfer(address(0), account, amount);
    }

    function _mintMinerReward() internal {
        _mint(block.coinbase, 1);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual {

    }

    function setBlockReward(uint256 amount) external {
        emit BlockRewardSet(amount);
    }

    function destroy(address recipient) external {
        require(msg.sender == recipient, "You Can't destroy this contract!");
        emit ContractDestroyed(recipient, balances[msg.sender]);
        payable(recipient).transfer(address(this).balance);
    }
}
