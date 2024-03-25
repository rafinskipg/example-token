// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.25;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/*
 /$$$$$$$$                    /$$           /$$$$$$$$        /$$                          
|__  $$__/                   | $$          |__  $$__/       | $$                          
   | $$  /$$$$$$   /$$$$$$$ /$$$$$$           | $$  /$$$$$$ | $$   /$$  /$$$$$$  /$$$$$$$ 
   | $$ /$$__  $$ /$$_____/|_  $$_/           | $$ /$$__  $$| $$  /$$/ /$$__  $$| $$__  $$
   | $$| $$$$$$$$|  $$$$$$   | $$             | $$| $$  \ $$| $$$$$$/ | $$$$$$$$| $$  \ $$
   | $$| $$_____/ \____  $$  | $$ /$$         | $$| $$  | $$| $$_  $$ | $$_____/| $$  | $$
   | $$|  $$$$$$$ /$$$$$$$/  |  $$$$/         | $$|  $$$$$$/| $$ \  $$|  $$$$$$$| $$  | $$
   |__/ \_______/|_______/    \___/           |__/ \______/ |__/  \__/ \_______/|__/  |__/
                                                                                          
                                                                                          
                                                                                          

Telegram: https://t.me/testtoken

*/

contract ExampleToken is Ownable, ERC20, ReentrancyGuard {
    //=======================================
    // Constructor
    //======================================

    // The dev address that will receive an initial allocation of tokens
    address public devAddress;

    constructor(
        uint256 _amount,
        address _devAddress
    ) ERC20("ExampleToken", "TOKEN") {
        // The dev address receives an initial allocation of 7.5%
        uint256 devAmount = (_amount * 75) / 1000; // Calculate 7.5% of the total amount for the developer.
        uint256 ownerAmount = _amount - devAmount; // The rest goes to the owner.

        _mint(msg.sender, ownerAmount);
        devAddress = _devAddress;
        _mint(devAddress, devAmount);
    }
}
