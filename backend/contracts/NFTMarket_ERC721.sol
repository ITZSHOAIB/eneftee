// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./Eneftee_ERC20.sol";

struct OwnershipHistory {
    address owner;
    string ownerName;
    uint256 time;
}

struct AssetData {
    uint256 assetID;
    string assetName;
    string assetDesc;
    bool exist;
    uint256 price;
}

contract NFTMarket_ERC721 is ERC721, Ownable, ERC721Enumerable {
    Eneftee_ERC20 en20Token;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    mapping(address => string) _users;
    mapping(uint256 => AssetData) private _assetData;
    mapping(uint256 => OwnershipHistory[]) private _ownershipHistory;

    constructor(address ERC20ContractAddress) ERC721("eNeFTee721", "EN721") {
        en20Token = Eneftee_ERC20(ERC20ContractAddress);
    }

    //User Related Functions...
    function updateUserName(string memory name) public returns (bool) {
        _users[msg.sender] = name;
        return true;
    }

    function getUserName() public view returns (string memory) {
        return _users[msg.sender];
    }

    //NFT Related functions...
    function safeMint(
        string memory assetName,
        string memory assetDesc,
        uint256 time
    ) public returns (uint256) {
        uint256 tokenID = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenID);
        _assetData[tokenID] = AssetData(tokenID, assetName, assetDesc, true, 0);
        _ownershipHistory[tokenID].push(
            OwnershipHistory(msg.sender, _users[msg.sender], time)
        );
        return tokenID;
    }

    function assetDetailsOfOwner() public view returns (AssetData[] memory) {
        uint256 contractBalance = balanceOf(address(this));
        uint256 ownerBalance = balanceOf(msg.sender);
        require(ownerBalance >= 0, "Owner's balance is ZERO");
        AssetData[] memory assetDetails = new AssetData[](
            ownerBalance + contractBalance
        );
        for (uint256 i = 0; i < ownerBalance; i++) {
            assetDetails[i] = _assetData[tokenOfOwnerByIndex(msg.sender, i)];
        }

        if (address(this) != msg.sender) {
            for (uint256 i = 0; i < contractBalance; i++) {
                uint256 contractTokenID = tokenOfOwnerByIndex(address(this), i);
                if (lastOwnerOfToken(contractTokenID) == msg.sender) {
                    assetDetails[i + ownerBalance] = _assetData[
                        contractTokenID
                    ];
                }
            }
        }

        return assetDetails;
    }

    function getAssetOwnershipHistory(uint256 tokenID)
        public
        view
        returns (OwnershipHistory[] memory)
    {
        return _ownershipHistory[tokenID];
    }

    function listAsset(uint256 tokenID, uint256 price) public returns (bool) {
        require(_assetData[tokenID].exist, "Invalid Asset ID");
        require(price > 0, "Price must be greater than 0");
        require(
            lastOwnerOfToken(tokenID) == msg.sender,
            "Not the owner of the asset"
        );
        transferFrom(msg.sender, address(this), tokenID);
        _assetData[tokenID].price = price;
        return true;
    }

    function removeListing(uint256 tokenID, address owner)
        public
        returns (bool)
    {
        require(_assetData[tokenID].exist, "Invalid Asset ID");
        require(_assetData[tokenID].price > 0, "Asset not listed to sell");
        require(
            lastOwnerOfToken(tokenID) == owner,
            "Not the owner of the asset"
        );
        ERC721(address(this)).transferFrom(address(this), owner, tokenID);
        _assetData[tokenID].price = 0;
        return true;
    }

    function buyAsset(uint256 tokenID, uint256 time) public returns (bool) {
        require(_assetData[tokenID].price > 0, "Asset not listed to sell");
        require(
            en20Token.balanceOf(msg.sender) >= _assetData[tokenID].price,
            "Not Enough EN20 balance"
        );
        ERC721(address(this)).transferFrom(address(this), msg.sender, tokenID);
        en20Token.approveFor(
            msg.sender,
            address(this),
            _assetData[tokenID].price
        );
        bool isPayed = en20Token.transferFrom(
            msg.sender,
            lastOwnerOfToken(tokenID),
            _assetData[tokenID].price
        );
        if (isPayed) {
            _ownershipHistory[tokenID].push(
                OwnershipHistory(msg.sender, _users[msg.sender], time)
            );
            _assetData[tokenID].price = 0;
            return true;
        } else {
            transferFrom(msg.sender, address(this), tokenID);
            return false;
        }
    }

    function lastOwnerOfToken(uint256 tokenID) public view returns (address) {
        return
            _ownershipHistory[tokenID][_ownershipHistory[tokenID].length - 1]
                .owner;
    }

    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
