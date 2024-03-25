pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

import "@openzeppelin/contracts/utils/Counters.sol";
import "./IERC20Burnable.sol";

contract ExampleNFT is
    ERC721Upgradeable,
    ERC721EnumerableUpgradeable,
    ReentrancyGuardUpgradeable,
    OwnableUpgradeable
{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    IERC20Burnable public exampleToken;

    uint256 public maxSupply;
    uint256 public mintPrice;
    string private baseURI;

    // Added at the end of the baseURI
    string private suffixURI;

    function initialize(
        address _exampleToken,
        uint256 _maxSupply,
        uint256 _mintPrice,
        string memory __baseURI,
        string memory _suffixURI
    ) public initializer {
        __ERC721_init("ExampleNFT", "NFT");
        __ERC721Enumerable_init();
        __ReentrancyGuard_init();
        __Ownable_init();
        exampleToken = IERC20Burnable(_exampleToken);
        maxSupply = _maxSupply;
        mintPrice = _mintPrice;
        baseURI = __baseURI;
        suffixURI = _suffixURI;
    }

    // Needed functions for ERC721Enumerable
    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 amount
    ) internal override(ERC721Upgradeable, ERC721EnumerableUpgradeable) {
        super._beforeTokenTransfer(from, to, tokenId, amount);
    }

    function mint() public nonReentrant {
        require(
            _tokenIdCounter.current() + 1 <= maxSupply,
            "Max supply exceeded"
        );

        // Check allowance
        require(
            exampleToken.allowance(msg.sender, address(this)) >= mintPrice,
            "Insufficient allowance"
        );

        // Burn token
        exampleToken.burnFrom(msg.sender, mintPrice);
        _safeMint(msg.sender, _tokenIdCounter.current());
        _tokenIdCounter.increment();
    }

    function setMintPrice(uint256 _mintPrice) public onlyOwner {
        mintPrice = _mintPrice;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory newBaseURI) public onlyOwner {
        baseURI = newBaseURI;
    }

    function setSuffixURI(string memory newSuffixURI) public onlyOwner {
        suffixURI = newSuffixURI;
    }

    // Convert uint256 to string
    function toString(uint256 value) internal pure returns (string memory) {
        // Inspired by OraclizeAPI's implementation - MIT license
        // https://github.com/oraclize/ethereum-api/blob/b42146b063c7d6ee1358846c198246239e9360e8/oraclizeAPI_0.4.25.sol

        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    // Overrides the token URI for a token ID
    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        return string(abi.encodePacked(baseURI, toString(tokenId), suffixURI));
    }
}
