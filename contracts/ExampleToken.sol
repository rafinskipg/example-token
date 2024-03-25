// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract ExampleToken is Ownable, ERC20, ERC20Burnable, ReentrancyGuard {
    //=======================================
    // Constructor
    //=======================================
    constructor(uint256 _amount) ERC20("ExampleToken", "TOKEN") {
        _mint(msg.sender, _amount);
    }
}
