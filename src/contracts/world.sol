// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Nemo is ERC1155, Ownable {
    using Strings for uint256;

    uint256 public nextTokenId;
    uint256 public immutable maxSupply;

    string private _baseTokenURI;

    mapping(uint256 => string) private _tokenURIs;
    mapping(uint256 => bool) private _tokenExists;
    mapping(uint256 => address) private _tokenCreators;
    mapping(uint256 => string) private _worldNames;
    mapping(uint256 => string) private _worldDescriptions;

    event WorldCreated(
        uint256 indexed tokenId,
        address indexed owner,
        string uri,
        string name,
        string description
    );
    event TokenURIUpdated(uint256 indexed tokenId, string newURI);

    struct NFT {
        uint256 tokenId;
        address owner;
        string uri;
        string name;
        string description;
    }

    modifier onlyOwnerOrCreator(uint256 tokenId) {
        require(
            msg.sender == owner() || msg.sender == _tokenCreators[tokenId],
            "Not authorized"
        );
        _;
    }

    constructor(uint256 _maxSupply, string memory baseTokenURI) 
        ERC1155("") 
        Ownable(msg.sender) 
    {
        require(_maxSupply > 0, "Max supply must be greater than zero");
        _baseTokenURI = baseTokenURI;
        maxSupply = _maxSupply;
    }


    function createWorld(
        address recipient,
        string memory uri_,
        string memory name,
        string memory description,
        uint256 quantity
    ) external returns (uint256) {
        require(quantity > 0, "Quantity must be greater than zero");
        require(nextTokenId + quantity <= maxSupply, "Max supply exceeded");

        for (uint256 i = 0; i < quantity; i++) {
            uint256 tokenId = nextTokenId;

            _mint(recipient, tokenId, 1, "");
            tokenURIs[tokenId] = uri;
            _tokenExists[tokenId] = true;
            _tokenCreators[tokenId] = recipient;
            _worldNames[tokenId] = name;
            _worldDescriptions[tokenId] = description;

            emit WorldCreated(tokenId, recipient, uri_, name, description);
            nextTokenId++;
        }

        return nextTokenId - 1;
    }

    function updateURI(uint256 tokenId, string memory newURI) external onlyOwnerOrCreator(tokenId) {
        require(_tokenExists[tokenId], "Token does not exist");
        require(msg.sender == _tokenCreators[tokenId], "Not the creator");

        _tokenURIs[tokenId] = newURI;
        emit TokenURIUpdated(tokenId, newURI);
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        require(_tokenExists[tokenId], "Token does not exist");
        return string(abi.encodePacked(_baseTokenURI, _tokenURIs[tokenId]));
    }

    function creatorOf(uint256 tokenId) public view returns (address) {
        require(_tokenExists[tokenId], "Token does not exist");
        return _tokenCreators[tokenId];
    }

    function getNFTsByOwner(address queryOwner) external view returns (NFT[] memory) {
        uint256 count;
        for (uint256 i = 0; i < nextTokenId; i++) {
            if (_tokenCreators[i] == queryOwner) {
                count++;
            }
        }

        NFT[] memory result = new NFT[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < nextTokenId; i++) {
            if (_tokenCreators[i] == queryOwner) {
                result[index++] = NFT({
                    tokenId: i,
                    owner: _tokenCreators[i],
                    uri: _tokenURIs[i],
                    name: _worldNames[i],
                    description: _worldDescriptions[i]
                });
            }
        }

        return result;
    }

    function getAllNFTs() external view returns (NFT[] memory) {
        NFT[] memory result = new NFT[](nextTokenId);
        for (uint256 i = 0; i < nextTokenId; i++) {
            result[i] = NFT({
                tokenId: i,
                owner: _tokenCreators[i],
                uri: _tokenURIs[i],
                name: _worldNames[i],
                description: _worldDescriptions[i]
            });
        }
        return result;
    }

    function setBaseURI(string memory newBaseURI) external onlyOwner {
        _baseTokenURI = newBaseURI;
    }
}