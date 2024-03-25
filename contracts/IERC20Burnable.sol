// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20Burnable {
    /**
     * @dev Destroys `amount` tokens from the caller's account, reducing the
     * total supply.
     *
     * Emits a {Transfer} event with `to` set to the zero address.
     *
     * Requirements:
     *
     * - the caller must have at least `amount` tokens.
     */
    function burn(uint256 amount) external;

    /**
     * @dev Destroys `amount` tokens from `account`, deducting from the caller's
     * allowance, and reducing the total supply.
     *
     * Emits an {Approval} event indicating the updated allowance.
     * Emits a {Transfer} event with `to` set to the zero address.
     *
     * Requirements:
     *
     * - the caller must have allowance for `account`'s tokens of at least
     * `amount`.
     * - `account` must have at least `amount` tokens.
     */
    function burnFrom(address account, uint256 amount) external;

    // Allowance function
    function allowance(
        address owner,
        address spender
    ) external view returns (uint256);
}
