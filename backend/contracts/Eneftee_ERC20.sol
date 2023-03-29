// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Eneftee_ERC20 is ERC20, Ownable {
    constructor() ERC20("eNeFTee20", "EN20") {}

    function mint(uint256 amount) public payable returns (bool) {
        require(msg.value >= 0.0001 ether * amount, "Not enough eth paid");
        _mint(msg.sender, amount);
        return true;
    }

    function approveFor(
        address owner,
        address spender,
        uint256 amount
    ) public returns (bool) {
        _approve(owner, spender, amount);
        return true;
    }
}
