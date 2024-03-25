// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract AirdropDistributor is Ownable, ReentrancyGuard {
    IERC20 public token;

    //=======================================
    // Constructor
    //=======================================
    constructor(address _token) {
        token = IERC20(_token);
    }

    //=======================================
    // External
    //=======================================
    function distribute(
        uint256 amountperaddress,
        address[] memory addresses
    ) external nonReentrant onlyOwner {
        for (uint256 i = 0; i < addresses.length; i++) {
            token.transfer(addresses[i], amountperaddress);
        }
    }

    function setToken(address _token) external onlyOwner {
        token = IERC20(_token);
    }

    function withdraw() external onlyOwner {
        token.transfer(owner(), token.balanceOf(address(this)));
    }
}
