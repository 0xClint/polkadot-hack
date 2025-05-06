// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NemoItems is ERC1155, Ownable {
    using Strings for uint256;

    struct Item {
        string name;
        string description;
        uint256 price;
        uint256 maxSupply;
        uint256 tagID;
        ItemType itemType;
        address owner;
    }

    enum ItemType { Creator, User }

    mapping(uint256 => Item) public items;
    mapping(uint256 => mapping(address => uint256)) public itemBalances;
    uint256 public nextItemId;

    event ItemCreated(
        uint256 indexed itemId,
        string name,
        string description,
        uint256 price,
        uint256 maxSupply,
        uint256 tagID,
        ItemType itemType,
        address owner
    );

    event ItemUpdated(uint256 indexed itemId, string newDescription);

    constructor(string memory baseURI) ERC1155(baseURI) Ownable(msg.sender) {}

    // --- Item Creation ---

    function createItemByOwner(
        string memory _name,
        string memory _description,
        uint256 _price,
        uint256 _maxSupply,
        uint256 _tagID,
        ItemType _itemType
    ) public onlyOwner returns (uint256) {
        require(_maxSupply > 0, "Max supply must be greater than zero");
        require(_price > 0, "Price must be greater than zero");

        uint256 itemId = nextItemId;
        items[itemId] = Item(_name, _description, _price, _maxSupply, _tagID, _itemType, msg.sender);
        nextItemId++;

        emit ItemCreated(itemId, _name, _description, _price, _maxSupply, _tagID, _itemType, msg.sender);
        return itemId;
    }

    function createItemByUser(
        string memory _name,
        string memory _description,
        uint256 _price,
        uint256 _maxSupply,
        uint256 _tagID
    ) external returns (uint256) {
        require(_maxSupply > 0, "Max supply must be greater than zero");
        require(_price > 0, "Price must be greater than zero");

        uint256 itemId = nextItemId;
        items[itemId] = Item(_name, _description, _price, _maxSupply, _tagID, ItemType.User, msg.sender);
        nextItemId++;

        emit ItemCreated(itemId, _name, _description, _price, _maxSupply, _tagID, ItemType.User, msg.sender);
        return itemId;
    }

    // --- Minting ---

    function mint(uint256 _itemId) external payable {
        Item memory item = items[_itemId];
        require(itemBalances[_itemId][msg.sender] < item.maxSupply, "Max supply reached");
        require(msg.value >= item.price, "Insufficient funds");

        _mint(msg.sender, _itemId, 1, "");
        itemBalances[_itemId][msg.sender]++;

        uint256 excess = msg.value - item.price;
        if (excess > 0) {
            (bool success, ) = payable(msg.sender).call{value: excess}("");
            require(success, "Refund failed");
        }
    }

    // --- Item Update ---

    function updateItem(uint256 _itemId, string memory _newDescription) external {
        Item storage item = items[_itemId];
        require(item.itemType == ItemType.User, "Item type not supported");
        require(itemBalances[_itemId][msg.sender] > 0, "Caller does not own the item");
        require(item.owner == msg.sender, "Caller is not the owner");

        item.description = _newDescription;
        emit ItemUpdated(_itemId, _newDescription);
    }

    // --- Metadata ---

    function uri(uint256 _itemId) public view override returns (string memory) {
        return string(abi.encodePacked(super.uri(0), _itemId.toString()));
    }

    function setBaseURI(string memory newBaseURI) external onlyOwner {
        _setURI(newBaseURI);
    }

    // --- Admin Updates ---

    function setItemURI(uint256 _itemId, string memory newURI) external onlyOwner {
        items[_itemId].description = newURI;
    }

    function updateItemPrice(uint256 _itemId, uint256 _newPrice) external onlyOwner {
        items[_itemId].price = _newPrice;
    }

    function updateItemMaxSupply(uint256 _itemId, uint256 _newMaxSupply) external onlyOwner {
        items[_itemId].maxSupply = _newMaxSupply;
    }

    // --- Views ---

    function getRemainingSupply(uint256 _itemId) public view returns (uint256) {
        return items[_itemId].maxSupply - itemBalances[_itemId][msg.sender];
    }

    function getItemsForUser(address _user) public view returns (uint256[] memory) {
        uint256 count;
        for (uint256 i = 0; i < nextItemId; i++) {
            if (itemBalances[i][_user] > 0) {
                count++;
            }
        }

        uint256[] memory ownedItems = new uint256[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < nextItemId; i++) {
            if (itemBalances[i][_user] > 0) {
                ownedItems[index++] = i;
            }
        }

        return ownedItems;
    }

    function getItemsByType(ItemType itemType) external view returns (uint256[] memory) {
        uint256 count;
        for (uint256 i = 0; i < nextItemId; i++) {
            if (items[i].itemType == itemType) {
                count++;
            }
        }

        uint256[] memory filtered = new uint256[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < nextItemId; i++) {
            if (items[i].itemType == itemType) {
                filtered[index++] = i;
            }
        }

        return filtered;
    }

    function isCreatorItem(uint256 itemId) external view returns (bool) {
        return items[itemId].itemType == ItemType.Creator;
    }
}