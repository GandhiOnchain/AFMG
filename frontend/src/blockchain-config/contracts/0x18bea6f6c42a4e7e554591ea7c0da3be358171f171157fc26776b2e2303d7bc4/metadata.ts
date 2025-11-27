import { type ContractSourceCodeMetadata } from "@/blockchain-config/types";

export const metadata = {
  "name": "ERC721SeaDropCloneable",
  "primaryContract": "code/src/clones/ERC721SeaDropCloneable.sol:ERC721SeaDropCloneable",
  "abiFile": "abi.ts",
  "methods": {
    "name()": {
      "details": "Returns the token collection name."
    },
    "symbol()": {
      "details": "Returns the token collection symbol."
    },
    "burn(uint256)": {
      "params": {
        "tokenId": "The token id to burn."
      },
      "notice": "Burns `tokenId`. The caller must own `tokenId` or be an         approved operator."
    },
    "totalSupply()": {
      "details": "Returns the total number of tokens in existence. Burned tokens will reduce the count. To get the total number of tokens minted, please see {_totalMinted}."
    },
    "ownerOf(uint256)": {
      "details": "Returns the owner of the `tokenId` token. Requirements: - `tokenId` must exist."
    },
    "tokenURI(uint256)": {
      "details": "Overrides the `tokenURI()` function from ERC721A      to return just the base URI if it is implied to not be a directory.      This is to help with ERC721 contracts in which the same token URI      is desired for each token, such as when the tokenURI is 'unrevealed'."
    },
    "balanceOf(address)": {
      "details": "Returns the number of tokens in `owner`'s account."
    },
    "setBaseURI(string)": {
      "params": {
        "newBaseURI": "The new base URI to set."
      },
      "notice": "Sets the base URI for the token metadata and emits an event."
    },
    "renounceOwnership()": {
      "details": "Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner."
    },
    "getApproved(uint256)": {
      "details": "Returns the account approved for `tokenId` token. Requirements: - `tokenId` must exist."
    },
    "getMintStats(address)": {
      "params": {
        "minter": "The minter address."
      },
      "details": "NOTE: Implementing contracts should always update these numbers         before transferring any tokens with _safeMint() to mitigate         consequences of malicious onERC721Received() hooks.",
      "notice": "Returns a set of mint stats for the address.         This assists SeaDrop in enforcing maxSupply,         maxTotalMintableByWallet, and maxTokenSupplyForStage checks."
    },
    "setMaxSupply(uint256)": {
      "params": {
        "newMaxSupply": "The new max supply to set."
      },
      "notice": "Sets the max token supply and emits an event."
    },
    "setContractURI(string)": {
      "params": {
        "newContractURI": "The new contract URI."
      },
      "notice": "Sets the contract URI for contract metadata."
    },
    "approve(address,uint256)": {
      "details": "Gives permission to `to` to transfer `tokenId` token to another account. The approval is cleared when the token is transferred. Only a single account can be approved at a time, so approving the zero address clears previous approvals. Requirements: - The caller must own the token or be an approved operator. - `tokenId` must exist. Emits an {Approval} event."
    },
    "supportsInterface(bytes4)": {
      "params": {
        "interfaceId": "The interface id to check against."
      },
      "notice": "Returns whether the interface is supported."
    },
    "setProvenanceHash(bytes32)": {
      "params": {
        "newProvenanceHash": "The new provenance hash to set."
      },
      "notice": "Sets the provenance hash and emits an event.         The provenance hash is used for random reveals, which         is a hash of the ordered metadata to show it has not been         modified after mint started.         This function will revert after the first item has been minted."
    },
    "transferOwnership(address)": {
      "params": {
        "newPotentialOwner": "address of potential new owner"
      },
      "notice": "Initiate ownership transfer to newPotentialOwner. Note: new owner will have to manually acceptOwnership"
    },
    "mintSeaDrop(address,uint256)": {
      "params": {
        "minter": "The address to mint to.",
        "quantity": "The number of tokens to mint."
      },
      "details": "NOTE: If a token registers itself with multiple SeaDrop         contracts, the implementation of this function should guard         against reentrancy. If the implementing token uses         _safeMint(), or a feeRecipient with a malicious receive() hook         is specified, the token or fee recipients may be able to execute         another mint in the same transaction via a separate SeaDrop         contract.         This is dangerous if an implementing token does not correctly         update the minterNumMinted and currentTotalSupply values before         transferring minted tokens, as SeaDrop references these values         to enforce token limits on a per-wallet and per-stage basis.         ERC721A tracks these values automatically, but this note and         nonReentrant modifier are left here to encourage best-practices         when referencing this contract.",
      "notice": "Mint tokens, restricted to the SeaDrop contract."
    },
    "royaltyInfo(uint256,uint256)": {
      "params": {
        "_salePrice": "The sale price of the NFT asset specified by                       _tokenId."
      },
      "returns": {
        "receiver": "     Address of who should be sent the royalty payment.",
        "royaltyAmount": "The royalty payment amount for _salePrice."
      },
      "notice": "Called with the sale price to determine how much royalty         is owed and to whom. param  _tokenId     The NFT asset queried for royalty information."
    },
    "updateDropURI(address,string)": {
      "params": {
        "dropURI": "The new drop URI.",
        "seaDropImpl": "The allowed SeaDrop contract."
      },
      "notice": "Update the drop URI for this nft contract on SeaDrop.         Only the owner can use this function."
    },
    "setApprovalForAll(address,bool)": {
      "details": "Approve or remove `operator` as an operator for the caller. Operators can call {transferFrom} or {safeTransferFrom} for any token owned by the caller. Requirements: - The `operator` cannot be the caller. Emits an {ApprovalForAll} event."
    },
    "updateAllowedSeaDrop(address[])": {
      "params": {
        "allowedSeaDrop": "The allowed SeaDrop addresses."
      },
      "notice": "Update the allowed SeaDrop contracts.         Only the owner can use this function."
    },
    "setRoyaltyInfo((address,uint96))": {
      "params": {
        "newInfo": "The struct to configure royalties."
      },
      "notice": "Sets the address and basis points for royalties."
    },
    "isApprovedForAll(address,address)": {
      "details": "Returns if the `operator` is allowed to manage all of the      assets of `owner`. Always returns true for the conduit."
    },
    "updatePayer(address,address,bool)": {
      "params": {
        "payer": "The payer to update.",
        "allowed": "Whether the payer is allowed.",
        "seaDropImpl": "The allowed SeaDrop contract."
      },
      "notice": "Update the allowed payers for this nft contract on SeaDrop.         Only the owner can use this function."
    },
    "transferFrom(address,address,uint256)": {
      "details": "Transfers `tokenId` from `from` to `to`. Requirements: - `from` cannot be the zero address. - `to` cannot be the zero address. - `tokenId` token must be owned by `from`. - If the caller is not `from`, it must be approved to move this token by either {approve} or {setApprovalForAll}. Emits a {Transfer} event."
    },
    "emitBatchMetadataUpdate(uint256,uint256)": {
      "params": {
        "toTokenId": "The end token id.",
        "fromTokenId": "The start token id."
      },
      "notice": "Emit an event notifying metadata updates for         a range of token ids, according to EIP-4906."
    },
    "safeTransferFrom(address,address,uint256)": {
      "details": "Equivalent to `safeTransferFrom(from, to, tokenId, '')`."
    },
    "updateCreatorPayoutAddress(address,address)": {
      "params": {
        "seaDropImpl": "The allowed SeaDrop contract.",
        "payoutAddress": "The new payout address."
      },
      "notice": "Update the creator payout address for this nft contract on         SeaDrop.         Only the owner can set the creator payout address."
    },
    "safeTransferFrom(address,address,uint256,bytes)": {
      "details": "Safely transfers `tokenId` token from `from` to `to`. Requirements: - `from` cannot be the zero address. - `to` cannot be the zero address. - `tokenId` token must exist and be owned by `from`. - If the caller is not `from`, it must be approved to move this token by either {approve} or {setApprovalForAll}. - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer. Emits a {Transfer} event."
    },
    "updateAllowedFeeRecipient(address,address,bool)": {
      "params": {
        "allowed": "If the fee recipient is allowed.",
        "seaDropImpl": "The allowed SeaDrop contract.",
        "feeRecipient": "The new fee recipient."
      },
      "notice": "Update the allowed fee recipient for this nft contract         on SeaDrop.         Only the owner can set the allowed fee recipient."
    },
    "updateAllowList(address,(bytes32,string[],string))": {
      "params": {
        "seaDropImpl": "The allowed SeaDrop contract.",
        "allowListData": "The allow list data."
      },
      "notice": "Update the allow list data for this nft contract on SeaDrop.         Only the owner can use this function."
    },
    "updatePublicDrop(address,(uint80,uint48,uint48,uint16,uint16,bool))": {
      "params": {
        "publicDrop": "The public drop data.",
        "seaDropImpl": "The allowed SeaDrop contract."
      },
      "notice": "Update the public drop data for this nft contract on SeaDrop.         Only the owner can use this function."
    },
    "updateTokenGatedDrop(address,address,(uint80,uint16,uint48,uint48,uint8,uint32,uint16,bool))": {
      "params": {
        "dropStage": "The token gated drop stage data.",
        "seaDropImpl": "The allowed SeaDrop contract.",
        "allowedNftToken": "The allowed nft token."
      },
      "notice": "Update the token gated drop stage data for this nft contract         on SeaDrop.         Only the owner can use this function.         Note: If two INonFungibleSeaDropToken tokens are doing         simultaneous token gated drop promotions for each other,         they can be minted by the same actor until         `maxTokenSupplyForStage` is reached. Please ensure the         `allowedNftToken` is not running an active drop during the         `dropStage` time period."
    },
    "updateSignedMintValidationParams(address,address,(uint80,uint24,uint40,uint40,uint40,uint16,uint16))": {
      "params": {
        "signer": "The signer to update.",
        "seaDropImpl": "The allowed SeaDrop contract.",
        "signedMintValidationParams": "Minimum and maximum parameters to                                   enforce for signed mints."
      },
      "notice": "Update the server-side signers for this nft contract         on SeaDrop.         Only the owner can use this function."
    },
    "multiConfigure((uint256,string,string,address,(uint80,uint48,uint48,uint16,uint16,bool),string,(bytes32,string[],string),address,bytes32,address[],address[],address[],address[],address[],(uint80,uint16,uint48,uint48,uint8,uint32,uint16,bool)[],address[],address[],(uint80,uint24,uint40,uint40,uint40,uint16,uint16)[],address[]))": {
      "params": {
        "config": "The configuration struct."
      },
      "notice": "Configure multiple properties at a time.         Note: The individual configure methods should be used         to unset or reset any properties to zero, as this method         will ignore zero-value properties in the config struct."
    },
    "baseURI()": {
      "notice": "Returns the base URI for token metadata."
    },
    "maxSupply()": {
      "notice": "Returns the max token supply."
    },
    "contractURI()": {
      "notice": "Returns the contract URI for contract metadata."
    },
    "provenanceHash()": {
      "notice": "Returns the provenance hash.         The provenance hash is used for random reveals, which         is a hash of the ordered metadata to show it is unmodified         after mint has started."
    },
    "royaltyAddress()": {
      "notice": "Returns the address that receives royalties."
    },
    "acceptOwnership()": {
      "notice": "Claim ownership of smart contract, after the current owner has initiated the process with transferOwnership"
    },
    "royaltyBasisPoints()": {
      "notice": "Returns the royalty basis points out of 10_000."
    },
    "getTransferValidator()": {
      "notice": "Returns the currently active transfer validator.         The null address means no transfer validator is set."
    },
    "cancelOwnershipTransfer()": {
      "notice": "cancel ownership transfer"
    },
    "setTransferValidator(address)": {
      "notice": "Set the transfer validator. Only callable by the token owner."
    },
    "getTransferValidationFunction()": {
      "notice": "Returns the transfer validation function used."
    },
    "initialize(string,string,address[],address)": {
      "notice": "Deploy the token contract with its name, symbol,         and allowed SeaDrop addresses."
    }
  },
  "errors": {
    "OnlyAllowedSeaDrop()": [
      {
        "details": "Revert with an error if a contract is not an allowed      SeaDrop address."
      }
    ],
    "InvalidRoyaltyBasisPoints(uint256)": [
      {
        "details": "Revert if the royalty basis points is greater than 10_000."
      }
    ],
    "RoyaltyAddressCannotBeZeroAddress()": [
      {
        "details": "Revert if the royalty address is being set to the zero address."
      }
    ],
    "ProvenanceHashCannotBeSetAfterMintStarted()": [
      {
        "details": "Revert with an error when attempting to set the provenance      hash after the mint has started."
      }
    ]
  },
  "bytecodeHash": "0x18bea6f6c42a4e7e554591ea7c0da3be358171f171157fc26776b2e2303d7bc4",
  "contractFileTree": {
    "code": {
      "src": {
        "lib": {
          "SeaDropStructs.sol": "",
          "SeaDropErrorsAndEvents.sol": "",
          "ERC721TransferValidator.sol": "",
          "ERC721SeaDropStructsErrorsAndEvents.sol": ""
        },
        "interfaces": {
          "ISeaDrop.sol": "",
          "ICreatorToken.sol": "",
          "ITransferValidator.sol": "",
          "INonFungibleSeaDropToken.sol": "",
          "ISeaDropTokenContractMetadata.sol": ""
        },
        "clones": {
          "ERC721ACloneable.sol": "",
          "ERC721SeaDropCloneable.sol": "",
          "ERC721ContractMetadataCloneable.sol": "",
          "ERC721AConduitPreapprovedCloneable.sol": ""
        }
      },
      "lib": {
        "ERC721A": {
          "contracts": {
            "IERC721A.sol": ""
          }
        },
        "utility-contracts": {
          "src": {
            "TwoStepOwnable.sol": "",
            "ConstructorInitializable.sol": ""
          }
        },
        "openzeppelin-contracts": {
          "contracts": {
            "interfaces": {
              "IERC2981.sol": ""
            },
            "utils": {
              "introspection": {
                "IERC165.sol": ""
              }
            }
          }
        },
        "openzeppelin-contracts-upgradeable": {
          "contracts": {
            "utils": {
              "AddressUpgradeable.sol": ""
            },
            "proxy": {
              "utils": {
                "Initializable.sol": ""
              }
            },
            "security": {
              "ReentrancyGuardUpgradeable.sol": ""
            }
          }
        }
      }
    }
  }
} as const satisfies ContractSourceCodeMetadata;