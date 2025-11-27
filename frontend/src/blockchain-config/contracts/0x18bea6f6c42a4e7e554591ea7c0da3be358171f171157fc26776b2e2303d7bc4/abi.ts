import { type Abi } from "viem";

export const abi = [
  {
    "name": "AlreadyInitialized",
    "type": "error",
    "inputs": []
  },
  {
    "name": "ApprovalCallerNotOwnerNorApproved",
    "type": "error",
    "inputs": []
  },
  {
    "name": "ApprovalQueryForNonexistentToken",
    "type": "error",
    "inputs": []
  },
  {
    "name": "BalanceQueryForZeroAddress",
    "type": "error",
    "inputs": []
  },
  {
    "name": "CannotExceedMaxSupplyOfUint64",
    "type": "error",
    "inputs": [
      {
        "name": "newMaxSupply",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "name": "InvalidRoyaltyBasisPoints",
    "type": "error",
    "inputs": [
      {
        "name": "basisPoints",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "name": "MintERC2309QuantityExceedsLimit",
    "type": "error",
    "inputs": []
  },
  {
    "name": "MintQuantityExceedsMaxSupply",
    "type": "error",
    "inputs": [
      {
        "name": "total",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "maxSupply",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "name": "MintToZeroAddress",
    "type": "error",
    "inputs": []
  },
  {
    "name": "MintZeroQuantity",
    "type": "error",
    "inputs": []
  },
  {
    "name": "NewOwnerIsZeroAddress",
    "type": "error",
    "inputs": []
  },
  {
    "name": "NotNextOwner",
    "type": "error",
    "inputs": []
  },
  {
    "name": "OnlyAllowedSeaDrop",
    "type": "error",
    "inputs": []
  },
  {
    "name": "OnlyOwner",
    "type": "error",
    "inputs": []
  },
  {
    "name": "OwnerQueryForNonexistentToken",
    "type": "error",
    "inputs": []
  },
  {
    "name": "OwnershipNotInitializedForExtraData",
    "type": "error",
    "inputs": []
  },
  {
    "name": "ProvenanceHashCannotBeSetAfterMintStarted",
    "type": "error",
    "inputs": []
  },
  {
    "name": "RoyaltyAddressCannotBeZeroAddress",
    "type": "error",
    "inputs": []
  },
  {
    "name": "SameTransferValidator",
    "type": "error",
    "inputs": []
  },
  {
    "name": "SignersMismatch",
    "type": "error",
    "inputs": []
  },
  {
    "name": "TokenGatedMismatch",
    "type": "error",
    "inputs": []
  },
  {
    "name": "TransferCallerNotOwnerNorApproved",
    "type": "error",
    "inputs": []
  },
  {
    "name": "TransferFromIncorrectOwner",
    "type": "error",
    "inputs": []
  },
  {
    "name": "TransferToNonERC721ReceiverImplementer",
    "type": "error",
    "inputs": []
  },
  {
    "name": "TransferToZeroAddress",
    "type": "error",
    "inputs": []
  },
  {
    "name": "URIQueryForNonexistentToken",
    "type": "error",
    "inputs": []
  },
  {
    "name": "AllowedSeaDropUpdated",
    "type": "event",
    "inputs": [
      {
        "name": "allowedSeaDrop",
        "type": "address[]",
        "indexed": false,
        "internalType": "address[]"
      }
    ],
    "anonymous": false
  },
  {
    "name": "Approval",
    "type": "event",
    "inputs": [
      {
        "name": "owner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "approved",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "tokenId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "name": "ApprovalForAll",
    "type": "event",
    "inputs": [
      {
        "name": "owner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "operator",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "approved",
        "type": "bool",
        "indexed": false,
        "internalType": "bool"
      }
    ],
    "anonymous": false
  },
  {
    "name": "BatchMetadataUpdate",
    "type": "event",
    "inputs": [
      {
        "name": "_fromTokenId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "_toTokenId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "name": "ConsecutiveTransfer",
    "type": "event",
    "inputs": [
      {
        "name": "fromTokenId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "toTokenId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "from",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "to",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "name": "ContractURIUpdated",
    "type": "event",
    "inputs": [
      {
        "name": "newContractURI",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      }
    ],
    "anonymous": false
  },
  {
    "name": "Initialized",
    "type": "event",
    "inputs": [
      {
        "name": "version",
        "type": "uint8",
        "indexed": false,
        "internalType": "uint8"
      }
    ],
    "anonymous": false
  },
  {
    "name": "MaxSupplyUpdated",
    "type": "event",
    "inputs": [
      {
        "name": "newMaxSupply",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "name": "OwnershipTransferred",
    "type": "event",
    "inputs": [
      {
        "name": "previousOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "newOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "name": "PotentialOwnerUpdated",
    "type": "event",
    "inputs": [
      {
        "name": "newPotentialAdministrator",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "name": "ProvenanceHashUpdated",
    "type": "event",
    "inputs": [
      {
        "name": "previousHash",
        "type": "bytes32",
        "indexed": false,
        "internalType": "bytes32"
      },
      {
        "name": "newHash",
        "type": "bytes32",
        "indexed": false,
        "internalType": "bytes32"
      }
    ],
    "anonymous": false
  },
  {
    "name": "RoyaltyInfoUpdated",
    "type": "event",
    "inputs": [
      {
        "name": "receiver",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      },
      {
        "name": "bps",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "name": "SeaDropTokenDeployed",
    "type": "event",
    "inputs": [],
    "anonymous": false
  },
  {
    "name": "Transfer",
    "type": "event",
    "inputs": [
      {
        "name": "from",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "to",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "tokenId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "name": "TransferValidatorUpdated",
    "type": "event",
    "inputs": [
      {
        "name": "oldValidator",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      },
      {
        "name": "newValidator",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "name": "acceptOwnership",
    "type": "function",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "approve",
    "type": "function",
    "inputs": [
      {
        "name": "to",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "tokenId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "balanceOf",
    "type": "function",
    "inputs": [
      {
        "name": "owner",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "baseURI",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "string",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "burn",
    "type": "function",
    "inputs": [
      {
        "name": "tokenId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "cancelOwnershipTransfer",
    "type": "function",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "contractURI",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "string",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "emitBatchMetadataUpdate",
    "type": "function",
    "inputs": [
      {
        "name": "fromTokenId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "toTokenId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "getApproved",
    "type": "function",
    "inputs": [
      {
        "name": "tokenId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "getMintStats",
    "type": "function",
    "inputs": [
      {
        "name": "minter",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "minterNumMinted",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "currentTotalSupply",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "maxSupply",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "getTransferValidationFunction",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "functionSignature",
        "type": "bytes4",
        "internalType": "bytes4"
      },
      {
        "name": "isViewFunction",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "pure"
  },
  {
    "name": "getTransferValidator",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "initialize",
    "type": "function",
    "inputs": [
      {
        "name": "__name",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "__symbol",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "allowedSeaDrop",
        "type": "address[]",
        "internalType": "address[]"
      },
      {
        "name": "initialOwner",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "isApprovedForAll",
    "type": "function",
    "inputs": [
      {
        "name": "owner",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "operator",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "maxSupply",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "mintSeaDrop",
    "type": "function",
    "inputs": [
      {
        "name": "minter",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "quantity",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "multiConfigure",
    "type": "function",
    "inputs": [
      {
        "name": "config",
        "type": "tuple",
        "components": [
          {
            "name": "maxSupply",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "baseURI",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "contractURI",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "seaDropImpl",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "publicDrop",
            "type": "tuple",
            "components": [
              {
                "name": "mintPrice",
                "type": "uint80",
                "internalType": "uint80"
              },
              {
                "name": "startTime",
                "type": "uint48",
                "internalType": "uint48"
              },
              {
                "name": "endTime",
                "type": "uint48",
                "internalType": "uint48"
              },
              {
                "name": "maxTotalMintableByWallet",
                "type": "uint16",
                "internalType": "uint16"
              },
              {
                "name": "feeBps",
                "type": "uint16",
                "internalType": "uint16"
              },
              {
                "name": "restrictFeeRecipients",
                "type": "bool",
                "internalType": "bool"
              }
            ],
            "internalType": "struct PublicDrop"
          },
          {
            "name": "dropURI",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "allowListData",
            "type": "tuple",
            "components": [
              {
                "name": "merkleRoot",
                "type": "bytes32",
                "internalType": "bytes32"
              },
              {
                "name": "publicKeyURIs",
                "type": "string[]",
                "internalType": "string[]"
              },
              {
                "name": "allowListURI",
                "type": "string",
                "internalType": "string"
              }
            ],
            "internalType": "struct AllowListData"
          },
          {
            "name": "creatorPayoutAddress",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "provenanceHash",
            "type": "bytes32",
            "internalType": "bytes32"
          },
          {
            "name": "allowedFeeRecipients",
            "type": "address[]",
            "internalType": "address[]"
          },
          {
            "name": "disallowedFeeRecipients",
            "type": "address[]",
            "internalType": "address[]"
          },
          {
            "name": "allowedPayers",
            "type": "address[]",
            "internalType": "address[]"
          },
          {
            "name": "disallowedPayers",
            "type": "address[]",
            "internalType": "address[]"
          },
          {
            "name": "tokenGatedAllowedNftTokens",
            "type": "address[]",
            "internalType": "address[]"
          },
          {
            "name": "tokenGatedDropStages",
            "type": "tuple[]",
            "components": [
              {
                "name": "mintPrice",
                "type": "uint80",
                "internalType": "uint80"
              },
              {
                "name": "maxTotalMintableByWallet",
                "type": "uint16",
                "internalType": "uint16"
              },
              {
                "name": "startTime",
                "type": "uint48",
                "internalType": "uint48"
              },
              {
                "name": "endTime",
                "type": "uint48",
                "internalType": "uint48"
              },
              {
                "name": "dropStageIndex",
                "type": "uint8",
                "internalType": "uint8"
              },
              {
                "name": "maxTokenSupplyForStage",
                "type": "uint32",
                "internalType": "uint32"
              },
              {
                "name": "feeBps",
                "type": "uint16",
                "internalType": "uint16"
              },
              {
                "name": "restrictFeeRecipients",
                "type": "bool",
                "internalType": "bool"
              }
            ],
            "internalType": "struct TokenGatedDropStage[]"
          },
          {
            "name": "disallowedTokenGatedAllowedNftTokens",
            "type": "address[]",
            "internalType": "address[]"
          },
          {
            "name": "signers",
            "type": "address[]",
            "internalType": "address[]"
          },
          {
            "name": "signedMintValidationParams",
            "type": "tuple[]",
            "components": [
              {
                "name": "minMintPrice",
                "type": "uint80",
                "internalType": "uint80"
              },
              {
                "name": "maxMaxTotalMintableByWallet",
                "type": "uint24",
                "internalType": "uint24"
              },
              {
                "name": "minStartTime",
                "type": "uint40",
                "internalType": "uint40"
              },
              {
                "name": "maxEndTime",
                "type": "uint40",
                "internalType": "uint40"
              },
              {
                "name": "maxMaxTokenSupplyForStage",
                "type": "uint40",
                "internalType": "uint40"
              },
              {
                "name": "minFeeBps",
                "type": "uint16",
                "internalType": "uint16"
              },
              {
                "name": "maxFeeBps",
                "type": "uint16",
                "internalType": "uint16"
              }
            ],
            "internalType": "struct SignedMintValidationParams[]"
          },
          {
            "name": "disallowedSigners",
            "type": "address[]",
            "internalType": "address[]"
          }
        ],
        "internalType": "struct ERC721SeaDropStructsErrorsAndEvents.MultiConfigureStruct"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "name",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "string",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "owner",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "ownerOf",
    "type": "function",
    "inputs": [
      {
        "name": "tokenId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "provenanceHash",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "renounceOwnership",
    "type": "function",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "royaltyAddress",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "royaltyBasisPoints",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "royaltyInfo",
    "type": "function",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_salePrice",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "receiver",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "royaltyAmount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "safeTransferFrom",
    "type": "function",
    "inputs": [
      {
        "name": "from",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "to",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "tokenId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "safeTransferFrom",
    "type": "function",
    "inputs": [
      {
        "name": "from",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "to",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "tokenId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_data",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "setApprovalForAll",
    "type": "function",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "approved",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "setBaseURI",
    "type": "function",
    "inputs": [
      {
        "name": "newBaseURI",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "setContractURI",
    "type": "function",
    "inputs": [
      {
        "name": "newContractURI",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "setMaxSupply",
    "type": "function",
    "inputs": [
      {
        "name": "newMaxSupply",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "setProvenanceHash",
    "type": "function",
    "inputs": [
      {
        "name": "newProvenanceHash",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "setRoyaltyInfo",
    "type": "function",
    "inputs": [
      {
        "name": "newInfo",
        "type": "tuple",
        "components": [
          {
            "name": "royaltyAddress",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "royaltyBps",
            "type": "uint96",
            "internalType": "uint96"
          }
        ],
        "internalType": "struct ISeaDropTokenContractMetadata.RoyaltyInfo"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "setTransferValidator",
    "type": "function",
    "inputs": [
      {
        "name": "newValidator",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "supportsInterface",
    "type": "function",
    "inputs": [
      {
        "name": "interfaceId",
        "type": "bytes4",
        "internalType": "bytes4"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "symbol",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "string",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "tokenURI",
    "type": "function",
    "inputs": [
      {
        "name": "tokenId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "string",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "totalSupply",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "transferFrom",
    "type": "function",
    "inputs": [
      {
        "name": "from",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "to",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "tokenId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "transferOwnership",
    "type": "function",
    "inputs": [
      {
        "name": "newPotentialOwner",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "updateAllowList",
    "type": "function",
    "inputs": [
      {
        "name": "seaDropImpl",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "allowListData",
        "type": "tuple",
        "components": [
          {
            "name": "merkleRoot",
            "type": "bytes32",
            "internalType": "bytes32"
          },
          {
            "name": "publicKeyURIs",
            "type": "string[]",
            "internalType": "string[]"
          },
          {
            "name": "allowListURI",
            "type": "string",
            "internalType": "string"
          }
        ],
        "internalType": "struct AllowListData"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "updateAllowedFeeRecipient",
    "type": "function",
    "inputs": [
      {
        "name": "seaDropImpl",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "feeRecipient",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "allowed",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "updateAllowedSeaDrop",
    "type": "function",
    "inputs": [
      {
        "name": "allowedSeaDrop",
        "type": "address[]",
        "internalType": "address[]"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "updateCreatorPayoutAddress",
    "type": "function",
    "inputs": [
      {
        "name": "seaDropImpl",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "payoutAddress",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "updateDropURI",
    "type": "function",
    "inputs": [
      {
        "name": "seaDropImpl",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "dropURI",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "updatePayer",
    "type": "function",
    "inputs": [
      {
        "name": "seaDropImpl",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "payer",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "allowed",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "updatePublicDrop",
    "type": "function",
    "inputs": [
      {
        "name": "seaDropImpl",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "publicDrop",
        "type": "tuple",
        "components": [
          {
            "name": "mintPrice",
            "type": "uint80",
            "internalType": "uint80"
          },
          {
            "name": "startTime",
            "type": "uint48",
            "internalType": "uint48"
          },
          {
            "name": "endTime",
            "type": "uint48",
            "internalType": "uint48"
          },
          {
            "name": "maxTotalMintableByWallet",
            "type": "uint16",
            "internalType": "uint16"
          },
          {
            "name": "feeBps",
            "type": "uint16",
            "internalType": "uint16"
          },
          {
            "name": "restrictFeeRecipients",
            "type": "bool",
            "internalType": "bool"
          }
        ],
        "internalType": "struct PublicDrop"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "updateSignedMintValidationParams",
    "type": "function",
    "inputs": [
      {
        "name": "seaDropImpl",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "signer",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "signedMintValidationParams",
        "type": "tuple",
        "components": [
          {
            "name": "minMintPrice",
            "type": "uint80",
            "internalType": "uint80"
          },
          {
            "name": "maxMaxTotalMintableByWallet",
            "type": "uint24",
            "internalType": "uint24"
          },
          {
            "name": "minStartTime",
            "type": "uint40",
            "internalType": "uint40"
          },
          {
            "name": "maxEndTime",
            "type": "uint40",
            "internalType": "uint40"
          },
          {
            "name": "maxMaxTokenSupplyForStage",
            "type": "uint40",
            "internalType": "uint40"
          },
          {
            "name": "minFeeBps",
            "type": "uint16",
            "internalType": "uint16"
          },
          {
            "name": "maxFeeBps",
            "type": "uint16",
            "internalType": "uint16"
          }
        ],
        "internalType": "struct SignedMintValidationParams"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "updateTokenGatedDrop",
    "type": "function",
    "inputs": [
      {
        "name": "seaDropImpl",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "allowedNftToken",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "dropStage",
        "type": "tuple",
        "components": [
          {
            "name": "mintPrice",
            "type": "uint80",
            "internalType": "uint80"
          },
          {
            "name": "maxTotalMintableByWallet",
            "type": "uint16",
            "internalType": "uint16"
          },
          {
            "name": "startTime",
            "type": "uint48",
            "internalType": "uint48"
          },
          {
            "name": "endTime",
            "type": "uint48",
            "internalType": "uint48"
          },
          {
            "name": "dropStageIndex",
            "type": "uint8",
            "internalType": "uint8"
          },
          {
            "name": "maxTokenSupplyForStage",
            "type": "uint32",
            "internalType": "uint32"
          },
          {
            "name": "feeBps",
            "type": "uint16",
            "internalType": "uint16"
          },
          {
            "name": "restrictFeeRecipients",
            "type": "bool",
            "internalType": "bool"
          }
        ],
        "internalType": "struct TokenGatedDropStage"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  }
] as const satisfies Abi;