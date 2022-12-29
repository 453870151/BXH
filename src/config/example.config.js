const config = {
  // infuraProvider: 'https://mainnet.infura.io/v3/c842202b2840497b8d444f12bb7c488b',
  // infuraProvider: 'https://http-mainnet-node.huobichain.com',

  //start
  yCurveFiRewardsAddress: '0xb81D3cB2708530ea990a287142b82D058725C092',
  yCurveFiRewardsABI: [{
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "previousOwner",
      "type": "address"
    }, {
      "indexed": true,
      "internalType": "address",
      "name": "newOwner",
      "type": "address"
    }],
    "name": "OwnershipTransferred",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "internalType": "uint256",
      "name": "reward",
      "type": "uint256"
    }],
    "name": "RewardAdded",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "user",
      "type": "address"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "reward",
      "type": "uint256"
    }],
    "name": "RewardPaid",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "user",
      "type": "address"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }],
    "name": "Staked",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "user",
      "type": "address"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }],
    "name": "Withdrawn",
    "type": "event"
  }, {
    "constant": true,
    "inputs": [],
    "name": "DURATION",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "internalType": "address",
      "name": "account",
      "type": "address"
    }],
    "name": "balanceOf",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "internalType": "address",
      "name": "account",
      "type": "address"
    }],
    "name": "earned",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [],
    "name": "exit",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [],
    "name": "getReward",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "isOwner",
    "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "lastTimeRewardApplicable",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "lastUpdateTime",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "uint256",
      "name": "reward",
      "type": "uint256"
    }],
    "name": "notifyRewardAmount",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "periodFinish",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "rewardPerToken",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "rewardPerTokenStored",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "rewardRate",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "name": "rewards",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "address",
      "name": "_rewardDistribution",
      "type": "address"
    }],
    "name": "setRewardDistribution",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }],
    "name": "stake",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "address",
      "name": "newOwner",
      "type": "address"
    }],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "name": "userRewardPerTokenPaid",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }],
    "name": "withdraw",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "y",
    "outputs": [{
      "internalType": "contract IERC20",
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "yfi",
    "outputs": [{
      "internalType": "contract IERC20",
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }],
  //------------------------------------------------------------------------------------------------------


  //DFK START
  // DFKRewardsAddress: '0x8d4192005ed871056f53df7840c3b6d5866e3339', //staking 以太坊网络
  DFKRewardsAddress: '0x405c8cd72981143887d69a7e7552023964286a21', //staking 测试网络
  DFKRewardsABI: [
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "stakevalue",
          "type": "uint256"
        }
      ],
      "name": "addMinePool",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_dfkToken",
          "type": "address"
        },
        {
          "internalType": "int256",
          "name": "decimals",
          "type": "int256"
        },
        {
          "internalType": "address[]",
          "name": "_mans",
          "type": "address[]"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "_lockId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_newCustodian",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_clearCustodian",
          "type": "address"
        }
      ],
      "name": "ChangeConfirmed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "_lockId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_msgSender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_new",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_clear",
          "type": "address"
        }
      ],
      "name": "ChangeRequested",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "_lockId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_sender",
          "type": "address"
        }
      ],
      "name": "ChangeSweep",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_lockId",
          "type": "bytes32"
        }
      ],
      "name": "confirmChange",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "pauseStaking",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "profit2Staking",
      "outputs": [
        {
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "profit_time",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "staking_value",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "unstaking_value",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "profit_times",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "profit",
          "type": "uint256"
        }
      ],
      "name": "ProfitLog",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "_new",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_clear",
          "type": "address"
        }
      ],
      "name": "requestChange",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "lockId",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "resumeStaking",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "stakevalue",
          "type": "uint256"
        }
      ],
      "name": "stakingDeposit",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_lockId",
          "type": "bytes32"
        }
      ],
      "name": "sweepChange",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "withdrawAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "withdrawProfit",
      "outputs": [
        {
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "withdrawStaking",
      "outputs": [
        {
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "_totalMiners",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "_totalStaking",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "balanceProfit",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "balanceStaking",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "changeReqs",
      "outputs": [
        {
          "internalType": "address",
          "name": "proposedNew",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "proposedClear",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "cleanup_time",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "dfkToken",
      "outputs": [
        {
          "internalType": "contract StandardToken",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "managers",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "mancount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "minedBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "minePoolBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "period_bonus",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "poolBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "profit_period",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "miner",
          "type": "address"
        }
      ],
      "name": "profitBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "requestCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "miner",
          "type": "address"
        }
      ],
      "name": "stakingBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "stakings",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "staking_time",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "profit_time",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "staking_value",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "unstaking_value",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "status",
      "outputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalMiners",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalProfit",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalStaking",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ],



  //BXH START

  // MdexRouter_abi
  BXHRouterRewardsAddress: '0x00eFB96dBFE641246E961b472C0C3fC472f6a694', //staking 正式网络合约地址
  // BXHRouterRewardsAddress: '0x9fE4C3F35a92F7C7278BB951adABb5Bd438A0637',
  BXHRouterRewardsABI:[
    {
      "inputs": [{
        "internalType": "address",
        "name": "_factory",
        "type": "address"
      }, {
        "internalType": "address",
        "name": "_WHT",
        "type": "address"
      }],
      "stateMutability": "nonpayable",
      "type": "constructor"
    }, {
      "inputs": [],
      "name": "WHT",
      "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
      }],
      "stateMutability": "view",
      "type": "function"
    }, {
      "inputs": [{
        "internalType": "address",
        "name": "tokenA",
        "type": "address"
      }, {
        "internalType": "address",
        "name": "tokenB",
        "type": "address"
      }, {
        "internalType": "uint256",
        "name": "amountADesired",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "amountBDesired",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "amountAMin",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "amountBMin",
        "type": "uint256"
      }, {
        "internalType": "address",
        "name": "to",
        "type": "address"
      }, {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }],
      "name": "addLiquidity",
      "outputs": [{
        "internalType": "uint256",
        "name": "amountA",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "amountB",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "liquidity",
        "type": "uint256"
      }],
      "stateMutability": "nonpayable",
      "type": "function"
    }, {
      "inputs": [{
        "internalType": "address",
        "name": "token",
        "type": "address"
      }, {
        "internalType": "uint256",
        "name": "amountTokenDesired",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "amountTokenMin",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "amountHTMin",
        "type": "uint256"
      }, {
        "internalType": "address",
        "name": "to",
        "type": "address"
      }, {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }],
      "name": "addLiquidityHT",
      "outputs": [{
        "internalType": "uint256",
        "name": "amountToken",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "amountHT",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "liquidity",
        "type": "uint256"
      }],
      "stateMutability": "payable",
      "type": "function"
    }, {
      "inputs": [],
      "name": "depositWHT",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    }, {
      "inputs": [],
      "name": "factory",
      "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
      }],
      "stateMutability": "view",
      "type": "function"
    }, {
      "inputs": [{
        "internalType": "uint256",
        "name": "amountOut",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "reserveIn",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "reserveOut",
        "type": "uint256"
      }],
      "name": "getAmountIn",
      "outputs": [{
        "internalType": "uint256",
        "name": "amountIn",
        "type": "uint256"
      }],
      "stateMutability": "pure",
      "type": "function"
    }, {
      "inputs": [{
        "internalType": "uint256",
        "name": "amountIn",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "reserveIn",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "reserveOut",
        "type": "uint256"
      }],
      "name": "getAmountOut",
      "outputs": [{
        "internalType": "uint256",
        "name": "amountOut",
        "type": "uint256"
      }],
      "stateMutability": "pure",
      "type": "function"
    }, {
      "inputs": [{
        "internalType": "uint256",
        "name": "amountOut",
        "type": "uint256"
      }, {
        "internalType": "address[]",
        "name": "path",
        "type": "address[]"
      }],
      "name": "getAmountsIn",
      "outputs": [{
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      }],
      "stateMutability": "view",
      "type": "function"
    }, {
      "inputs": [{
        "internalType": "uint256",
        "name": "amountIn",
        "type": "uint256"
      }, {
        "internalType": "address[]",
        "name": "path",
        "type": "address[]"
      }],
      "name": "getAmountsOut",
      "outputs": [{
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      }],
      "stateMutability": "view",
      "type": "function"
    }, {
      "inputs": [{
        "internalType": "address",
        "name": "token",
        "type": "address"
      }],
      "name": "getHTPair",
      "outputs": [{
        "internalType": "address",
        "name": "pair",
        "type": "address"
      }],
      "stateMutability": "view",
      "type": "function"
    }, {
      "inputs": [{
        "internalType": "address",
        "name": "token",
        "type": "address"
      }],
      "name": "getHTReservers",
      "outputs": [{
        "internalType": "uint256",
        "name": "reserveA",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "reserveB",
        "type": "uint256"
      }],
      "stateMutability": "view",
      "type": "function"
    }, {
      "inputs": [{
        "internalType": "uint256",
        "name": "amountA",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "reserveA",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "reserveB",
        "type": "uint256"
      }],
      "name": "quote",
      "outputs": [{
        "internalType": "uint256",
        "name": "amountB",
        "type": "uint256"
      }],
      "stateMutability": "pure",
      "type": "function"
    }, {
      "inputs": [{
        "internalType": "address",
        "name": "tokenA",
        "type": "address"
      }, {
        "internalType": "address",
        "name": "tokenB",
        "type": "address"
      }, {
        "internalType": "uint256",
        "name": "liquidity",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "amountAMin",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "amountBMin",
        "type": "uint256"
      }, {
        "internalType": "address",
        "name": "to",
        "type": "address"
      }, {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }],
      "name": "removeLiquidity",
      "outputs": [{
        "internalType": "uint256",
        "name": "amountA",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "amountB",
        "type": "uint256"
      }],
      "stateMutability": "nonpayable",
      "type": "function"
    }, {
      "inputs": [{
        "internalType": "address",
        "name": "token",
        "type": "address"
      }, {
        "internalType": "uint256",
        "name": "liquidity",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "amountTokenMin",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "amountHTMin",
        "type": "uint256"
      }, {
        "internalType": "address",
        "name": "to",
        "type": "address"
      }, {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }],
      "name": "removeLiquidityHT",
      "outputs": [{
        "internalType": "uint256",
        "name": "amountToken",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "amountHT",
        "type": "uint256"
      }],
      "stateMutability": "nonpayable",
      "type": "function"
    }, {
      "inputs": [{
        "internalType": "address",
        "name": "token",
        "type": "address"
      }, {
        "internalType": "uint256",
        "name": "liquidity",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "amountTokenMin",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "amountHTMin",
        "type": "uint256"
      }, {
        "internalType": "address",
        "name": "to",
        "type": "address"
      }, {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }],
      "name": "removeLiquidityHTSupportingFeeOnTransferTokens",
      "outputs": [{
        "internalType": "uint256",
        "name": "amountHT",
        "type": "uint256"
      }],
      "stateMutability": "nonpayable",
      "type": "function"
    }, {
      "inputs": [{
        "internalType": "address",
        "name": "token",
        "type": "address"
      }, {
        "internalType": "uint256",
        "name": "liquidity",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "amountTokenMin",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "amountHTMin",
        "type": "uint256"
      }, {
        "internalType": "address",
        "name": "to",
        "type": "address"
      }, {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }, {
        "internalType": "bool",
        "name": "approveMax",
        "type": "bool"
      }, {
        "internalType": "uint8",
        "name": "v",
        "type": "uint8"
      }, {
        "internalType": "bytes32",
        "name": "r",
        "type": "bytes32"
      }, {
        "internalType": "bytes32",
        "name": "s",
        "type": "bytes32"
      }],
      "name": "removeLiquidityHTWithPermit",
      "outputs": [{
        "internalType": "uint256",
        "name": "amountToken",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "amountHT",
        "type": "uint256"
      }],
      "stateMutability": "nonpayable",
      "type": "function"
    }, {
      "inputs": [{
        "internalType": "address",
        "name": "token",
        "type": "address"
      }, {
        "internalType": "uint256",
        "name": "liquidity",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "amountTokenMin",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "amountHTMin",
        "type": "uint256"
      }, {
        "internalType": "address",
        "name": "to",
        "type": "address"
      }, {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }, {
        "internalType": "bool",
        "name": "approveMax",
        "type": "bool"
      }, {
        "internalType": "uint8",
        "name": "v",
        "type": "uint8"
      }, {
        "internalType": "bytes32",
        "name": "r",
        "type": "bytes32"
      }, {
        "internalType": "bytes32",
        "name": "s",
        "type": "bytes32"
      }],
      "name": "removeLiquidityHTWithPermitSupportingFeeOnTransferTokens",
      "outputs": [{
        "internalType": "uint256",
        "name": "amountHT",
        "type": "uint256"
      }],
      "stateMutability": "nonpayable",
      "type": "function"
    }, {
      "inputs": [{
        "internalType": "address",
        "name": "tokenA",
        "type": "address"
      }, {
        "internalType": "address",
        "name": "tokenB",
        "type": "address"
      }, {
        "internalType": "uint256",
        "name": "liquidity",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "amountAMin",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "amountBMin",
        "type": "uint256"
      }, {
        "internalType": "address",
        "name": "to",
        "type": "address"
      }, {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }, {
        "internalType": "bool",
        "name": "approveMax",
        "type": "bool"
      }, {
        "internalType": "uint8",
        "name": "v",
        "type": "uint8"
      }, {
        "internalType": "bytes32",
        "name": "r",
        "type": "bytes32"
      }, {
        "internalType": "bytes32",
        "name": "s",
        "type": "bytes32"
      }],
      "name": "removeLiquidityWithPermit",
      "outputs": [{
        "internalType": "uint256",
        "name": "amountA",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "amountB",
        "type": "uint256"
      }],
      "stateMutability": "nonpayable",
      "type": "function"
    }, {
      "inputs": [{
        "internalType": "uint256",
        "name": "amountOutMin",
        "type": "uint256"
      }, {
        "internalType": "address[]",
        "name": "path",
        "type": "address[]"
      }, {
        "internalType": "address",
        "name": "to",
        "type": "address"
      }, {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }],
      "name": "swapExactHTForTokens",
      "outputs": [{
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      }],
      "stateMutability": "payable",
      "type": "function"
    }, {
      "inputs": [{
        "internalType": "uint256",
        "name": "amountOutMin",
        "type": "uint256"
      }, {
        "internalType": "address[]",
        "name": "path",
        "type": "address[]"
      }, {
        "internalType": "address",
        "name": "to",
        "type": "address"
      }, {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }],
      "name": "swapExactHTForTokensSupportingFeeOnTransferTokens",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    }, {
      "inputs": [{
        "internalType": "uint256",
        "name": "amountIn",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "amountOutMin",
        "type": "uint256"
      }, {
        "internalType": "address[]",
        "name": "path",
        "type": "address[]"
      }, {
        "internalType": "address",
        "name": "to",
        "type": "address"
      }, {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }],
      "name": "swapExactTokensForHT",
      "outputs": [{
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      }],
      "stateMutability": "nonpayable",
      "type": "function"
    }, {
      "inputs": [{
        "internalType": "uint256",
        "name": "amountIn",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "amountOutMin",
        "type": "uint256"
      }, {
        "internalType": "address[]",
        "name": "path",
        "type": "address[]"
      }, {
        "internalType": "address",
        "name": "to",
        "type": "address"
      }, {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }],
      "name": "swapExactTokensForHTSupportingFeeOnTransferTokens",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }, {
      "inputs": [{
        "internalType": "uint256",
        "name": "amountIn",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "amountOutMin",
        "type": "uint256"
      }, {
        "internalType": "address[]",
        "name": "path",
        "type": "address[]"
      }, {
        "internalType": "address",
        "name": "to",
        "type": "address"
      }, {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }],
      "name": "swapExactTokensForTokens",
      "outputs": [{
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      }],
      "stateMutability": "nonpayable",
      "type": "function"
    }, {
      "inputs": [{
        "internalType": "uint256",
        "name": "amountIn",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "amountOutMin",
        "type": "uint256"
      }, {
        "internalType": "address[]",
        "name": "path",
        "type": "address[]"
      }, {
        "internalType": "address",
        "name": "to",
        "type": "address"
      }, {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }],
      "name": "swapExactTokensForTokensSupportingFeeOnTransferTokens",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }, {
      "inputs": [{
        "internalType": "uint256",
        "name": "amountOut",
        "type": "uint256"
      }, {
        "internalType": "address[]",
        "name": "path",
        "type": "address[]"
      }, {
        "internalType": "address",
        "name": "to",
        "type": "address"
      }, {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }],
      "name": "swapHTForExactTokens",
      "outputs": [{
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      }],
      "stateMutability": "payable",
      "type": "function"
    }, {
      "inputs": [{
        "internalType": "uint256",
        "name": "amountOut",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "amountInMax",
        "type": "uint256"
      }, {
        "internalType": "address[]",
        "name": "path",
        "type": "address[]"
      }, {
        "internalType": "address",
        "name": "to",
        "type": "address"
      }, {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }],
      "name": "swapTokensForExactHT",
      "outputs": [{
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      }],
      "stateMutability": "nonpayable",
      "type": "function"
    }, {
      "inputs": [{
        "internalType": "uint256",
        "name": "amountOut",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "amountInMax",
        "type": "uint256"
      }, {
        "internalType": "address[]",
        "name": "path",
        "type": "address[]"
      }, {
        "internalType": "address",
        "name": "to",
        "type": "address"
      }, {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }],
      "name": "swapTokensForExactTokens",
      "outputs": [{
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      }],
      "stateMutability": "nonpayable",
      "type": "function"
    }, {
      "stateMutability": "payable",
      "type": "receive"
    }
  ],


  // hepool_abi
  BXHHepoolRewardsAddress: '0x55bf276e2a2e10AEB62c0Ed37D36585cB24d9cC1', //staking 正式网络合约地址
  // BXHHepoolRewardsAddress: '0xFB03e11D93632D97a8981158A632Dd5986F5E909', //staking 测试网络合约地址
  BXHHepoolRewardsABI: [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "lockedToken",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract IMdx",
          "name": "_mdx",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_mdxPerBlock",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_startBlock",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "pid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Deposit",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "pid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "EmergencyWithdraw",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "pid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Withdraw",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "LpOfPid",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_allocPoint",
          "type": "uint256"
        },
        {
          "internalType": "contract IERC20",
          "name": "_lpToken",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "_withUpdate",
          "type": "bool"
        }
      ],
      "name": "add",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_addLP",
          "type": "address"
        }
      ],
      "name": "addMultLP",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        }
      ],
      "name": "emergencyWithdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_lastRewardBlock",
          "type": "uint256"
        }
      ],
      "name": "getMdxBlockReward",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        }
      ],
      "name": "getMultLPAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getMultLPLength",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "halvingPeriod",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_LP",
          "type": "address"
        }
      ],
      "name": "isMultLP",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "massUpdatePools",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "mdx",
      "outputs": [
        {
          "internalType": "contract IMdx",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "mdxPerBlock",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "multLpChef",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "multLpToken",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "paused",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "pending",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "blockNumber",
          "type": "uint256"
        }
      ],
      "name": "phase",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "poolCorrespond",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "poolInfo",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "lpToken",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "allocPoint",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "lastRewardBlock",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "accMdxPerShare",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "accMultLpPerShare",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalAmount",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "poolLength",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_multLpToken",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_multLpChef",
          "type": "address"
        }
      ],
      "name": "replaceMultLP",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "blockNumber",
          "type": "uint256"
        }
      ],
      "name": "reward",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_allocPoint",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "_withUpdate",
          "type": "bool"
        }
      ],
      "name": "set",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_block",
          "type": "uint256"
        }
      ],
      "name": "setHalvingPeriod",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_newPerBlock",
          "type": "uint256"
        }
      ],
      "name": "setMdxPerBlock",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_multLpToken",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_multLpChef",
          "type": "address"
        }
      ],
      "name": "setMultLP",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "setPause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_sid",
          "type": "uint256"
        }
      ],
      "name": "setPoolCorr",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "startBlock",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalAllocPoint",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        }
      ],
      "name": "updatePool",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "userInfo",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "rewardDebt",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "multLpRewardDebt",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],

  BXHPairABI: [
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount0",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount1",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "Burn",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount0",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount1",
          "type": "uint256"
        }
      ],
      "name": "Mint",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount0In",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount1In",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount0Out",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount1Out",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "Swap",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint112",
          "name": "reserve0",
          "type": "uint112"
        },
        {
          "indexed": false,
          "internalType": "uint112",
          "name": "reserve1",
          "type": "uint112"
        }
      ],
      "name": "Sync",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "DOMAIN_SEPARATOR",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "MINIMUM_LIQUIDITY",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "PERMIT_TYPEHASH",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "burn",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amount0",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount1",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "factory",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getReserves",
      "outputs": [
        {
          "internalType": "uint112",
          "name": "_reserve0",
          "type": "uint112"
        },
        {
          "internalType": "uint112",
          "name": "_reserve1",
          "type": "uint112"
        },
        {
          "internalType": "uint32",
          "name": "_blockTimestampLast",
          "type": "uint32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "_token0",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_token1",
          "type": "address"
        }
      ],
      "name": "initialize",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "kLast",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "mint",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "liquidity",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "nonces",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        },
        {
          "internalType": "uint8",
          "name": "v",
          "type": "uint8"
        },
        {
          "internalType": "bytes32",
          "name": "r",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "s",
          "type": "bytes32"
        }
      ],
      "name": "permit",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "baseDecimal",
          "type": "uint256"
        }
      ],
      "name": "price",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "price0CumulativeLast",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "price1CumulativeLast",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "skim",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount0Out",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount1Out",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "swap",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "sync",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "token0",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "token1",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],

  BXHFactoryRewardsAddress: '0xe0367ec2bd4Ba22B1593E4fEFcB91D29DE6C512a',  // 正式
  // BXHFactoryRewardsAddress: '0xB6B1fE87cAa52D968832a5053116af08f4601475', // 测试
  BXHFactory: [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_feeToSetter",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "token0",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "token1",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "pair",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "PairCreated",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "allPairs",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "allPairsLength",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenA",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "tokenB",
          "type": "address"
        }
      ],
      "name": "createPair",
      "outputs": [
        {
          "internalType": "address",
          "name": "pair",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "feeTo",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "feeToRate",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "feeToSetter",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountOut",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "reserveIn",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "reserveOut",
          "type": "uint256"
        }
      ],
      "name": "getAmountIn",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amountIn",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountIn",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "reserveIn",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "reserveOut",
          "type": "uint256"
        }
      ],
      "name": "getAmountOut",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amountOut",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountOut",
          "type": "uint256"
        },
        {
          "internalType": "address[]",
          "name": "path",
          "type": "address[]"
        }
      ],
      "name": "getAmountsIn",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountIn",
          "type": "uint256"
        },
        {
          "internalType": "address[]",
          "name": "path",
          "type": "address[]"
        }
      ],
      "name": "getAmountsOut",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getInitCodeHash",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "getPair",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenA",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "tokenB",
          "type": "address"
        }
      ],
      "name": "getReserves",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "reserveA",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "reserveB",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "initCode",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "initCodeHash",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenA",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "tokenB",
          "type": "address"
        }
      ],
      "name": "pairFor",
      "outputs": [
        {
          "internalType": "address",
          "name": "pair",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountA",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "reserveA",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "reserveB",
          "type": "uint256"
        }
      ],
      "name": "quote",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amountB",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "_feeTo",
          "type": "address"
        }
      ],
      "name": "setFeeTo",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_rate",
          "type": "uint256"
        }
      ],
      "name": "setFeeToRate",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "_feeToSetter",
          "type": "address"
        }
      ],
      "name": "setFeeToSetter",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_initCodeHash",
          "type": "bytes32"
        }
      ],
      "name": "setInitCodeHash",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenA",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "tokenB",
          "type": "address"
        }
      ],
      "name": "sortTokens",
      "outputs": [
        {
          "internalType": "address",
          "name": "token0",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "token1",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ],

  // MdexPair_abi
  BXHPairRewardsABI: [
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount0",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount1",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "Burn",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount0",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount1",
          "type": "uint256"
        }
      ],
      "name": "Mint",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount0In",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount1In",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount0Out",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount1Out",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "Swap",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint112",
          "name": "reserve0",
          "type": "uint112"
        },
        {
          "indexed": false,
          "internalType": "uint112",
          "name": "reserve1",
          "type": "uint112"
        }
      ],
      "name": "Sync",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "DOMAIN_SEPARATOR",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "MINIMUM_LIQUIDITY",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "PERMIT_TYPEHASH",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "burn",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amount0",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount1",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "factory",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getReserves",
      "outputs": [
        {
          "internalType": "uint112",
          "name": "_reserve0",
          "type": "uint112"
        },
        {
          "internalType": "uint112",
          "name": "_reserve1",
          "type": "uint112"
        },
        {
          "internalType": "uint32",
          "name": "_blockTimestampLast",
          "type": "uint32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "_token0",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_token1",
          "type": "address"
        }
      ],
      "name": "initialize",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "kLast",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "mint",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "liquidity",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "nonces",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        },
        {
          "internalType": "uint8",
          "name": "v",
          "type": "uint8"
        },
        {
          "internalType": "bytes32",
          "name": "r",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "s",
          "type": "bytes32"
        }
      ],
      "name": "permit",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "baseDecimal",
          "type": "uint256"
        }
      ],
      "name": "price",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "price0CumulativeLast",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "price1CumulativeLast",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "skim",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount0Out",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount1Out",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "swap",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "sync",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "token0",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "token1",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],

  // wht_abi (HT/WHT兑换的合约地址、abi)
  BXHWhtRewardsAddress: '0x5545153CCFcA01fbd7Dd11C0b23ba694D9509A6F',
  BXHWhtRewardsABI: [
    { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "src", "type": "address" }, { "indexed": true, "internalType": "address", "name": "guy", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "dst", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "src", "type": "address" }, { "indexed": true, "internalType": "address", "name": "dst", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "src", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "Withdrawal", "type": "event" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "guy", "type": "address" }, { "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "deposit", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "dst", "type": "address" }, { "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "src", "type": "address" }, { "internalType": "address", "name": "dst", "type": "address" }, { "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "wad", "type": "uint256" }], "name": "withdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }
  ],

  // 兑换币种列表 tokens
  BXHTokensList: [
    {
      "name": "BXH",
      // "address": "0x2E90FF584Bbe93709fFc8577E7b58d921Da6A4ce",  // 128 测试合约地址
      "address": "0xcBD6Cb9243d8e3381Fea611EF023e17D1B7AeDF0", // 128 正式合约地址
      "symbol": "BXH",
      "decimals": 18,
      "chainId": 128,
      "logoURI": "https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/BXH.png"
    },
    {
      "name": "Wrapped HT",
      "address": "0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f",
      "symbol": "WHT",
      "decimals": 18,
      "chainId": 128,
      "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/2502.png"
    },
    {
      "name": "MDX",
      "address": "0x25D2e80cB6B86881Fd7e07dd263Fb79f4AbE033c",
      "symbol": "MDX",
      "decimals": 18,
      "chainId": 128,
      "logoURI": "https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/MDX.png"
    },
    {
      "name": "Heco-Peg USDTHECO Token",
      "address": "0xa71edc38d189767582c38a3145b5873052c3e47a",
      "symbol": "USDT",
      "decimals": 18,
      "chainId": 128,
      "logoURI": "https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/USDT.png"
    },
    {
      "name": "Heco-Peg HBTC Token",
      "address": "0x66a79d23e58475d2738179ca52cd0b41d73f0bea",
      "symbol": "HBTC",
      "decimals": 18,
      "chainId": 128,
      "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/6941.png"
    },
    {
      "name": "Heco-Peg ETH Token",
      "address": "0x64ff637fb478863b7468bc97d30a5bf3a428a1fd",
      "symbol": "ETH",
      "decimals": 18,
      "chainId": 128,
      "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
    },
    {
      "name": "DEP Token",
      "address": "0x48C859531254F25e57D1C1A8E030Ef0B1c895c27",
      "symbol": "DEP",
      "decimals": 18,
      "chainId": 128,
      "logoURI": "https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/DEP.png"
    },
    {
      "name": "TPT Token",
      "address": "0x9ef1918a9bee17054b35108bd3e2665e2af1bb1b",
      "symbol": "TPT",
      "decimals": 4,
      "chainId": 128,
      "logoURI": "https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/TPT.png"
    },
    {
      "name": "RUFF Token",
      "address": "0x3fb9c619bc31d5e98aeb698cea697f6010f9f8f4",
      "symbol": "RUFF",
      "decimals": 18,
      "chainId": 128,
      "logoURI": "https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/RUFF.png"
    },
    {
      "name": "Heco-Peg HPT Token",
      "address": "0xE499Ef4616993730CEd0f31FA2703B92B50bB536",
      "symbol": "HPT",
      "decimals": 18,
      "chainId": 128,
      "logoURI": "https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/HPT.png"
    },
    {
      "name": "HBO",
      "address": "0x8764Bd4fcc027faF72bA83c0b2028a3BAE0D2D57",
      "symbol": "HBO",
      "decimals": 18,
      "chainId": 128,
      "logoURI": "https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/HBO.png"
    },
    {
      "name": "SLNV2",
      "address": "0x4e252342cf35ff02c4cca9bc655129f5b4a2f901",
      "symbol": "SLNV2",
      "decimals": 18,
      "chainId": 128,
      "logoURI": "https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/SLNV2.png"
    },
    {
      "name": "JT",
      "address": "0xc0ecc17c6c87b32b2a86d9f4a783974cb1e6507c",
      "symbol": "JT",
      "decimals": 18,
      "chainId": 128,
      "logoURI": "https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/JT.png"
    },
    {
      "name": "Heco-Peg HUSD Token",
      "address": "0x0298c2b32eae4da002a15f36fdf7615bea3da047",
      "symbol": "HUSD",
      "decimals": 8,
      "chainId": 128,
      "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/4779.png"
    },
    {
      "name": "Heco-Peg HLTC Token",
      "address": "0xecb56cf772b5c9a6907fb7d32387da2fcbfb63b4",
      "symbol": "HLTC",
      "decimals": 18,
      "chainId": 128,
      "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/2.png"
    },
    {
      "name": "Heco-Peg HDOT Token",
      "address": "0xa2c49cee16a5e5bdefde931107dc1fae9f7773e3",
      "symbol": "HDOT",
      "decimals": 18,
      "chainId": 128,
      "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/6636.png"
    },
    {
      "name": "Heco-Peg HFIL Token",
      "address": "0xae3a768f9ab104c69a7cd6041fe16ffa235d1810",
      "symbol": "HFIL",
      "decimals": 18,
      "chainId": 128,
      "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/2280.png"
    },
    {
      "name": "UNI",
      "address": "0x22c54ce8321a4015740ee1109d9cbc25815c46e6",
      "symbol": "UNI",
      "decimals": 18,
      "chainId": 128,
      "logoURI": "https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/UNI.png"
    },
    {
      "name": "AAVE",
      "address": "0x202b4936fe1a82a4965220860ae46d7d3939bb25",
      "symbol": "AAVE",
      "decimals": 18,
      "chainId": 128,
      "logoURI": "https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/AAVE.png"
    },
  ],

  BXHAsset: {
    "name": "BXH",
    "address": "0x25D2e80cB6B86881Fd7e07dd263Fb79f4AbE033c",
    "symbol": "BXH",
    "decimals": 18,
    "chainId": 128,
    "logoURI": "https://raw.githubusercontent.com/mdexSwap/token-icons/main/heco/0x25d2e80cb6b86881fd7e07dd263fb79f4abe033c.png"
  },
  //Dao
  BXHDaoABI: [
    {
      "inputs": [
        {
          "internalType": "contract IWHT",
          "name": "_wht",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_cycle",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "pid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Deposit",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "pid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "EmergencyWithdraw",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "pid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Withdraw",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_allocPoint",
          "type": "uint256"
        },
        {
          "internalType": "contract IERC20",
          "name": "_lpToken",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "_withUpdate",
          "type": "bool"
        }
      ],
      "name": "add",
      "outputs": [

      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [

      ],
      "name": "cycle",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "deposit",
      "outputs": [

      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        }
      ],
      "name": "emergencyWithdraw",
      "outputs": [

      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [

      ],
      "name": "endBlock",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [

      ],
      "name": "massUpdatePools",
      "outputs": [

      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_whtAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_newPerBlock",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_startBlock",
          "type": "uint256"
        }
      ],
      "name": "newAirdrop",
      "outputs": [

      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [

      ],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "pending",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "poolInfo",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "lpToken",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "allocPoint",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "lastRewardBlock",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "accWhtPerShare",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [

      ],
      "name": "poolLength",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [

      ],
      "name": "renounceOwnership",
      "outputs": [

      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_allocPoint",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "_withUpdate",
          "type": "bool"
        }
      ],
      "name": "set",
      "outputs": [

      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_newCycle",
          "type": "uint256"
        }
      ],
      "name": "setCycle",
      "outputs": [

      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [

      ],
      "name": "startBlock",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [

      ],
      "name": "totalAllocPoint",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [

      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        }
      ],
      "name": "updatePool",
      "outputs": [

      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "userInfo",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "rewardDebt",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [

      ],
      "name": "wht",
      "outputs": [
        {
          "internalType": "contract IWHT",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [

      ],
      "name": "whtPerBlock",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "withdraw",
      "outputs": [

      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  BXHDaoV2ABI: [{"inputs":[{"internalType":"address","name":"xAddress","type":"address"},{"internalType":"address","name":"dAddress","type":"address"},{"internalType":"address","name":"bAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"BonusToken","outputs":[{"internalType":"contract ERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who","type":"address"}],"name":"_unlockingAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimedRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentEpoch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dToken","outputs":[{"internalType":"contract ERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"donateBonusToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"epochLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who","type":"address"}],"name":"lockRequestCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lockingLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who","type":"address"}],"name":"pendingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"relock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"relockAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardsAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_epochLength","type":"uint256"},{"internalType":"uint256","name":"_lockingLength","type":"uint256"}],"name":"setLockingParams","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_startTime","type":"uint256"}],"name":"setStartTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"shareAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sharesAndRewardsInfo","outputs":[{"internalType":"uint256","name":"activeShares","type":"uint256"},{"internalType":"uint256","name":"pendingSharesToAdd","type":"uint256"},{"internalType":"uint256","name":"pendingSharesToReduce","type":"uint256"},{"internalType":"uint256","name":"rewards","type":"uint256"},{"internalType":"uint256","name":"claimedRewards","type":"uint256"},{"internalType":"uint256","name":"lastUpdatedEpochFlag","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unStake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"unlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"who","type":"address"}],"name":"unlockableAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who","type":"address"}],"name":"unstakableAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"lastRewardedEpoch","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userUnlockRequests","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"unlockTimestamp","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"xToken","outputs":[{"internalType":"contract XToken","name":"","type":"address"}],"stateMutability":"view","type":"function"}],
  BXHDaoV3ABI: [{"inputs":[{"internalType":"address","name":"_bonusToken","type":"address"},{"internalType":"uint256","name":"_cycle","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"bonusPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bonusToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cycle","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenAmount","type":"uint256"},{"internalType":"uint256","name":"_newPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"name":"newAirdrop","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pending","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accBonusPerShare","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newCycle","type":"uint256"}],"name":"setCycle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}],
  //dao锁仓
  BXHDAOLockUpABI: [{"inputs":[{"internalType":"string","name":"__name","type":"string"},{"internalType":"uint256","name":"_lockTime","type":"uint256"},{"internalType":"address","name":"_BXH","type":"address"},{"internalType":"address","name":"_governance","type":"address"},{"internalType":"address","name":"chef","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"BXH","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_a","type":"address"}],"name":"addLimitTarget","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"allowContract","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"canWithdraw","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"enableTranferLimit","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"governance","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lockBlocks","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lockTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"openWithdraw","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_a","type":"address"}],"name":"removeLimitTarget","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_governance","type":"address"}],"name":"setGovernance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_b","type":"bool"}],"name":"toggleAllowContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_e","type":"bool"}],"name":"toggleOpenWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_e","type":"bool"}],"name":"toggleTransferLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"transferLimitTargets","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_lt","type":"uint256"}],"name":"updateLockTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_shares","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"}],
  //燃烧挖矿
  BXHCombustionABI: [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"offerAmount","type":"uint256"}],"name":"HarvestOffer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"excessAmount","type":"uint256"}],"name":"HarvestRefund","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_endBlock","type":"uint256"},{"internalType":"uint256","name":"_releaseAmount","type":"uint256"}],"name":"addReleasePeroid","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"addressList","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"adminAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentReleaseIdx","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_lpAmount","type":"uint256"},{"internalType":"uint256","name":"_offerAmount","type":"uint256"}],"name":"finalWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getAddressListLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"getCurrentRlease","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getOfferingAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getRefundingAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"}],"name":"getReleaseInfo","outputs":[{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_endBlock","type":"uint256"},{"internalType":"uint256","name":"_releasePerBlock","type":"uint256"},{"internalType":"uint256","name":"_releaseAmount","type":"uint256"},{"internalType":"uint256","name":"_lastTotalAmount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReleaseLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"blockNumber","type":"uint256"}],"name":"getReleaseUpdate","outputs":[{"internalType":"uint256","name":"_releaseAmountUpdated","type":"uint256"},{"internalType":"uint256","name":"_releaseIdUpdate","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getUserAllocation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"getUserCurrentRlease","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"userAddr","type":"address"}],"name":"harvestV","outputs":[{"internalType":"uint256","name":"offeringTokenAmount","type":"uint256"},{"internalType":"uint256","name":"currentAmount","type":"uint256"},{"internalType":"uint256","name":"refundingTokenAmount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"blocknumber","type":"uint256"},{"internalType":"address","name":"userAddr","type":"address"}],"name":"harvestVWhen","outputs":[{"internalType":"uint256","name":"offeringTokenAmount","type":"uint256"},{"internalType":"uint256","name":"currentAmount","type":"uint256"},{"internalType":"uint256","name":"refundingTokenAmount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"hasHarvest","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"address","name":"_offeringToken","type":"address"},{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_endBlock","type":"uint256"},{"internalType":"uint256","name":"_offeringAmount","type":"uint256"},{"internalType":"uint256","name":"_raisingAmount","type":"uint256"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lastUpdateBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"offeringAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"offeringToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raisingAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"releasePeroids","outputs":[{"internalType":"uint256","name":"startBlock","type":"uint256"},{"internalType":"uint256","name":"endBlock","type":"uint256"},{"internalType":"uint256","name":"releasePerBlock","type":"uint256"},{"internalType":"uint256","name":"releaseAmount","type":"uint256"},{"internalType":"uint256","name":"lastTotalAmount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_offerAmount","type":"uint256"}],"name":"setOfferingAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_raisingAmount","type":"uint256"}],"name":"setRaisingAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAmountReleased","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"updateRelease","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bool","name":"claimed","type":"bool"},{"internalType":"uint256","name":"offeringTokenAmount","type":"uint256"},{"internalType":"uint256","name":"amountDept","type":"uint256"}],"stateMutability":"view","type":"function"}],
  //燃烧铸造领取
  BXHCombustionClaimABI: [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "Deposit",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "offerAmount",
          type: "uint256",
        },
      ],
      name: "HarvestOffer",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "excessAmount",
          type: "uint256",
        },
      ],
      name: "HarvestRefund",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_startBlock", type: "uint256" },
        { internalType: "uint256", name: "_endBlock", type: "uint256" },
        { internalType: "uint256", name: "_releaseAmount", type: "uint256" },
      ],
      name: "addReleasePeroid",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "addressList",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "adminAddress",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "currentReleaseIdx",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "dao",
      outputs: [
        { internalType: "contract RaiseDAO", name: "", type: "address" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "endBlock",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_lpAmount", type: "uint256" },
        { internalType: "uint256", name: "_offerAmount", type: "uint256" },
      ],
      name: "finalWithdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "finalWithdrawBlock",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getAddressListLength",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
      name: "getCurrentRlease",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_user", type: "address" }],
      name: "getOfferingAmount",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_user", type: "address" }],
      name: "getRefundingAmount",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "pid", type: "uint256" }],
      name: "getReleaseInfo",
      outputs: [
        { internalType: "uint256", name: "_startBlock", type: "uint256" },
        { internalType: "uint256", name: "_endBlock", type: "uint256" },
        { internalType: "uint256", name: "_releasePerBlock", type: "uint256" },
        { internalType: "uint256", name: "_releaseAmount", type: "uint256" },
        { internalType: "uint256", name: "_lastTotalAmount", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getReleaseLength",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "blockNumber", type: "uint256" },
      ],
      name: "getReleaseUpdate",
      outputs: [
        {
          internalType: "uint256",
          name: "_releaseAmountUpdated",
          type: "uint256",
        },
        { internalType: "uint256", name: "_releaseIdUpdate", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_user", type: "address" }],
      name: "getUserAllocation",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "addr", type: "address" }],
      name: "getUserCurrentRlease",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "harvest",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "harvestAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "harvestOfferingBlock",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "harvestRefundingBlock",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "userAddr", type: "address" }],
      name: "harvestV",
      outputs: [
        {
          internalType: "uint256",
          name: "offeringTokenAmount",
          type: "uint256",
        },
        { internalType: "uint256", name: "currentAmount", type: "uint256" },
        {
          internalType: "uint256",
          name: "refundingTokenAmount",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "blocknumber", type: "uint256" },
        { internalType: "address", name: "userAddr", type: "address" },
      ],
      name: "harvestVWhen",
      outputs: [
        {
          internalType: "uint256",
          name: "offeringTokenAmount",
          type: "uint256",
        },
        { internalType: "uint256", name: "currentAmount", type: "uint256" },
        {
          internalType: "uint256",
          name: "refundingTokenAmount",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_user", type: "address" }],
      name: "hasHarvest",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_lpToken", type: "address" },
        { internalType: "address", name: "_offeringToken", type: "address" },
        { internalType: "uint256", name: "_startBlock", type: "uint256" },
        { internalType: "uint256", name: "_endBlock", type: "uint256" },
        {
          internalType: "uint256",
          name: "_finalWithdrawBlock",
          type: "uint256",
        },
        { internalType: "uint256", name: "_offeringAmount", type: "uint256" },
        { internalType: "uint256", name: "_raisingAmount", type: "uint256" },
        { internalType: "uint256", name: "_totalAmount", type: "uint256" },
      ],
      name: "initialize",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "lastUpdateBlock",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "lpToken",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "offeringAmount",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "offeringToken",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "raisingAmount",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "releasePeroids",
      outputs: [
        { internalType: "uint256", name: "startBlock", type: "uint256" },
        { internalType: "uint256", name: "endBlock", type: "uint256" },
        { internalType: "uint256", name: "releasePerBlock", type: "uint256" },
        { internalType: "uint256", name: "releaseAmount", type: "uint256" },
        { internalType: "uint256", name: "lastTotalAmount", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_finalWithdrawBlock",
          type: "uint256",
        },
      ],
      name: "setFinalWithdrawBlock",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_harvestOfferingBlock",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_harvestRefundingBlock",
          type: "uint256",
        },
      ],
      name: "setHavestBlock",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_offerAmount", type: "uint256" },
      ],
      name: "setOfferingAmount",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_offeringToken", type: "address" },
      ],
      name: "setOfferingToken",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_dao", type: "address" }],
      name: "setRaiseDao",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_raisingAmount", type: "uint256" },
      ],
      name: "setRaisingAmount",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "startBlock",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "sync",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "syncUserTest",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "syncUserV",
      outputs: [
        { internalType: "uint256", name: "amount", type: "uint256" },
        { internalType: "bool", name: "claimed", type: "bool" },
        {
          internalType: "uint256",
          name: "offeringTokenAmount",
          type: "uint256",
        },
        { internalType: "uint256", name: "amountDept", type: "uint256" },
        {
          internalType: "uint256",
          name: "refundingTokenAmount",
          type: "uint256",
        },
        { internalType: "bool", name: "refundClaimed", type: "bool" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalAmount",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalAmountReleased",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "updateRelease",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "userInfo",
      outputs: [
        { internalType: "uint256", name: "amount", type: "uint256" },
        { internalType: "bool", name: "claimed", type: "bool" },
        {
          internalType: "uint256",
          name: "offeringTokenAmount",
          type: "uint256",
        },
        { internalType: "uint256", name: "amountDept", type: "uint256" },
        {
          internalType: "uint256",
          name: "refundingTokenAmount",
          type: "uint256",
        },
        { internalType: "bool", name: "refundClaimed", type: "bool" },
        { internalType: "bool", name: "synced", type: "bool" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "userInfoSyncView",
      outputs: [
        { internalType: "uint256", name: "amount", type: "uint256" },
        { internalType: "bool", name: "claimed", type: "bool" },
        {
          internalType: "uint256",
          name: "offeringTokenAmount",
          type: "uint256",
        },
        { internalType: "uint256", name: "amountDept", type: "uint256" },
        {
          internalType: "uint256",
          name: "refundingTokenAmount",
          type: "uint256",
        },
        { internalType: "bool", name: "refundClaimed", type: "bool" },
        { internalType: "bool", name: "synced", type: "bool" },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],

  BXHTwABI: [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "singleToken_",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "symbol",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "pid_",
          "type": "uint256"
        },
        {
          "internalType": "uint8",
          "name": "_decimals",
          "type": "uint8"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Paused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "previousAdminRole",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "newAdminRole",
          "type": "bytes32"
        }
      ],
      "name": "RoleAdminChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "RoleGranted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "RoleRevoked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Staked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Unpaused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Withdrawn",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "DEFAULT_ADMIN_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "MINTER_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "PAUSER_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "TRANSFER_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "WITHDRAW_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "burn",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "burnFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "bxhv2FundAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "subtractedValue",
          "type": "uint256"
        }
      ],
      "name": "decreaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "exit",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "frozenStakingTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        }
      ],
      "name": "getRoleAdmin",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "getRoleMember",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        }
      ],
      "name": "getRoleMemberCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "grantRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "hasRole",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "addedValue",
          "type": "uint256"
        }
      ],
      "name": "increaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "lastStakeTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "minStakeAmount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "paused",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pid",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "renounceRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "revokeRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "rewardDistribution",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "frozenStakingTime_",
          "type": "uint256"
        }
      ],
      "name": "setFrozenStakingTime",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "bxhv2FundAddress_",
          "type": "address"
        }
      ],
      "name": "setbxhV2FundAddress",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "minStakeAmount_",
          "type": "uint256"
        }
      ],
      "name": "setminStakeAmount",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "stake",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "unfrozenStakeTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "unpause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "vaultAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "withdrawETHEmergency",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenaddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "withdrawEmergency",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "rewardTokenAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "withdrawRewardToFundAddress",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],


  //空投
  BXHAirDropABI: [
    {
      "inputs": [{
        "internalType": "address",
        "name": "_usdt",
        "type": "address"
      }, {
        "internalType": "address",
        "name": "_bxh",
        "type": "address"
      }],
      "stateMutability": "nonpayable",
      "type": "constructor"
    }, {
      "anonymous": false,
      "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      }, {
        "indexed": true,
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256"
      }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }],
      "name": "EmergencyWithdraw",
      "type": "event"
    }, {
      "anonymous": false,
      "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      }, {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }],
      "name": "OwnershipTransferred",
      "type": "event"
    }, {
      "anonymous": false,
      "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      }, {
        "indexed": true,
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256"
      }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }],
      "name": "RequestWithdraw",
      "type": "event"
    }, {
      "anonymous": false,
      "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      }, {
        "indexed": true,
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256"
      }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }],
      "name": "Withdraw",
      "type": "event"
    }, {
      "inputs": [],
      "name": "bxh",
      "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
      }],
      "stateMutability": "view",
      "type": "function"
    }, {
      "inputs": [],
      "name": "currentPeroid",
      "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }],
      "stateMutability": "view",
      "type": "function"
    }, {
      "inputs": [{
        "internalType": "uint256",
        "name": "_startBlock",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "_endBlock",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "_price",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "_rewardPerUser",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "_totalReward",
        "type": "uint256"
      }],
      "name": "newAirdrop",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }, {
      "inputs": [],
      "name": "owner",
      "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
      }],
      "stateMutability": "view",
      "type": "function"
    }, {
      "inputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }],
      "name": "peroidInfo",
      "outputs": [{
        "internalType": "uint256",
        "name": "startBlock",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "endBlock",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "rewardPerUser",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "totalReward",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "totalAlloc",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "totalRequest",
        "type": "uint256"
      }],
      "stateMutability": "view",
      "type": "function"
    }, {
      "inputs": [],
      "name": "peroidLength",
      "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }],
      "stateMutability": "view",
      "type": "function"
    }, {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }, {
      "inputs": [],
      "name": "requestWithdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }, {
      "inputs": [],
      "name": "totalAllocAmount",
      "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }],
      "stateMutability": "view",
      "type": "function"
    }, {
      "inputs": [],
      "name": "totalRewardAmount",
      "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }],
      "stateMutability": "view",
      "type": "function"
    }, {
      "inputs": [{
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }, {
      "inputs": [],
      "name": "usdt",
      "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
      }],
      "stateMutability": "view",
      "type": "function"
    }, {
      "inputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }, {
        "internalType": "address",
        "name": "",
        "type": "address"
      }],
      "name": "userInfo",
      "outputs": [{
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "rewardDebt",
        "type": "uint256"
      }],
      "stateMutability": "view",
      "type": "function"
    }, {
      "inputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }, {
        "internalType": "address",
        "name": "",
        "type": "address"
      }],
      "name": "userRequestInfo",
      "outputs": [{
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "rewardDebt",
        "type": "uint256"
      }],
      "stateMutability": "view",
      "type": "function"
    }, {
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  //团队锁仓
  BXHTeamLockABI:[
    {
      "inputs": [{
        "internalType": "address",
        "name": "_token",
        "type": "address"
      }, {
        "internalType": "uint256",
        "name": "_maxReward",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "_startBlock",
        "type": "uint256"
      }, {
        "internalType": "uint256",
        "name": "_endBlock",
        "type": "uint256"
      }, {
        "internalType": "string",
        "name": "_introduce",
        "type": "string"
      }],
      "stateMutability": "nonpayable",
      "type": "constructor"
    }, {
      "anonymous": false,
      "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      }, {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }],
      "name": "OwnershipTransferred",
      "type": "event"
    }, {
      "anonymous": false,
      "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }, {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }],
      "name": "WithDraw",
      "type": "event"
    }, {
      "inputs": [{
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }, {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }],
      "name": "addUser",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }, {
      "inputs": [],
      "name": "blockReward",
      "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }],
      "stateMutability": "view",
      "type": "function"
    }, {
      "inputs": [],
      "name": "endBlock",
      "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }],
      "stateMutability": "view",
      "type": "function"
    }, {
      "inputs": [],
      "name": "getBalance",
      "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }],
      "stateMutability": "view",
      "type": "function"
    }, {
      "inputs": [{
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }],
      "name": "getCurrentUserReward",
      "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }],
      "stateMutability": "view",
      "type": "function"
    }, {
      "inputs": [{
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }, {
        "internalType": "uint256",
        "name": "blocknumber",
        "type": "uint256"
      }],
      "name": "getReward",
      "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }],
      "stateMutability": "view",
      "type": "function"
    }, {
      "inputs": [{
        "internalType": "uint256",
        "name": "blocknumber",
        "type": "uint256"
      }],
      "name": "getTotalReward",
      "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }],
      "stateMutability": "view",
      "type": "function"
    }, {
      "inputs": [],
      "name": "introduce",
      "outputs": [{
        "internalType": "string",
        "name": "",
        "type": "string"
      }],
      "stateMutability": "view",
      "type": "function"
    }, {
      "inputs": [],
      "name": "maxReward",
      "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }],
      "stateMutability": "view",
      "type": "function"
    }, {
      "inputs": [],
      "name": "owner",
      "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
      }],
      "stateMutability": "view",
      "type": "function"
    }, {
      "inputs": [],
      "name": "paused",
      "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }],
      "stateMutability": "view",
      "type": "function"
    }, {
      "inputs": [{
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }, {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }],
      "name": "removeUser",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }, {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }, {
      "inputs": [],
      "name": "rewardDept",
      "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }],
      "stateMutability": "view",
      "type": "function"
    }, {
      "inputs": [],
      "name": "setPause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }, {
      "inputs": [],
      "name": "startBlock",
      "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }],
      "stateMutability": "view",
      "type": "function"
    }, {
      "inputs": [],
      "name": "token",
      "outputs": [{
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
      }],
      "stateMutability": "view",
      "type": "function"
    }, {
      "inputs": [],
      "name": "totalShare",
      "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }],
      "stateMutability": "view",
      "type": "function"
    }, {
      "inputs": [{
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }, {
      "inputs": [{
        "internalType": "address",
        "name": "beneficiary",
        "type": "address"
      }],
      "name": "withDraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  //BXH END



  // ----------------------------------------------------------------------------

  //DFKii START
  DFKiiRewardsAddress: '0xB936b8f602E3d3235EfE3978cC97670A96f43AD1', //staking 正式网络 dtrade合约地址
  // DFKiiRewardsAddress: '0x55D6783810b6804dBC3e7A76734782fa1F5d1bDe', //staking 测试网络 dtrade合约地址
  DFKiiRewardsABI: [
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "uniAddr",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "factor",
          "type": "uint256"
        }
      ],
      "name": "addDfkPair",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "uniAddr",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amountUL",
          "type": "uint256"
        }
      ],
      "name": "addLiquid",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "uniAddr",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "factor",
          "type": "uint256"
        }
      ],
      "name": "addUniswapPair",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_lockId",
          "type": "bytes32"
        }
      ],
      "name": "confirmChange",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_token1",
          "type": "address"
        },
        {
          "internalType": "address[]",
          "name": "_mans",
          "type": "address[]"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "_lockId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_newCustodian",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_clearCustodian",
          "type": "address"
        }
      ],
      "name": "ChangeConfirmed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "_lockId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_msgSender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_new",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_clear",
          "type": "address"
        }
      ],
      "name": "ChangeRequested",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "_lockId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_sender",
          "type": "address"
        }
      ],
      "name": "ChangeSweep",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "total",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "perblock",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "percentLP",
          "type": "uint256"
        }
      ],
      "name": "nextPeroid",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "uniAddr",
          "type": "address"
        }
      ],
      "name": "removeDfkPair",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "uniAddr",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amountUL",
          "type": "uint256"
        }
      ],
      "name": "removeLiquid",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "uniAddr",
          "type": "address"
        }
      ],
      "name": "removeUniswapPair",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "_new",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_clear",
          "type": "address"
        }
      ],
      "name": "requestChange",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "lockId",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "_dfk1Helper",
          "type": "address"
        }
      ],
      "name": "setDfk1Helper",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "_dfkii",
          "type": "address"
        }
      ],
      "name": "setDFKII",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_lockId",
          "type": "bytes32"
        }
      ],
      "name": "sweepChange",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "sweepeth",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenaddr",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "sweeptoken",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "withdrawBonus",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "withdrawDFK1Bonus",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "bonus_per_block",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "bonus_percent_LP",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "bonusWithdraw",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "calcBonus",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "calcDFK1Bonus",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "changeReqs",
      "outputs": [
        {
          "internalType": "address",
          "name": "proposedNew",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "proposedClear",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "checkpoint_number",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "checkpointHistory",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "dfk1Helper",
      "outputs": [
        {
          "internalType": "contract DFKImplHelper",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "dfkii",
      "outputs": [
        {
          "internalType": "contract DFKII",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "joinTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "liquidPairs",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "liquidPools",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "liquidsMap",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "liquidToken",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "managers",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "mancount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "mintCoin",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "peroid_left_bonus",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "peroid_mined_coin",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "peroid_total_bonus",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "profits4DFK1",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "requestCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "token1",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalFactor",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalLiquids",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalMint",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "uniswapLiquids",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ],

  //-----------------------------------------------------------------------------------------------------

  //交易 - 买/卖
  DFKiiUSDTRewardsAddress: '0x32f02Ce6102eD59aA0Cc75354C462916c6f22043', //staking 测试网络 dtrade合约地址
  // DFKiiUSDTRewardsAddress: '0x50532d5588BedE958C3C08eb994553387Ec440cA', //staking 测试网络 dtrade合约地址
  DFKiiUSDTRewardsABI: [
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount0",
          "type": "uint256"
        }
      ],
      "name": "addLiquid",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_token0",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_token1",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "refs",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "initprice",
          "type": "uint256"
        },
        {
          "internalType": "address[]",
          "name": "_mans",
          "type": "address[]"
        },
        {
          "internalType": "uint256",
          "name": "_miniLiquid",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "_lockId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_newCustodian",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_clearCustodian",
          "type": "address"
        }
      ],
      "name": "ChangeConfirmed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "_lockId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_msgSender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_new",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_clear",
          "type": "address"
        }
      ],
      "name": "ChangeRequested",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "_lockId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_sender",
          "type": "address"
        }
      ],
      "name": "ChangeSweep",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_lockId",
          "type": "bytes32"
        }
      ],
      "name": "confirmChange",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_fee2Liquid",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_fee2Refs",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_fee2Burn",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_priceFlips",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_miniLiquid",
          "type": "uint256"
        }
      ],
      "name": "fixPrice",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "pauseLiquity",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount0",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount1",
          "type": "uint256"
        }
      ],
      "name": "poolTokens",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountL",
          "type": "uint256"
        }
      ],
      "name": "removeLiquid",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "_new",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_clear",
          "type": "address"
        }
      ],
      "name": "replaceManager",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "_new",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_clear",
          "type": "address"
        }
      ],
      "name": "requestChange",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "lockId",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "resumeLiquity",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "price_mod",
          "type": "uint256"
        }
      ],
      "name": "setPriceMod",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount0",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount1",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "toLiquids",
          "type": "bool"
        }
      ],
      "name": "swap",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_lockId",
          "type": "bytes32"
        }
      ],
      "name": "sweepChange",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "sweepeth",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenaddr",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "sweeptoken",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount0",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount1",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "avg_price",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "fee",
          "type": "uint256"
        }
      ],
      "name": "TotalAmount",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "totalProfitBurn",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "totalProfitRefs",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "totalProfitForLiquids",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "cur_price",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "liquidfee",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "liquidRefs",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "liquidburn",
          "type": "uint256"
        }
      ],
      "name": "TotalEvent",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "changeReqs",
      "outputs": [
        {
          "internalType": "address",
          "name": "proposedNew",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "proposedClear",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "cur_price",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "decimal0",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "decimal1",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "fee",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "FEE_MOD",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "fee2Burn",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "fee2Liquid",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "fee2Refs",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "feeTotal",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "isDfkiiRefs",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "liquidBonusLog",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "liquidToken",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "managers",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "mancount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "miniLiquid",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "price_decimal",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "PRICE_MOD",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "priceFlips",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "refers",
      "outputs": [
        {
          "internalType": "contract Refers",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "requestCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "reserve0",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "reserve1",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "TOKEN_DECIMAL_DIF",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "token0",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "token1",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalLiquids",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalProfitBurn",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalProfitForLiquids",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalProfitRefs",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "unlocked",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ],


  // DFKii查询收益、领取收益
  balancerDFKABI: [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_dtrade",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_liquidToken",
          "type": "address"
        },
        {
          "internalType": "address[]",
          "name": "_mans",
          "type": "address[]"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "_lockId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_newCustodian",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_clearCustodian",
          "type": "address"
        }
      ],
      "name": "ChangeConfirmed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "_lockId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_msgSender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_new",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_clear",
          "type": "address"
        }
      ],
      "name": "ChangeRequested",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "_lockId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_sender",
          "type": "address"
        }
      ],
      "name": "ChangeSweep",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_lockId",
          "type": "bytes32"
        }
      ],
      "name": "confirmChange",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "_new",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_clear",
          "type": "address"
        }
      ],
      "name": "replaceManager",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "_new",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_clear",
          "type": "address"
        }
      ],
      "name": "requestChange",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "lockId",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "_dfkii",
          "type": "address"
        }
      ],
      "name": "setDFKII",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_lockId",
          "type": "bytes32"
        }
      ],
      "name": "sweepChange",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "sweepeth",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenaddr",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "sweeptoken",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "withdrawBonus",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "bonusTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "bonusWithdraw",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "calcBonus",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "changeReqs",
      "outputs": [
        {
          "internalType": "address",
          "name": "proposedNew",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "proposedClear",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "dfkii",
      "outputs": [
        {
          "internalType": "contract DFKII",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "dtrade",
      "outputs": [
        {
          "internalType": "contract DTrade",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "liquidToken",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "managers",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "mancount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "mintCoin",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "requestCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ],




  balancerRewardsAddress: '0xAFfcD3D45cEF58B1DfA773463824c6F6bB0Dc13a',
  balancerRewardsABI: [{
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "previousOwner",
      "type": "address"
    }, {
      "indexed": true,
      "internalType": "address",
      "name": "newOwner",
      "type": "address"
    }],
    "name": "OwnershipTransferred",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "internalType": "uint256",
      "name": "reward",
      "type": "uint256"
    }],
    "name": "RewardAdded",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "user",
      "type": "address"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "reward",
      "type": "uint256"
    }],
    "name": "RewardPaid",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "user",
      "type": "address"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }],
    "name": "Staked",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "user",
      "type": "address"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }],
    "name": "Withdrawn",
    "type": "event"
  }, {
    "constant": true,
    "inputs": [],
    "name": "DURATION",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "internalType": "address",
      "name": "account",
      "type": "address"
    }],
    "name": "balanceOf",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "bpt",
    "outputs": [{
      "internalType": "contract IERC20",
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "internalType": "address",
      "name": "account",
      "type": "address"
    }],
    "name": "earned",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [],
    "name": "exit",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [],
    "name": "getReward",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "isOwner",
    "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "lastTimeRewardApplicable",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "lastUpdateTime",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "uint256",
      "name": "reward",
      "type": "uint256"
    }],
    "name": "notifyRewardAmount",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "periodFinish",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "rewardPerToken",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "rewardPerTokenStored",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "rewardRate",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "name": "rewards",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "address",
      "name": "_rewardDistribution",
      "type": "address"
    }],
    "name": "setRewardDistribution",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }],
    "name": "stake",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "address",
      "name": "newOwner",
      "type": "address"
    }],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "name": "userRewardPerTokenPaid",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }],
    "name": "withdraw",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "yfi",
    "outputs": [{
      "internalType": "contract IERC20",
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }],

  yfiAddress: '0xa1d0E215a23d7030842FC67cE582a6aFa3CCaB83',
  yfiABI: [{
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "owner",
      "type": "address"
    }, {
      "indexed": true,
      "internalType": "address",
      "name": "spender",
      "type": "address"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "value",
      "type": "uint256"
    }],
    "name": "Approval",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "from",
      "type": "address"
    }, {
      "indexed": true,
      "internalType": "address",
      "name": "to",
      "type": "address"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "value",
      "type": "uint256"
    }],
    "name": "Transfer",
    "type": "event"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "address",
      "name": "_minter",
      "type": "address"
    }],
    "name": "addMinter",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "internalType": "address",
      "name": "owner",
      "type": "address"
    }, {
      "internalType": "address",
      "name": "spender",
      "type": "address"
    }],
    "name": "allowance",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "address",
      "name": "spender",
      "type": "address"
    }, {
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }],
    "name": "approve",
    "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "internalType": "address",
      "name": "account",
      "type": "address"
    }],
    "name": "balanceOf",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{
      "internalType": "uint8",
      "name": "",
      "type": "uint8"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "address",
      "name": "spender",
      "type": "address"
    }, {
      "internalType": "uint256",
      "name": "subtractedValue",
      "type": "uint256"
    }],
    "name": "decreaseAllowance",
    "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "governance",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "address",
      "name": "spender",
      "type": "address"
    }, {
      "internalType": "uint256",
      "name": "addedValue",
      "type": "uint256"
    }],
    "name": "increaseAllowance",
    "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "address",
      "name": "account",
      "type": "address"
    }, {
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }],
    "name": "mint",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "name": "minters",
    "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [{
      "internalType": "string",
      "name": "",
      "type": "string"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "address",
      "name": "_minter",
      "type": "address"
    }],
    "name": "removeMinter",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "address",
      "name": "_governance",
      "type": "address"
    }],
    "name": "setGovernance",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [{
      "internalType": "string",
      "name": "",
      "type": "string"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "address",
      "name": "recipient",
      "type": "address"
    }, {
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }],
    "name": "transfer",
    "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "address",
      "name": "sender",
      "type": "address"
    }, {
      "internalType": "address",
      "name": "recipient",
      "type": "address"
    }, {
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }],
    "name": "transferFrom",
    "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }],

  claimAddress: '0xcc9EFea3ac5Df6AD6A656235Ef955fBfEF65B862',
  claimABI: [{
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  }, {
    "constant": true,
    "inputs": [],
    "name": "adai",
    "outputs": [{
      "internalType": "contract IERC20",
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "uint256",
      "name": "_amount",
      "type": "uint256"
    }],
    "name": "claim",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "internalType": "address",
      "name": "_claimer",
      "type": "address"
    }],
    "name": "claimable",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "governance",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "address",
      "name": "_token",
      "type": "address"
    }, {
      "internalType": "uint256",
      "name": "_amount",
      "type": "uint256"
    }],
    "name": "seize",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "yfi",
    "outputs": [{
      "internalType": "contract IERC20",
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }],

  governanceAddress: '0x3A22dF48d84957F907e67F4313E3D43179040d6E',
  governanceABI: [{
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "previousOwner",
      "type": "address"
    }, {
      "indexed": true,
      "internalType": "address",
      "name": "newOwner",
      "type": "address"
    }],
    "name": "OwnershipTransferred",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "internalType": "uint256",
      "name": "reward",
      "type": "uint256"
    }],
    "name": "RewardAdded",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "user",
      "type": "address"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "reward",
      "type": "uint256"
    }],
    "name": "RewardPaid",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "user",
      "type": "address"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }],
    "name": "Staked",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "user",
      "type": "address"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }],
    "name": "Withdrawn",
    "type": "event"
  }, {
    "constant": true,
    "inputs": [],
    "name": "DURATION",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "internalType": "address",
      "name": "account",
      "type": "address"
    }],
    "name": "balanceOf",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "bpt",
    "outputs": [{
      "internalType": "contract IERC20",
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "breaker",
    "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [],
    "name": "claimFees",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "config",
    "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "internalType": "address",
      "name": "account",
      "type": "address"
    }],
    "name": "earned",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [],
    "name": "exit",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "feesPaidIn",
    "outputs": [{
      "internalType": "contract IERC20",
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [],
    "name": "getReward",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "governance",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [],
    "name": "initialize",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "isOwner",
    "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "lastTimeRewardApplicable",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "lastUpdateTime",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "lock",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "minimum",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "uint256",
      "name": "reward",
      "type": "uint256"
    }],
    "name": "notifyRewardAmount",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "period",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "periodFinish",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "proposalCount",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "name": "proposals",
    "outputs": [{
      "internalType": "uint256",
      "name": "id",
      "type": "uint256"
    }, {
      "internalType": "address",
      "name": "proposer",
      "type": "address"
    }, {
      "internalType": "uint256",
      "name": "totalForVotes",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "totalAgainstVotes",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "start",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "end",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [],
    "name": "propose",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "rewardPerToken",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "rewardPerTokenStored",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "rewardRate",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "name": "rewards",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "contract IERC20",
      "name": "_token",
      "type": "address"
    }, {
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }],
    "name": "seize",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "bool",
      "name": "_breaker",
      "type": "bool"
    }],
    "name": "setBreaker",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "address",
      "name": "_governance",
      "type": "address"
    }],
    "name": "setGovernance",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "uint256",
      "name": "_lock",
      "type": "uint256"
    }],
    "name": "setLock",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "uint256",
      "name": "_minimum",
      "type": "uint256"
    }],
    "name": "setMinimum",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "uint256",
      "name": "_period",
      "type": "uint256"
    }],
    "name": "setPeriod",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "contract IERC20",
      "name": "_feesPaidIn",
      "type": "address"
    }],
    "name": "setReward",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "address",
      "name": "_rewardDistribution",
      "type": "address"
    }],
    "name": "setRewardDistribution",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }],
    "name": "stake",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "address",
      "name": "newOwner",
      "type": "address"
    }],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [],
    "name": "updateFees",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "name": "userRewardPerTokenPaid",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "uint256",
      "name": "id",
      "type": "uint256"
    }],
    "name": "voteAgainst",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "uint256",
      "name": "id",
      "type": "uint256"
    }],
    "name": "voteFor",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "name": "voteLock",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }],
    "name": "withdraw",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "yBal",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "yIndex",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "name": "ySupplyIndex",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "yfi",
    "outputs": [{
      "internalType": "contract IERC20",
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }],
  governanceV2Address: '0xf1750B770485A5d0589A6ba1270D9FC354884D45',
  governanceV2ABI: [{ "constant": true, "inputs": [{ "name": "account", "type": "address" }], "name": "earned", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "proposals", "outputs": [{ "name": "id", "type": "uint256" }, { "name": "proposer", "type": "address" }, { "name": "totalForVotes", "type": "uint256" }, { "name": "totalAgainstVotes", "type": "uint256" }, { "name": "start", "type": "uint256" }, { "name": "end", "type": "uint256" }, { "name": "executor", "type": "address" }, { "name": "hash", "type": "string" }, { "name": "totalVotesAvailable", "type": "uint256" }, { "name": "quorum", "type": "uint256" }, { "name": "quorumRequired", "type": "uint256" }, { "name": "open", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "rewards", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalVotes", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_rewardDistribution", "type": "address" }], "name": "setRewardDistribution", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_period", "type": "uint256" }], "name": "setPeriod", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "breaker", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "quorum", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "register", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "DURATION", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_minimum", "type": "uint256" }], "name": "setMinimum", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "reward", "type": "uint256" }], "name": "notifyRewardAmount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "getReward", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "id", "type": "uint256" }], "name": "tallyVotes", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "voteLock", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "minimum", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "governance", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_breaker", "type": "bool" }], "name": "setBreaker", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "vote", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "renounceOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "id", "type": "uint256" }], "name": "voteAgainst", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "config", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "voter", "type": "address" }], "name": "votesOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "rewardRate", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "id", "type": "uint256" }], "name": "getStats", "outputs": [{ "name": "_for", "type": "uint256" }, { "name": "_against", "type": "uint256" }, { "name": "_quorum", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "lastTimeRewardApplicable", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "id", "type": "uint256" }], "name": "voteFor", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "userRewardPerTokenPaid", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "isOwner", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "voters", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "amount", "type": "uint256" }], "name": "stake", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_governance", "type": "address" }], "name": "setGovernance", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "revoke", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_quorum", "type": "uint256" }], "name": "setQuorum", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "lastUpdateTime", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "rewardPerToken", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_lock", "type": "uint256" }], "name": "setLock", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "executor", "type": "address" }, { "name": "hash", "type": "string" }], "name": "propose", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "votes", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "proposalCount", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "rewardPerTokenStored", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "exit", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_token", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "seize", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "periodFinish", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "period", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "lock", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "token", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "id", "type": "uint256" }], "name": "execute", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "id", "type": "uint256" }], "name": "initialize", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "id", "type": "uint256" }, { "indexed": false, "name": "creator", "type": "address" }, { "indexed": false, "name": "start", "type": "uint256" }, { "indexed": false, "name": "duration", "type": "uint256" }, { "indexed": false, "name": "executor", "type": "address" }], "name": "NewProposal", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "id", "type": "uint256" }, { "indexed": true, "name": "voter", "type": "address" }, { "indexed": false, "name": "vote", "type": "bool" }, { "indexed": false, "name": "weight", "type": "uint256" }], "name": "Vote", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "id", "type": "uint256" }, { "indexed": false, "name": "_for", "type": "uint256" }, { "indexed": false, "name": "_against", "type": "uint256" }, { "indexed": false, "name": "quorumReached", "type": "bool" }], "name": "ProposalFinished", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "voter", "type": "address" }, { "indexed": false, "name": "votes", "type": "uint256" }, { "indexed": false, "name": "totalVotes", "type": "uint256" }], "name": "RegisterVoter", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "voter", "type": "address" }, { "indexed": false, "name": "votes", "type": "uint256" }, { "indexed": false, "name": "totalVotes", "type": "uint256" }], "name": "RevokeVoter", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "reward", "type": "uint256" }], "name": "RewardAdded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "user", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" }], "name": "Staked", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "user", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" }], "name": "Withdrawn", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "user", "type": "address" }, { "indexed": false, "name": "reward", "type": "uint256" }], "name": "RewardPaid", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "previousOwner", "type": "address" }, { "indexed": true, "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }],

  bpoolAddress: '0x95c4b6c7cff608c0ca048df8b81a484aa377172b',
  bpoolABI: [{
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "src",
      "type": "address"
    }, {
      "indexed": true,
      "internalType": "address",
      "name": "dst",
      "type": "address"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "amt",
      "type": "uint256"
    }],
    "name": "Approval",
    "type": "event"
  }, {
    "anonymous": true,
    "inputs": [{
      "indexed": true,
      "internalType": "bytes4",
      "name": "sig",
      "type": "bytes4"
    }, {
      "indexed": true,
      "internalType": "address",
      "name": "caller",
      "type": "address"
    }, {
      "indexed": false,
      "internalType": "bytes",
      "name": "data",
      "type": "bytes"
    }],
    "name": "LOG_CALL",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "caller",
      "type": "address"
    }, {
      "indexed": true,
      "internalType": "address",
      "name": "tokenOut",
      "type": "address"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "tokenAmountOut",
      "type": "uint256"
    }],
    "name": "LOG_EXIT",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "caller",
      "type": "address"
    }, {
      "indexed": true,
      "internalType": "address",
      "name": "tokenIn",
      "type": "address"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "tokenAmountIn",
      "type": "uint256"
    }],
    "name": "LOG_JOIN",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "caller",
      "type": "address"
    }, {
      "indexed": true,
      "internalType": "address",
      "name": "tokenIn",
      "type": "address"
    }, {
      "indexed": true,
      "internalType": "address",
      "name": "tokenOut",
      "type": "address"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "tokenAmountIn",
      "type": "uint256"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "tokenAmountOut",
      "type": "uint256"
    }],
    "name": "LOG_SWAP",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "src",
      "type": "address"
    }, {
      "indexed": true,
      "internalType": "address",
      "name": "dst",
      "type": "address"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "amt",
      "type": "uint256"
    }],
    "name": "Transfer",
    "type": "event"
  }, {
    "constant": true,
    "inputs": [],
    "name": "BONE",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "BPOW_PRECISION",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "EXIT_FEE",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "INIT_POOL_SUPPLY",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "MAX_BOUND_TOKENS",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "MAX_BPOW_BASE",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "MAX_FEE",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "MAX_IN_RATIO",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "MAX_OUT_RATIO",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "MAX_TOTAL_WEIGHT",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "MAX_WEIGHT",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "MIN_BALANCE",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "MIN_BOUND_TOKENS",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "MIN_BPOW_BASE",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "MIN_FEE",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "MIN_WEIGHT",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "internalType": "address",
      "name": "src",
      "type": "address"
    }, {
      "internalType": "address",
      "name": "dst",
      "type": "address"
    }],
    "name": "allowance",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "address",
      "name": "dst",
      "type": "address"
    }, {
      "internalType": "uint256",
      "name": "amt",
      "type": "uint256"
    }],
    "name": "approve",
    "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "internalType": "address",
      "name": "whom",
      "type": "address"
    }],
    "name": "balanceOf",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "address",
      "name": "token",
      "type": "address"
    }, {
      "internalType": "uint256",
      "name": "balance",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "denorm",
      "type": "uint256"
    }],
    "name": "bind",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "internalType": "uint256",
      "name": "tokenBalanceIn",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "tokenWeightIn",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "tokenBalanceOut",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "tokenWeightOut",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "tokenAmountOut",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "swapFee",
      "type": "uint256"
    }],
    "name": "calcInGivenOut",
    "outputs": [{
      "internalType": "uint256",
      "name": "tokenAmountIn",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "internalType": "uint256",
      "name": "tokenBalanceIn",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "tokenWeightIn",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "tokenBalanceOut",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "tokenWeightOut",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "tokenAmountIn",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "swapFee",
      "type": "uint256"
    }],
    "name": "calcOutGivenIn",
    "outputs": [{
      "internalType": "uint256",
      "name": "tokenAmountOut",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "internalType": "uint256",
      "name": "tokenBalanceOut",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "tokenWeightOut",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "poolSupply",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "totalWeight",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "tokenAmountOut",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "swapFee",
      "type": "uint256"
    }],
    "name": "calcPoolInGivenSingleOut",
    "outputs": [{
      "internalType": "uint256",
      "name": "poolAmountIn",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "internalType": "uint256",
      "name": "tokenBalanceIn",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "tokenWeightIn",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "poolSupply",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "totalWeight",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "tokenAmountIn",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "swapFee",
      "type": "uint256"
    }],
    "name": "calcPoolOutGivenSingleIn",
    "outputs": [{
      "internalType": "uint256",
      "name": "poolAmountOut",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "internalType": "uint256",
      "name": "tokenBalanceIn",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "tokenWeightIn",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "poolSupply",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "totalWeight",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "poolAmountOut",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "swapFee",
      "type": "uint256"
    }],
    "name": "calcSingleInGivenPoolOut",
    "outputs": [{
      "internalType": "uint256",
      "name": "tokenAmountIn",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "internalType": "uint256",
      "name": "tokenBalanceOut",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "tokenWeightOut",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "poolSupply",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "totalWeight",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "poolAmountIn",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "swapFee",
      "type": "uint256"
    }],
    "name": "calcSingleOutGivenPoolIn",
    "outputs": [{
      "internalType": "uint256",
      "name": "tokenAmountOut",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "internalType": "uint256",
      "name": "tokenBalanceIn",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "tokenWeightIn",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "tokenBalanceOut",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "tokenWeightOut",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "swapFee",
      "type": "uint256"
    }],
    "name": "calcSpotPrice",
    "outputs": [{
      "internalType": "uint256",
      "name": "spotPrice",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{
      "internalType": "uint8",
      "name": "",
      "type": "uint8"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "address",
      "name": "dst",
      "type": "address"
    }, {
      "internalType": "uint256",
      "name": "amt",
      "type": "uint256"
    }],
    "name": "decreaseApproval",
    "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "uint256",
      "name": "poolAmountIn",
      "type": "uint256"
    }, {
      "internalType": "uint256[]",
      "name": "minAmountsOut",
      "type": "uint256[]"
    }],
    "name": "exitPool",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "address",
      "name": "tokenOut",
      "type": "address"
    }, {
      "internalType": "uint256",
      "name": "tokenAmountOut",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "maxPoolAmountIn",
      "type": "uint256"
    }],
    "name": "exitswapExternAmountOut",
    "outputs": [{
      "internalType": "uint256",
      "name": "poolAmountIn",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "address",
      "name": "tokenOut",
      "type": "address"
    }, {
      "internalType": "uint256",
      "name": "poolAmountIn",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "minAmountOut",
      "type": "uint256"
    }],
    "name": "exitswapPoolAmountIn",
    "outputs": [{
      "internalType": "uint256",
      "name": "tokenAmountOut",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [],
    "name": "finalize",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "internalType": "address",
      "name": "token",
      "type": "address"
    }],
    "name": "getBalance",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "getColor",
    "outputs": [{
      "internalType": "bytes32",
      "name": "",
      "type": "bytes32"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "getController",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "getCurrentTokens",
    "outputs": [{
      "internalType": "address[]",
      "name": "tokens",
      "type": "address[]"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "internalType": "address",
      "name": "token",
      "type": "address"
    }],
    "name": "getDenormalizedWeight",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "getFinalTokens",
    "outputs": [{
      "internalType": "address[]",
      "name": "tokens",
      "type": "address[]"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "internalType": "address",
      "name": "token",
      "type": "address"
    }],
    "name": "getNormalizedWeight",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "getNumTokens",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "internalType": "address",
      "name": "tokenIn",
      "type": "address"
    }, {
      "internalType": "address",
      "name": "tokenOut",
      "type": "address"
    }],
    "name": "getSpotPrice",
    "outputs": [{
      "internalType": "uint256",
      "name": "spotPrice",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "internalType": "address",
      "name": "tokenIn",
      "type": "address"
    }, {
      "internalType": "address",
      "name": "tokenOut",
      "type": "address"
    }],
    "name": "getSpotPriceSansFee",
    "outputs": [{
      "internalType": "uint256",
      "name": "spotPrice",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "getSwapFee",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "getTotalDenormalizedWeight",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "address",
      "name": "token",
      "type": "address"
    }],
    "name": "gulp",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "address",
      "name": "dst",
      "type": "address"
    }, {
      "internalType": "uint256",
      "name": "amt",
      "type": "uint256"
    }],
    "name": "increaseApproval",
    "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "internalType": "address",
      "name": "t",
      "type": "address"
    }],
    "name": "isBound",
    "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "isFinalized",
    "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "isPublicSwap",
    "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "uint256",
      "name": "poolAmountOut",
      "type": "uint256"
    }, {
      "internalType": "uint256[]",
      "name": "maxAmountsIn",
      "type": "uint256[]"
    }],
    "name": "joinPool",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "address",
      "name": "tokenIn",
      "type": "address"
    }, {
      "internalType": "uint256",
      "name": "tokenAmountIn",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "minPoolAmountOut",
      "type": "uint256"
    }],
    "name": "joinswapExternAmountIn",
    "outputs": [{
      "internalType": "uint256",
      "name": "poolAmountOut",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "address",
      "name": "tokenIn",
      "type": "address"
    }, {
      "internalType": "uint256",
      "name": "poolAmountOut",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "maxAmountIn",
      "type": "uint256"
    }],
    "name": "joinswapPoolAmountOut",
    "outputs": [{
      "internalType": "uint256",
      "name": "tokenAmountIn",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [{
      "internalType": "string",
      "name": "",
      "type": "string"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "address",
      "name": "token",
      "type": "address"
    }, {
      "internalType": "uint256",
      "name": "balance",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "denorm",
      "type": "uint256"
    }],
    "name": "rebind",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "address",
      "name": "manager",
      "type": "address"
    }],
    "name": "setController",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "bool",
      "name": "public_",
      "type": "bool"
    }],
    "name": "setPublicSwap",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "uint256",
      "name": "swapFee",
      "type": "uint256"
    }],
    "name": "setSwapFee",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "address",
      "name": "tokenIn",
      "type": "address"
    }, {
      "internalType": "uint256",
      "name": "tokenAmountIn",
      "type": "uint256"
    }, {
      "internalType": "address",
      "name": "tokenOut",
      "type": "address"
    }, {
      "internalType": "uint256",
      "name": "minAmountOut",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "maxPrice",
      "type": "uint256"
    }],
    "name": "swapExactAmountIn",
    "outputs": [{
      "internalType": "uint256",
      "name": "tokenAmountOut",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "spotPriceAfter",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "address",
      "name": "tokenIn",
      "type": "address"
    }, {
      "internalType": "uint256",
      "name": "maxAmountIn",
      "type": "uint256"
    }, {
      "internalType": "address",
      "name": "tokenOut",
      "type": "address"
    }, {
      "internalType": "uint256",
      "name": "tokenAmountOut",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "maxPrice",
      "type": "uint256"
    }],
    "name": "swapExactAmountOut",
    "outputs": [{
      "internalType": "uint256",
      "name": "tokenAmountIn",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "spotPriceAfter",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [{
      "internalType": "string",
      "name": "",
      "type": "string"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "address",
      "name": "dst",
      "type": "address"
    }, {
      "internalType": "uint256",
      "name": "amt",
      "type": "uint256"
    }],
    "name": "transfer",
    "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "address",
      "name": "src",
      "type": "address"
    }, {
      "internalType": "address",
      "name": "dst",
      "type": "address"
    }, {
      "internalType": "uint256",
      "name": "amt",
      "type": "uint256"
    }],
    "name": "transferFrom",
    "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "address",
      "name": "token",
      "type": "address"
    }],
    "name": "unbind",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }],

  feeRewardsAddress: '0xb01419E74D8a2abb1bbAD82925b19c36C191A701',
  feeRewardsABI: [{
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "previousOwner",
      "type": "address"
    }, {
      "indexed": true,
      "internalType": "address",
      "name": "newOwner",
      "type": "address"
    }],
    "name": "OwnershipTransferred",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "internalType": "uint256",
      "name": "reward",
      "type": "uint256"
    }],
    "name": "RewardAdded",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "user",
      "type": "address"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "reward",
      "type": "uint256"
    }],
    "name": "RewardPaid",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "user",
      "type": "address"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }],
    "name": "Staked",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "user",
      "type": "address"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }],
    "name": "Withdrawn",
    "type": "event"
  }, {
    "constant": true,
    "inputs": [],
    "name": "DURATION",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "internalType": "address",
      "name": "account",
      "type": "address"
    }],
    "name": "balanceOf",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "breaker",
    "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "config",
    "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "internalType": "address",
      "name": "account",
      "type": "address"
    }],
    "name": "earned",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [],
    "name": "exit",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [],
    "name": "getReward",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "governance",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [],
    "name": "initialize",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "isOwner",
    "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "lastTimeRewardApplicable",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "lastUpdateTime",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "minimum",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "uint256",
      "name": "reward",
      "type": "uint256"
    }],
    "name": "notifyRewardAmount",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "periodFinish",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "rewardPerToken",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "rewardPerTokenStored",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "rewardRate",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "name": "rewards",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "contract IERC20",
      "name": "_token",
      "type": "address"
    }, {
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }],
    "name": "seize",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "bool",
      "name": "_breaker",
      "type": "bool"
    }],
    "name": "setBreaker",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "address",
      "name": "_governance",
      "type": "address"
    }],
    "name": "setGovernance",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "uint256",
      "name": "_minimum",
      "type": "uint256"
    }],
    "name": "setMinimum",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "address",
      "name": "_rewardDistribution",
      "type": "address"
    }],
    "name": "setRewardDistribution",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }],
    "name": "stake",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "address",
      "name": "newOwner",
      "type": "address"
    }],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "name": "userRewardPerTokenPaid",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }],
    "name": "withdraw",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "yCRV",
    "outputs": [{
      "internalType": "contract IERC20",
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "yGov",
    "outputs": [{
      "internalType": "contract YearnGovernance",
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "yfi",
    "outputs": [{
      "internalType": "contract IERC20",
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }],

  erc20ABI: [{
    "constant": false,
    "inputs": [{
      "name": "_spender",
      "type": "address"
    }, {
      "name": "_value",
      "type": "uint256"
    }],
    "name": "approve",
    "outputs": [{
      "name": "success",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "_to",
      "type": "address"
    }, {
      "name": "_value",
      "type": "uint256"
    }],
    "name": "showMeTheMoney",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "_to",
      "type": "address"
    }, {
      "name": "_value",
      "type": "uint256"
    }],
    "name": "transfer",
    "outputs": [{
      "name": "success",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "_from",
      "type": "address"
    }, {
      "name": "_to",
      "type": "address"
    }, {
      "name": "_value",
      "type": "uint256"
    }],
    "name": "transferFrom",
    "outputs": [{
      "name": "success",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "name": "_from",
      "type": "address"
    }, {
      "indexed": true,
      "name": "_to",
      "type": "address"
    }, {
      "indexed": false,
      "name": "_value",
      "type": "uint256"
    }],
    "name": "Transfer",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "name": "_owner",
      "type": "address"
    }, {
      "indexed": true,
      "name": "_spender",
      "type": "address"
    }, {
      "indexed": false,
      "name": "_value",
      "type": "uint256"
    }],
    "name": "Approval",
    "type": "event"
  }, {
    "constant": true,
    "inputs": [{
      "name": "_owner",
      "type": "address"
    }, {
      "name": "_spender",
      "type": "address"
    }],
    "name": "allowance",
    "outputs": [{
      "name": "remaining",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "name": "_owner",
      "type": "address"
    }],
    "name": "balanceOf",
    "outputs": [{
      "name": "balance",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [{
      "name": "",
      "type": "string"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [{
      "name": "",
      "type": "string"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }],


  SymbolRouterList:[{
    "token0": "0x0298c2b32eaE4da002a15f36fdf7615BEa3DA047",
    "symbol0": "HUSD",
    "token1": "0xa71EdC38d189767582C38A3145b5873052c3e47a",
    "symbol1": "USDT",
    "pair": "0xA1c7db0ED51D367e948021F95784594509f5B272",
    "status": "1",
    "chain_id": "128"
  }, {
    "token0": "0x0298c2b32eaE4da002a15f36fdf7615BEa3DA047",
    "symbol0": "HUSD",
    "token1": "0x5545153CCFcA01fbd7Dd11C0b23ba694D9509A6F",
    "symbol1": "WHT",
    "pair": "0x0fc2C813FA36dCC6b26DDdD11fF2449572a9bC3B",
    "status": "1",
    "chain_id": "128"
  }, {
    "token0": "0xa71EdC38d189767582C38A3145b5873052c3e47a",
    "symbol0": "USDT",
    "token1": "0xcBD6Cb9243d8e3381Fea611EF023e17D1B7AeDF0",
    "symbol1": "BXH",
    "pair": "0x8611a52e8AC5E10651DF7C4b58F42536f0bd2e7E",
    "status": "1",
    "chain_id": "128"
  }, {
    "token0": "0x0298c2b32eaE4da002a15f36fdf7615BEa3DA047",
    "symbol0": "HUSD",
    "token1": "0xcBD6Cb9243d8e3381Fea611EF023e17D1B7AeDF0",
    "symbol1": "BXH",
    "pair": "0xE2a137d76AeD0dd0f89dEDd58c7C135EaAfD807F",
    "status": "1",
    "chain_id": "128"
  }, {
    "token0": "0x5545153CCFcA01fbd7Dd11C0b23ba694D9509A6F",
    "symbol0": "WHT",
    "token1": "0xa71EdC38d189767582C38A3145b5873052c3e47a",
    "symbol1": "USDT",
    "pair": "0xBE1a31b5A880629B94E9C7c966b2b66191364B9f",
    "status": "1",
    "chain_id": "128"
  }, {
    "token0": "0x0298c2b32eaE4da002a15f36fdf7615BEa3DA047",
    "symbol0": "HUSD",
    "token1": "0x64ff637fb478863b7468bc97d30a5bf3a428a1fd",
    "symbol1": "ETH",
    "pair": "0x233870d3303A9994e272F53A0747D668325c68bb",
    "status": "1",
    "chain_id": "128"
  }, {
    "token0": "0x0298c2b32eaE4da002a15f36fdf7615BEa3DA047",
    "symbol0": "HUSD",
    "token1": "0x66a79d23e58475d2738179ca52cd0b41d73f0bea",
    "symbol1": "HBTC",
    "pair": "0x3f62B3408F4847AEd0730557f3248A85f1484CbD",
    "status": "1",
    "chain_id": "128"
  }, {
    "token0": "0x0298c2b32eaE4da002a15f36fdf7615BEa3DA047",
    "symbol0": "HUSD",
    "token1": "0xef3cebd77e0c52cb6f60875d9306397b5caca375",
    "symbol1": "HBCH",
    "pair": "0x67675DC3bD811f8bc6F9476F45b1DE5F8f989749",
    "status": "1",
    "chain_id": "128"
  }, {
    "token0": "0x0298c2b32eaE4da002a15f36fdf7615BEa3DA047",
    "symbol0": "HUSD",
    "token1": "0xa2c49cee16a5e5bdefde931107dc1fae9f7773e3",
    "symbol1": "HDOT",
    "pair": "0xc1E4ce6290A6Fb99F2959c6fe1eFaE5E1f03a8A6",
    "status": "1",
    "chain_id": "128"
  }, {
    "token0": "0x0298c2b32eaE4da002a15f36fdf7615BEa3DA047",
    "symbol0": "HUSD",
    "token1": "0xecb56cf772b5c9a6907fb7d32387da2fcbfb63b4",
    "symbol1": "HLTC",
    "pair": "0xB12FF75641E50690F25A844460D49Da02732ad29",
    "status": "1",
    "chain_id": "128"
  }, {
    "token0": "0x0298c2b32eaE4da002a15f36fdf7615BEa3DA047",
    "symbol0": "HUSD",
    "token1": "0xae3a768f9ab104c69a7cd6041fe16ffa235d1810",
    "symbol1": "HFIL",
    "pair": "0x8ACfCd9912611f6753940Eae7460d04dD4574945",
    "status": "1",
    "chain_id": "128"
  }, {
    "token0": "0x202b4936fe1a82a4965220860ae46d7d3939bb25",
    "symbol0": "AAVE",
    "token1": "0xa71EdC38d189767582C38A3145b5873052c3e47a",
    "symbol1": "USDT",
    "pair": "0xc4Abe032D28EBA37560b0cfD0aa261D0D598aB19",
    "status": "1",
    "chain_id": "128"
  }, {
    "token0": "0x22c54ce8321a4015740ee1109d9cbc25815c46e6",
    "symbol0": "UNI",
    "token1": "0xa71EdC38d189767582C38A3145b5873052c3e47a",
    "symbol1": "USDT",
    "pair": "0x73379b971632CB56F874e8B0552A74368b69dad1",
    "status": "1",
    "chain_id": "128"
  }],
  MainCoin:[
    {"token":"0x0298c2b32eaE4da002a15f36fdf7615BEa3DA047","symbol":"HUSD"},
    {"token":"0xa71EdC38d189767582C38A3145b5873052c3e47a","symbol":"USDT"},
    {"token":"0x5545153CCFcA01fbd7Dd11C0b23ba694D9509A6F","symbol":"WHT"},
    {"token":"0xcBD6Cb9243d8e3381Fea611EF023e17D1B7AeDF0","symbol":"BXH"},
    {"token":"0x64ff637fb478863b7468bc97d30a5bf3a428a1fd","symbol":"ETH"},
    {"token":"0x66a79d23e58475d2738179ca52cd0b41d73f0bea","symbol":"HBTC"},
    {"token":"0xef3cebd77e0c52cb6f60875d9306397b5caca375","symbol":"HBCH"},
    {"token":"0xa2c49cee16a5e5bdefde931107dc1fae9f7773e3","symbol":"HDOT"},
    {"token":"0xecb56cf772b5c9a6907fb7d32387da2fcbfb63b4","symbol":"HLTC"},
    {"token":"0xae3a768f9ab104c69a7cd6041fe16ffa235d1810","symbol":"HFIL"},
    {"token":"0x202b4936fe1a82a4965220860ae46d7d3939bb25","symbol":"AAVE"},
    {"token":"0x22c54ce8321a4015740ee1109d9cbc25815c46e6","symbol":"UNI"},
  ],
  MyAddress:[{
    "id": "1",
    "address": "0x4fB6731251fD69C1d2f2719F0149cb91CDEAc62c"
  }, {
    "id": "2",
    "address": "0x874b3efA372c01cdb7760D0051A32bd4e6789E48"
  }, {
    "id": "3",
    "address": "0xeaAC16a233cf015d5EFFaCA8f323071d83d0D6ce"
  }, {
    "id": "4",
    "address": "0xb86789Bd113461666e1998e4f4DC2A61Ab732985"
  }, {
    "id": "5",
    "address": "0x385E8aA1CcbEef2C032ED159Ee7b9F05a9CD80a6"
  }, {
    "id": "6",
    "address": "0x27c19c736e126A2DD3B6Fedc4b4066F7b2C5C403"
  }, {
    "id": "7",
    "address": "0x7f32fd55F329Ef0DaB2b4038F707e0ffDcd70E02"
  }, {
    "id": "8",
    "address": "0x203197aeC934BDbCb4dc917e57CB871B82FC57d1"
  }, {
    "id": "9",
    "address": "0x935E3495Ea39fc6442b6bE05910d00457A257157"
  }, {
    "id": "10",
    "address": "0xDBD9DE68aaa45D5FB0234cDC3F62EBFf5cfe82B0"
  }, {
    "id": "11",
    "address": "0x0c08299e241eCF04D28bb5F53eD015D10f33Ad98"
  }, {
    "id": "12",
    "address": "0x6338fF70e3B6e90d99F9B5FbD70d8623894DD67c"
  }, {
    "id": "13",
    "address": "0xa3606294F95574729EB8759F75817B0d3Cd6d163"
  }, {
    "id": "14",
    "address": "0x08EEb1AB2B21F50fa18c74f956D5E5850eA544E6"
  }, {
    "id": "15",
    "address": "0x6110AD54e1c76019312ce850431D3e32523fe692"
  }, {
    "id": "16",
    "address": "0xaBFB50bC2F2fFB5d08606EB926929F1b4571cFb6"
  }, {
    "id": "17",
    "address": "0x401404253E4869F05DB2Ed7851D2e8c448F0D4d0"
  }, {
    "id": "18",
    "address": "0x935cEA245D4473710148c8B8c507e29D189639De"
  }, {
    "id": "19",
    "address": "0xFBC151b91fF042f1a4418C3FF223d4a57360E6aC"
  }, {
    "id": "20",
    "address": "0x98C9b8496c4F50A70eeD0b75dB38E3E6F0718Fa8"
  }, {
    "id": "21",
    "address": "0xd62294D7dDc2A28dADFa13e1D868D7E7a00fdaE6"
  }, {
    "id": "22",
    "address": "0x93499eF206387BC0A5EADbAfF1E7Ab4B8621925c"
  }, {
    "id": "23",
    "address": "0x3c6C30d700F7F4ef11887F0a69291E967685584a"
  }, {
    "id": "24",
    "address": "0x14C7eBc4CBce0BdCD59D4FEa838cc7B5289a9a55"
  }, {
    "id": "25",
    "address": "0x74e3E096d0E557834731a1F3bDBD9367CbAbd7e5"
  }, {
    "id": "26",
    "address": "0x24Ac02BcbDBDE3f3484cAbcc529c9Cd8c2DD741D"
  }, {
    "id": "27",
    "address": "0x21E6A966A38702c9dC589dDC52CFb26AF50d84c6"
  }, {
    "id": "28",
    "address": "0xFF83b7443c78855B52D428883438b75710ADD57E"
  }, {
    "id": "29",
    "address": "0x2897e15307486ad0f77ADD31b90Bd158538Ebc3A"
  }, {
    "id": "30",
    "address": "0x530C791b7bc61FFD4aC772721f7C608BDB5F1924"
  }, {
    "id": "31",
    "address": "0x430173f079Bbc9bF89304E91269C5F3D16b7CdA4"
  }, {
    "id": "32",
    "address": "0x9D708634Afc11dB5AEd9fEF5718E65Df3AF936cF"
  }, {
    "id": "33",
    "address": "0x986C60f59e5D16b1399AF9A2D5429953166F90B3"
  }, {
    "id": "34",
    "address": "0xC36B3DEE76Fb29E4879573801dD79cCF825c0772"
  }, {
    "id": "35",
    "address": "0xAf44b4703fe7Ee05139159AaA1CF30430035aa7c"
  }, {
    "id": "36",
    "address": "0x92F800Ac84C0D8D669a1e207D3420c8b003C718b"
  }, {
    "id": "37",
    "address": "0xf2AA6d10d89ab63061C6f96282D65BD4a94783b8"
  }, {
    "id": "38",
    "address": "0x4c2205076d02cDd0AD46D0Fcf0D4f2a9403195e6"
  }, {
    "id": "39",
    "address": "0x295AFeDBb9d2850d378AC2d5D1fC2DE0aaB724D5"
  }, {
    "id": "40",
    "address": "0x28161C7d78fdeE01cd4824357f146dD37FC34D3E"
  }, {
    "id": "41",
    "address": "0x2D12cc58DF3C8d620532B36ab89420BC21C0933C"
  }, {
    "id": "42",
    "address": "0xd4c12A168fcC6922349C70288aaCc57bE963477a"
  }, {
    "id": "43",
    "address": "0x51758643eD698498dB2D29b4Ac7E76EA742709dD"
  }, {
    "id": "44",
    "address": "0xbe68fBd6ccab22AF725Fe5E98b72E9F7D316f076"
  }, {
    "id": "45",
    "address": "0x3F9810318Ca9aF3400ED83D046CdEC014220aF5E"
  }, {
    "id": "46",
    "address": "0xf48939B2E211212f8771ac5b6B782c5a3d2FD64A"
  }, {
    "id": "47",
    "address": "0x69530756f43402D43dA0b8852C7DdfEd3FbCbb98"
  }, {
    "id": "48",
    "address": "0x8570581730EEDbc51f0f836e94579fcBEDB902a5"
  }, {
    "id": "49",
    "address": "0x21452d18876980ee428519099fF337743CC0BF7B"
  }, {
    "id": "50",
    "address": "0x6D9c594f4a2751734D66782821938DEA177a8E7f"
  }, {
    "id": "51",
    "address": "0x456eB327cD2066257A951B8C4FFa0C80390b9469"
  }, {
    "id": "52",
    "address": "0x0EeEe93b3369405C1D5b49b08099e1dB4c7dA728"
  }, {
    "id": "53",
    "address": "0x06b4B93D138612B4f197591F19E26C181beBEfE5"
  }, {
    "id": "54",
    "address": "0x9a710b2d828efFb4f7d719da9040460B1dF5ac89"
  }, {
    "id": "55",
    "address": "0x218Ce63571E7021f45002E0D81Ae76Ef7C1b54d5"
  }, {
    "id": "56",
    "address": "0xe6eDdB50054C202B82CC23f4C939a5e76cbcB6d3"
  }, {
    "id": "57",
    "address": "0x7875AA217ab1C958eDEEA921b8ACBe4c69aA5387"
  }, {
    "id": "58",
    "address": "0xc110E4AAF2b1794885E2089a9dA2C41DC72634c7"
  }, {
    "id": "59",
    "address": "0xE027eD61A8b8fb9050FEBA81463A0427C8cb1d5C"
  }, {
    "id": "60",
    "address": "0x79A9B9Dc76f51F0bc4231686b35aba5b292c3262"
  }, {
    "id": "61",
    "address": "0xFf51bc19Ce7f46721a0D93e083b9a3756529e7A4"
  }, {
    "id": "62",
    "address": "0xebeF62f28B802076353c732A9B5f348dcF42BFE9"
  }, {
    "id": "63",
    "address": "0x29c1562Fad4F00b701A7d5d61f706b60910C96c6"
  }, {
    "id": "64",
    "address": "0x6700578d2b664336357cc412054103F138Ca879a"
  }, {
    "id": "65",
    "address": "0xe7C63E84CBAca53dAd36d85631bA4248f37AC3b7"
  }, {
    "id": "66",
    "address": "0xff73C22F2B5D061BAb96415d85054BcB5Da29baf"
  }, {
    "id": "67",
    "address": "0x20ffeCF07ca71fFA66c954fB02D4dc2bBBf448d9"
  }, {
    "id": "68",
    "address": "0x4ED0Fb64b74c1baa1784Df5990B7B8Be28280574"
  }, {
    "id": "69",
    "address": "0x5d40D260DB27580E08A99a5E7F3ec2e0b1f14473"
  }, {
    "id": "70",
    "address": "0xE46d16cf8FE8164087DF98b3594757B0033Cab13"
  }, {
    "id": "71",
    "address": "0x6dE4429Ac31ce3D8F7E046B18Eb258e0D93f9b32"
  }, {
    "id": "72",
    "address": "0x21f022a388672b2F7E78334267bDa5A9D4590908"
  }, {
    "id": "73",
    "address": "0x90c55c25385804ba5fB2b407dDD1a016878C1E1b"
  }, {
    "id": "74",
    "address": "0xfD81151682936BF732a28F47324fbdd764efeC98"
  }, {
    "id": "75",
    "address": "0xeAb2be032A52426404920D73249f6e4a3f1ca31d"
  }, {
    "id": "76",
    "address": "0x85895F5D277d01E81DDA0b33e88b44dfb415eE23"
  }, {
    "id": "77",
    "address": "0x50BBe6d4D53Ea9639b6e7835b56e64538a059e6A"
  }, {
    "id": "78",
    "address": "0x2e25351FD5Cd8CdBA6179FD24029f4CA0571A834"
  }, {
    "id": "79",
    "address": "0x435a6EC1200E458c2D581B5db128546cFbba77Ae"
  }, {
    "id": "80",
    "address": "0x3f3Eb763Ffed493A16218c8Bf8a07B3Ac80685de"
  }, {
    "id": "81",
    "address": "0x837Cf6Ff9AF32c6a73875ab3f71eE307dd386d38"
  }, {
    "id": "82",
    "address": "0xb90Fa02A608964d7Ea81996c4CD25f83F963eAa8"
  }, {
    "id": "83",
    "address": "0x2F409E1e88DB20e8C5439Fa3fCE9DfaEfd6805D1"
  }, {
    "id": "84",
    "address": "0x9C9B39fB02C951C31Ea6c7B65286A191CB08e5fd"
  }, {
    "id": "85",
    "address": "0x3A9d5e8D39d8ED43220BC050A1d94DFeed41DC0a"
  }, {
    "id": "86",
    "address": "0xF5FA9CEc7dC3f15dAC563a668722B67aB86a20a6"
  }, {
    "id": "87",
    "address": "0x14aACbb42cA878627DA77bA586B1377B140BCc0F"
  }, {
    "id": "88",
    "address": "0x7E07cA7216A55b204911e27AE6885196fA022925"
  }, {
    "id": "89",
    "address": "0xde98F897c2AD7392847fe27EEEA3fE4c06e5385C"
  }, {
    "id": "90",
    "address": "0x202406cAB15D47fd9159985e2A85e6936Ec977Fb"
  }, {
    "id": "91",
    "address": "0x65efe66031807DE5B52c9C2CF0f14C87C9A12768"
  }, {
    "id": "92",
    "address": "0x4321FeB0d3E9813023cc51571cA8AF43a478B467"
  }, {
    "id": "93",
    "address": "0x03B5d7A819884BD4216AE670b4C0421E53B2C8Ba"
  }, {
    "id": "94",
    "address": "0x68f1a369F483e702D71191F1577Fa829e35D8169"
  }, {
    "id": "95",
    "address": "0x1f23307DDBb62F35Fc841bED7e8e54d827324c07"
  }, {
    "id": "96",
    "address": "0x92A9C8D591036616F12C7dbe1FAC1bc8c0Ac0a16"
  }, {
    "id": "97",
    "address": "0xB891d32e0b87f146836DeEC111c223AAdf87dD6A"
  }, {
    "id": "98",
    "address": "0x5a2C1eEDB3158D24B0afac1Ef861c1Da6B32Ff3D"
  }, {
    "id": "99",
    "address": "0x04fec4eCD224e2b9fB36188eed47906DbAc1149E"
  }, {
    "id": "100",
    "address": "0x592f2b8a32fe574614Bb175dc3e3688213e0212E"
  }, {
    "id": "101",
    "address": "0x61a0b72c1F0e79b8F172B53085641B194b1bE481"
  }, {
    "id": "102",
    "address": "0xd395b1b88e1Bc5Ab3B779E1cAFad72C91aD8eE10"
  }, {
    "id": "103",
    "address": "0x722a54A7A9355B4a6C320671cC0BDBaD0a83375F"
  }, {
    "id": "104",
    "address": "0x33C8da34e0D5e28F87aa92c4e25dD2E1E82cD6CC"
  }, {
    "id": "105",
    "address": "0x93E3fa78880736019327F4f55a02415059573531"
  }, {
    "id": "106",
    "address": "0xefd1cfC25504Ad3AD0eC27a0b9F96225a10e9A02"
  }, {
    "id": "107",
    "address": "0x8B203279B4933F3cf272700109BCfd90b592Dd3a"
  }, {
    "id": "108",
    "address": "0xf0b6A918124CFA9811f43EeFDe906F08112c08bf"
  }, {
    "id": "109",
    "address": "0xe78f43019b8b558265Cf66E13f58a2D5F9672eE5"
  }, {
    "id": "110",
    "address": "0xa9E7071c36986F93d8876dA01dF5e6c53E74a1B9"
  }, {
    "id": "111",
    "address": "0x07a519c6dD5703F32B6712d91C9b5870712b25Ad"
  }, {
    "id": "112",
    "address": "0x182fDF9f037fF75Fbaa3d3Ecd7810348FeE01576"
  }, {
    "id": "113",
    "address": "0xCB3bb5D55E513f0C00Ed4870a31df065F5c79538"
  }, {
    "id": "114",
    "address": "0x8bD08beD3D30AB1848421C2eC59e04369029262d"
  }, {
    "id": "115",
    "address": "0x674be2d802F0050B529BeD9c4f61922Ec08de3E0"
  }, {
    "id": "116",
    "address": "0x0272ee68C72F51a6D82f042a124539a16aF4c18a"
  }, {
    "id": "117",
    "address": "0x47839FCF9526d520CBa0a6D56029557402Ea419D"
  }, {
    "id": "118",
    "address": "0xAe7Cd7E39d67aF245E918A6205d7ECB16FCD61F0"
  }, {
    "id": "119",
    "address": "0x169c0Fb5cD0b83Ac7c6930AA88bF7a82089CfdF9"
  }, {
    "id": "120",
    "address": "0x602B1815FAc799D37A0f3eB7dbEfD62B2Daee624"
  }, {
    "id": "121",
    "address": "0xd3C2D7287D87C4a4e825c0dD58D3827618d6dE7B"
  }, {
    "id": "122",
    "address": "0x99113c54A2235B9B63d464934653b47c64BE9E18"
  }, {
    "id": "123",
    "address": "0xb5a0d8FCA8C1B308BdbF39736EE10c5AE2d99e79"
  }, {
    "id": "124",
    "address": "0x709D6f8C386f02E77DfdA274030C70Aa71BfCcBC"
  }, {
    "id": "125",
    "address": "0x47Bb614758628f44168EA889dfe362CcAEaE9AAB"
  }, {
    "id": "126",
    "address": "0x2C652b12DB045De5658690B3A1cC9B0461461B93"
  }, {
    "id": "127",
    "address": "0x8c5F9b7Ed3ca637115e06382e4A6914219A3A445"
  }, {
    "id": "128",
    "address": "0x050dd6cA46604F489e5E0CB517B2E5E37bd75767"
  }, {
    "id": "129",
    "address": "0x91b7046C731032C737bbAEFBeb21cA746563017A"
  }, {
    "id": "130",
    "address": "0xE3B3Fc4A092cE05eDE3B640d919A594D6eA0D47D"
  }, {
    "id": "131",
    "address": "0x6dB76cF966a22072eBf35f72640e73807AdA1C6f"
  }, {
    "id": "132",
    "address": "0xfB7bED1F58510DF9111A0a1602229b9Bc4291AC3"
  }, {
    "id": "133",
    "address": "0xf6D062A8999B07cE2bF440513602eb41EC48A076"
  }, {
    "id": "134",
    "address": "0x77BFc9408Cf0F660B2461eD68ebbE0873d51e0Bf"
  }, {
    "id": "135",
    "address": "0xa3aaC8B505532faDec41E00Cb55220BAC38230C2"
  }, {
    "id": "136",
    "address": "0x6974D3773E50395D68c2F65151354EBfFed7DFb9"
  }, {
    "id": "137",
    "address": "0x3f410fDA9bBc964d7bD133307676725aB079F1D3"
  }, {
    "id": "138",
    "address": "0xeC093eE3C3c717e1124A0c26DF268E10E7b8305c"
  }, {
    "id": "139",
    "address": "0x562FAAD1F151205d7f7Cd30F8C2f2e61fCC888fA"
  }, {
    "id": "140",
    "address": "0xD41372d9192F0c451b99C7560117A7049B6Fc7E2"
  }, {
    "id": "141",
    "address": "0x395a4207e6EDaaf7d08E28a1910424Fb42f4ab5f"
  }, {
    "id": "142",
    "address": "0x61B7872DE90C0956C7570c10573be6524B3884D2"
  }, {
    "id": "143",
    "address": "0xbD03223d23F7d7B371368C2d0D2848cA0E14f328"
  }, {
    "id": "144",
    "address": "0xaEf6D39B8A22a80A3f47CA58D682FF31Fab0478d"
  }, {
    "id": "145",
    "address": "0x923640E8034e86984f34e2e33181816E1008d76c"
  }, {
    "id": "146",
    "address": "0x5eD79A4c5e574f5a74C6717EE3d3AdEaAf13648c"
  }, {
    "id": "147",
    "address": "0xD15ab9fBdeCDF6D22132c53C18205338Db58e589"
  }, {
    "id": "148",
    "address": "0xe9794B933615dF31403fc2Ce0eB80725131D22fe"
  }, {
    "id": "149",
    "address": "0x71cc439d0d96bAdBe230096e220A6f01fDa7fb03"
  }, {
    "id": "150",
    "address": "0xd341670cfF60111C7935aAb4c66d5f7291023bEc"
  }, {
    "id": "151",
    "address": "0xe5a08648ac73184A3e5b6cDFF95D45bC96a97868"
  }, {
    "id": "152",
    "address": "0xf2C0F81C25F615C3CE84467d5710126F30338028"
  }, {
    "id": "153",
    "address": "0x3aA8C1fbacd169131f8BB56A148E280FB196D72f"
  }, {
    "id": "154",
    "address": "0x22798eA13815f4D173d1EAfcD042831B04Ef1e08"
  }, {
    "id": "155",
    "address": "0x734e3fae546C4fb93930423ADF4e86879Cf96093"
  }, {
    "id": "156",
    "address": "0x384ddDAB2c846956697f603B07e114208615A223"
  }, {
    "id": "157",
    "address": "0x0ba1ab0eABeE815f64EC8dE87076F9d6092f1526"
  }, {
    "id": "158",
    "address": "0x806F50D66ee50EFf6d916449a62D9D7ca57cc8C6"
  }, {
    "id": "159",
    "address": "0x4A92Dccd8Dbe5fae8AfEDB815554D44E578FAB05"
  }, {
    "id": "160",
    "address": "0xF1eb8F49343F405f39DC3B28DfdD35d5C7d48181"
  }, {
    "id": "161",
    "address": "0x79cD2365420EF0D43FE5B9BA6FFA5A9ED2B2Bb11"
  }, {
    "id": "162",
    "address": "0xC5B52feaEC751F0adAb005Cab18DdF11bC02c8b9"
  }, {
    "id": "163",
    "address": "0x599c85E7B67866eC82729B1A4CfBEa5312C3139a"
  }, {
    "id": "164",
    "address": "0xc11A86c8288f0fA1bBfB71C56E78e24C0926779e"
  }, {
    "id": "165",
    "address": "0x0a41b07033c4F2A666079c886C041cD8eCb70831"
  }, {
    "id": "166",
    "address": "0x28904cAABe8B6F7593a9993b26d91f4b0538aBD1"
  }, {
    "id": "167",
    "address": "0x60B394Ea82AD4B9b87b28DBc3534f81840d3C536"
  }, {
    "id": "168",
    "address": "0xe22A0eA59119F632cDaB2f2050A6537d36E40185"
  }, {
    "id": "169",
    "address": "0x720bdf4D672B5d2e52153B0CE8b6010B381e7bbA"
  }, {
    "id": "170",
    "address": "0xb257a62098f680fD76FDd7720500BaD7a6513875"
  }, {
    "id": "171",
    "address": "0x2fe5282104188806350b1F9c90982D91Fdb8F2D1"
  }, {
    "id": "172",
    "address": "0x3549535cE45cdC5723Ff9Fd0B6C7E6A3F6ceb193"
  }, {
    "id": "173",
    "address": "0x6d45cacb3c23de01FaaD949C75BCb3E20fAb83d2"
  }, {
    "id": "174",
    "address": "0x114Fb6253a0baB33B2104AC9BA1F1EFF95E7b799"
  }, {
    "id": "175",
    "address": "0x2189e03101A7d2Bd26135954b78cD56915b0eF9B"
  }, {
    "id": "176",
    "address": "0x0Aa745a45988172A936943BC1E309117bb24A79D"
  }, {
    "id": "177",
    "address": "0x74DeA3b0c2B5493b75652297F6579F3966960023"
  }, {
    "id": "178",
    "address": "0xA322300B13E5beFe54b818C0F3Ab693E59fEeacd"
  }, {
    "id": "179",
    "address": "0x314c558a066350224d29FF6E8a951b0e093DA731"
  }, {
    "id": "180",
    "address": "0xB8310b0769d1515a6D4F4FB5E950F5Bf64aFB882"
  }, {
    "id": "181",
    "address": "0x3feb50479e6D89C9cA71fAcbb406BF5a04aABfa3"
  }, {
    "id": "182",
    "address": "0x78d2544593cd59BDD300E45127c2c5B5C1E14167"
  }, {
    "id": "183",
    "address": "0xbD2809eC637175A29151D2A6014aA6d7f1022786"
  }, {
    "id": "184",
    "address": "0xA3313132f3e13CFEAbD3CeaF60430BA34C445ce7"
  }, {
    "id": "185",
    "address": "0x6FAf16a180Beae0F848835D93972ECEb28D7c957"
  }, {
    "id": "186",
    "address": "0x609eE04b2Cc8768A40d22c5771B7bC69caF951eE"
  }, {
    "id": "187",
    "address": "0x2a0e887c51968b048C2Bb4e275aE97c34a994D46"
  }, {
    "id": "188",
    "address": "0xeECC8A6fD4D64d607fAC744466C3e01cC68a32f9"
  }, {
    "id": "189",
    "address": "0xB0975d66e022F391F9d1E91F5A5ca7Ffa713134f"
  }, {
    "id": "190",
    "address": "0x21826932bBaf2D88Cf3aE9114DfFEE1D246f9944"
  }, {
    "id": "191",
    "address": "0x4F357D1b2303663CAc62aD3Bf6Eb19fF74bA58C7"
  }, {
    "id": "192",
    "address": "0x9B2B9E381E0B142Fec7694fDb2bF36c62afEAD4D"
  }, {
    "id": "193",
    "address": "0x6fBDb161325aBfc283487240E27D1F8811183228"
  }, {
    "id": "194",
    "address": "0x5027567440F08129EAb3154b22411237f7Aadf69"
  }, {
    "id": "195",
    "address": "0x90BfB04bd217141C4C3688a7c1f83058f4A14A1f"
  }, {
    "id": "196",
    "address": "0xb726C55Ca6285Cb1D1FB124D1b9C824A3E75ce43"
  }, {
    "id": "197",
    "address": "0x4631fEdc7fe4E11CCD63EC3867DaD42B96bcfa83"
  }, {
    "id": "198",
    "address": "0xEf2cC4A820D8DdC7872d2ECDFF9eab41D5c72217"
  }, {
    "id": "199",
    "address": "0x25D85f01b912C2be30D096927a11Fb6ED3cEEcab"
  }, {
    "id": "200",
    "address": "0x35b837f2BAe3c195b647333CcD9CE2e906256cb0"
  }, {
    "id": "201",
    "address": "0x268B85D8e0342590D30A129d2cF9bEce30B20747"
  }, {
    "id": "202",
    "address": "0x58854b88c1c23EaB142c9cb2876eA433dEc4EBDb"
  }, {
    "id": "203",
    "address": "0x362f1D7D06E0EC10d9cF97a13a8D7aCa3d2C3aB0"
  }, {
    "id": "204",
    "address": "0xC6cD7ab197425a664e486eE159C954C35aFA125b"
  }, {
    "id": "205",
    "address": "0xDd9208aEa2825e298c1B9aeFE88123BD1fECE5D9"
  }, {
    "id": "206",
    "address": "0xAc6E10E6d54ED3e024e6003C50288D84480895e9"
  }, {
    "id": "207",
    "address": "0xCe85cc9c94Fa6B3c273b0fF4B6Dc8A4BE05e995b"
  }, {
    "id": "208",
    "address": "0xF34aD806c615d68845FBE3F52082f3C02c5139d9"
  }, {
    "id": "209",
    "address": "0x920ac37aA4109f9780cD4B506e1c6e638AA36815"
  }, {
    "id": "210",
    "address": "0x7ca83475551d72CE5fc5404CcF009Ed4428EaB9c"
  }, {
    "id": "211",
    "address": "0x55b0daB725da1f71CB107C1B473bAaEEAb6fbBaD"
  }, {
    "id": "212",
    "address": "0x862B6Ae6bAD71288D7cb49dc5B3ae9a65d599C29"
  }, {
    "id": "213",
    "address": "0xC588098BA538F48318c568282926480d5d4F0aE9"
  }, {
    "id": "214",
    "address": "0xa22D219FA489902bE14AFA0ea93409ee0F659DcE"
  }, {
    "id": "215",
    "address": "0xfe2006B1b6A64E6E28593432B573641ED9e7b1bC"
  }, {
    "id": "216",
    "address": "0x42A872394952d5d65Df97bEc0377C7c84400c82d"
  }, {
    "id": "217",
    "address": "0xa5a25D8A2Ba9924E1d6b1e5858769e83C07287fa"
  }, {
    "id": "218",
    "address": "0xe13c26191758003D5214426df84FDF2f2bc338D4"
  }, {
    "id": "219",
    "address": "0x11272419C2b28Ef30E166384D86288a8451C4285"
  }, {
    "id": "220",
    "address": "0xAD27880b903F003FC687454bEd42465b30325dCb"
  }, {
    "id": "221",
    "address": "0x7515D0200e28AA94C1a9E080F0520Edda9fd6F0D"
  }, {
    "id": "222",
    "address": "0xBF60451b41340eC590c5BEc7B37bbc7D0078371A"
  }, {
    "id": "223",
    "address": "0x1CA985ff75d14cfb81B02aa09cf11b1054BB728C"
  }, {
    "id": "224",
    "address": "0xB97E065e4B032B3645E5b9D00e14c915C2CAf196"
  }, {
    "id": "225",
    "address": "0xF52E2F18C828f493A449BF08F2b7d5A02E2b38BA"
  }, {
    "id": "226",
    "address": "0xc3234d7c15776C1F8D9868B547d5be5A72CC9c6d"
  }, {
    "id": "227",
    "address": "0x8612ba0C23F9d10204A7d6d4866bB95f0216FE00"
  }, {
    "id": "228",
    "address": "0x3D91890da9fcBD114D5EbF3359dd3a40E9AC80f3"
  }, {
    "id": "229",
    "address": "0xBF32030aa632E3cae83CdAc3bb503eeF5C14A783"
  }, {
    "id": "230",
    "address": "0xFA5265CDc667c2E7ea333f503624c050aC875A73"
  }, {
    "id": "231",
    "address": "0x410BC0Fa9E5b9e5f5c98ce48bcd67Dfe977C2dB4"
  }, {
    "id": "232",
    "address": "0x3C37Fda18c67f82cF5E44F594dc9e45E042b75a3"
  }, {
    "id": "233",
    "address": "0xd327e57913421d42d4296bDb600eDDEE16fE5B7C"
  }, {
    "id": "234",
    "address": "0xA2fa7b2D4FaC3CB350b4b2449ee328451039303A"
  }, {
    "id": "235",
    "address": "0x5EE79c0688a67A81C0E210f320afD5D094101a50"
  }, {
    "id": "236",
    "address": "0xfF76914224FB20fa168644A3d952b1d9b629c634"
  }, {
    "id": "237",
    "address": "0x359d13f6B8A304d5fFFe7292fec30Fc37Fc84A34"
  }, {
    "id": "238",
    "address": "0xA621012339850f0269FC6DAd509f82E18b2712c0"
  }, {
    "id": "239",
    "address": "0x0a12A89fa58EC6c4fFb7770636BEFBE4a5A5fc80"
  }, {
    "id": "240",
    "address": "0x76679a48E21D8a481f20189A4c48e1BBe54bD10C"
  }, {
    "id": "241",
    "address": "0xF4fac5e748BA4Cd4C914A363989b2De6e16C3d1b"
  }, {
    "id": "242",
    "address": "0x96aD73244B4c313eBcf69B11548FaDEC4A1239c9"
  }, {
    "id": "243",
    "address": "0xf79C09Eb2D9e27250878F82A686C47cccE149684"
  }, {
    "id": "244",
    "address": "0x4c05B9ea7677E2dEc4aE910317EaA9164D372587"
  }, {
    "id": "245",
    "address": "0xa11c56e62b26189c9D3597e6615512A81778608D"
  }, {
    "id": "246",
    "address": "0x89be3dB74dF88EfD89AB78bB45606EC24458aa7e"
  }, {
    "id": "247",
    "address": "0xDeB02Ff63b7913344f53C94390a4f15B3333185a"
  }, {
    "id": "248",
    "address": "0x0D15371C6cab218d18516D544653195e2974cF94"
  }, {
    "id": "249",
    "address": "0x19855bd2deAEF307f617C469bA018C47524B5025"
  }, {
    "id": "250",
    "address": "0x5B9C64374895850809072AC729382663e6Abe509"
  }, {
    "id": "251",
    "address": "0x37D66Ed250f691F036E67dB133Db61F5c1EB6e67"
  }, {
    "id": "252",
    "address": "0x2718c998A910e366111C4Cf996056526BA054312"
  }, {
    "id": "253",
    "address": "0xa484aCa2977F10571d0EC7029d8cc51722c7C89e"
  }, {
    "id": "254",
    "address": "0x6715815b177862852a27Ad039836F878C6c2aD84"
  }, {
    "id": "255",
    "address": "0xC6f2536Ff38e595eEf0aaDc11Fcf74a2fcce803A"
  }, {
    "id": "256",
    "address": "0xD487F69637f0a7Eb117fE96232DA74EBd79d93E3"
  }, {
    "id": "257",
    "address": "0x999359B1bBF693d1eF671e3f84986297debB0871"
  }, {
    "id": "258",
    "address": "0xDDE64b816fba44b07D870Ea69F83e337a997C3b0"
  }, {
    "id": "259",
    "address": "0x1B1a17018bf4521498cD21029bd4Abc76b777eA7"
  }, {
    "id": "260",
    "address": "0x2e8D34fF13fc48F927713ABefA76F9A093D8C667"
  }, {
    "id": "261",
    "address": "0xDb4B5F122336FA16BF3b7B8910120116bb5e06Bf"
  }, {
    "id": "262",
    "address": "0x22538FB837127f2c00E354fDe55BAe8d92effCB6"
  }, {
    "id": "263",
    "address": "0x8e33A8Df5CA547498F5a56F81531Fd6a155b4cB1"
  }, {
    "id": "264",
    "address": "0x50Fb6c29a57cDAef5099255Ae52E1a4696FfB50f"
  }, {
    "id": "265",
    "address": "0x391896b53069DB4Ef074425aB99A7AEC00a9157E"
  }, {
    "id": "266",
    "address": "0xaBF944C49e85D3DBBD6380Ab9D97E78e8fC67c8a"
  }, {
    "id": "267",
    "address": "0x12cC4e474149Bf2A498b50eE15fC5647F4B9b9de"
  }, {
    "id": "268",
    "address": "0xc7b6b14cA6077D17Fa1F663dBB11df0165Dc46A7"
  }, {
    "id": "269",
    "address": "0x12482741Dc686C7B7307aa85958dF19d0c3B3e64"
  }, {
    "id": "270",
    "address": "0x47A201cdf7B68dFd072660bF999C27eE8Dfcf6a7"
  }, {
    "id": "271",
    "address": "0x643B6B87E759b3d104b80BFFB8a806Dcf6854A20"
  }, {
    "id": "272",
    "address": "0x3e5CcAF4Bf39aF2E8babd26188325326A60Ec6F6"
  }, {
    "id": "273",
    "address": "0x6663717c683Ff33A983c331cef6e93Cb86664822"
  }, {
    "id": "274",
    "address": "0x1BA9eF3876936050254a4333f7F0a05CD0798a92"
  }, {
    "id": "275",
    "address": "0xE90c3f88670edbB6acA13be862e7663Dd42021da"
  }, {
    "id": "276",
    "address": "0x0EA569E22561a01F096775F4b9396d1F1C32D300"
  }, {
    "id": "277",
    "address": "0x6F09Eec749Ed787165E55000374d6B25fb665D01"
  }, {
    "id": "278",
    "address": "0x4eb399d8DBdd800c1394e005154953048c470B48"
  }, {
    "id": "279",
    "address": "0x197a70B062142fE3d4222D84f8Ebcb14e8104C38"
  }, {
    "id": "280",
    "address": "0xF28fa1B11498bB82517e7319cFDff494b5b7789F"
  }, {
    "id": "281",
    "address": "0x7e16e6071fE62457cb3ec30ccbb8298864359e23"
  }, {
    "id": "282",
    "address": "0x11e410Ff214836Bf6ad3766dc62A2f06174745b9"
  }, {
    "id": "283",
    "address": "0xa4e43864D624290c4A73d96931C196394F892Bef"
  }, {
    "id": "284",
    "address": "0x7b13D6E195D9fac06BA37F52F86473ad369fBD8d"
  }, {
    "id": "285",
    "address": "0xCa8e010D9c18b0993b9f5b20E50928a3bF10537A"
  }, {
    "id": "286",
    "address": "0x9705588e7BFb23acD15a4D6E63187e1AC3943061"
  }, {
    "id": "287",
    "address": "0x740cFfd75EBa08A68fF1DA3049fC3c637CC677b1"
  }, {
    "id": "288",
    "address": "0x4E9dEb0d2097763BA36e360770E56cE791B8Fab6"
  }, {
    "id": "289",
    "address": "0x52BF863a31634Cc874169B6284bB79a99714dAc1"
  }, {
    "id": "290",
    "address": "0x48D3De6E88F5E0616c24352ccE6999D49472F2D4"
  }, {
    "id": "291",
    "address": "0x02b42905845fF4D68DAc55f4985c4Ba17332088c"
  }, {
    "id": "292",
    "address": "0x57e4e32F52E5B19BD445Ea4ee2c4ede91B7d2C6b"
  }, {
    "id": "293",
    "address": "0x64b86973eCd83Bf7DDCdE6dCfc82FD9Da3C2733a"
  }, {
    "id": "294",
    "address": "0xc97533E1b86eD8dd0CD7a158E6a29249a84bA5BA"
  }, {
    "id": "295",
    "address": "0x1E88D1887F737e72BE167D228211f29eb75024FE"
  }, {
    "id": "296",
    "address": "0x5fe51C28AA9C6aabD961C1BA09B3ebF67285B5eE"
  }, {
    "id": "297",
    "address": "0x2D3995B1535D51c49060b6D39280569A6CD5feC4"
  }, {
    "id": "298",
    "address": "0x659C5bC39c581C921dFD50EF4e1AA71f4541bC81"
  }, {
    "id": "299",
    "address": "0x6b9Fc19248917886b575A788a781951bCA142666"
  }, {
    "id": "300",
    "address": "0xBF8e2a5D7f109dC3F281e23Fd9745Be2bf16623d"
  }, {
    "id": "301",
    "address": "0x6a47738d36AEEbADC7FF19a0488a9b1fcf369e82"
  }, {
    "id": "302",
    "address": "0x586EF9dA869Be12a4Cc3F04B101d0374cd0605B1"
  }, {
    "id": "303",
    "address": "0x7f4A60d8A16Ce1D51163bDe587a575bc50A0c109"
  }, {
    "id": "304",
    "address": "0xcE118a356C2485BE353435bC01319226855065e8"
  }, {
    "id": "305",
    "address": "0x457835a5143Be14dc3C635CA55eBab102FB32b1A"
  }, {
    "id": "306",
    "address": "0xCae98D7d678E3d674d94D344DA9862Faae021705"
  }, {
    "id": "307",
    "address": "0x6226dca544F51CD097D125dFfE038133137ACB7b"
  }, {
    "id": "308",
    "address": "0xe74A97983E7f292d93071Ec7C1D9869FDE552D65"
  }, {
    "id": "309",
    "address": "0x29da03136664b9Cdc935C3dDA529a3fb252b192C"
  }, {
    "id": "310",
    "address": "0x91A72B95c2ae1095c3A1327919431c720A471ae4"
  }, {
    "id": "311",
    "address": "0xdBE22c168365dB7596071f0D1Fb3EFBBEf9740c6"
  }, {
    "id": "312",
    "address": "0x0616DED959b6c5BEA43b5cBDEA4A09CC688Cf336"
  }, {
    "id": "313",
    "address": "0x0E1f1f9549aD663B29E2821C78EBC53b961EaABC"
  }, {
    "id": "314",
    "address": "0xC1dA520e2F8f3E3B07d1cdf39809B92a00D8B389"
  }, {
    "id": "315",
    "address": "0x5ADD4020aA1736b0927Fa765F873F967D0DFACA3"
  }, {
    "id": "316",
    "address": "0x51050aEe22B82D4DB8e892f4f3e3d028f5A9dEA9"
  }, {
    "id": "317",
    "address": "0x1EF09dfA4a3D2973a532c58eaf7A0E79937C5157"
  }, {
    "id": "318",
    "address": "0x44Fb7cB4258dC9b4A1276f7020d871d2b1058923"
  }, {
    "id": "319",
    "address": "0x3436E5Cdc61A7C55834636eb0E1Cee8fbaD2F9D8"
  }, {
    "id": "320",
    "address": "0x7123690C33C27b4E242e2a90Fa7f67079Ebb74Cb"
  }, {
    "id": "321",
    "address": "0x8DDB0aDca82Ae24020aDD54da2ABd2dB5D388949"
  }, {
    "id": "322",
    "address": "0x9f9c787744069543FFCB0876724Dd07157806D28"
  }, {
    "id": "323",
    "address": "0x1feB8ce97ae0e3eA446e7DFB2e8066317347543D"
  }, {
    "id": "324",
    "address": "0x407470EE65f9b57C425a043279Ec24A9770c0f79"
  }, {
    "id": "325",
    "address": "0x524b677e09775B6DCa2fcd5d48960Fb6e50FEac6"
  }, {
    "id": "326",
    "address": "0x1eaA8A5c889263d94a3DA8E74Fc702B10d0B9EF6"
  }, {
    "id": "327",
    "address": "0x26B71F66ce00BA31b70134fDfc3F46488adF4b1E"
  }, {
    "id": "328",
    "address": "0x33C210CF743545713c7E27bC8a0eb7c10451DA19"
  }, {
    "id": "329",
    "address": "0x120156988CaFaAe23aab876F90a85fe7A8154290"
  }, {
    "id": "330",
    "address": "0xF42FFa4659032152F367879985124080E4Ee3CA0"
  }, {
    "id": "331",
    "address": "0x40c3764BCe65C44a30804Cb87a4fc582B987eBd9"
  }, {
    "id": "332",
    "address": "0x15A326741FFC18A91fDE1842d064dd8937C90b41"
  }, {
    "id": "333",
    "address": "0xF28e1ca36D0DC7623f57B6B95c51ed452F0781F3"
  }, {
    "id": "334",
    "address": "0xA0593e7f1De8f1226b6c98Ccd7DE9bf5145e5222"
  }, {
    "id": "335",
    "address": "0x87b6901f087642A2e09521907210eb64dB0Ca4e4"
  }, {
    "id": "336",
    "address": "0x04f643DAC47282C1Cf1304A62ba9eE4f4a42B562"
  }, {
    "id": "337",
    "address": "0xF7F7CF4C16a4d1F1171C07AA7E7513b6319eb180"
  }, {
    "id": "338",
    "address": "0x5e4015203422Cec16C55BE57606479870bf12597"
  }, {
    "id": "339",
    "address": "0xB95570d7494511bC479b38eb5A8A89C453cDAF71"
  }, {
    "id": "340",
    "address": "0xB99277C5E8E1c859dA4Ec980Ea4Aa89B420C7438"
  }, {
    "id": "341",
    "address": "0xc7228411930A0B133d31A7e9092935BCf4235577"
  }, {
    "id": "342",
    "address": "0x6488Be321492E3EF35307c890A135da67058d19A"
  }, {
    "id": "343",
    "address": "0x6d41f959efA82c63D6E69fa8aEDcB9F228CaE30d"
  }, {
    "id": "344",
    "address": "0x57e87aF5312328A64E48eBc79587aED9f56be978"
  }, {
    "id": "345",
    "address": "0xBAFb61dCbDf036B0f776453CdD9EECC1838B3d92"
  }, {
    "id": "346",
    "address": "0x105CA11CaDb44905c21340D03efC92658bFcd909"
  }, {
    "id": "347",
    "address": "0x6c3aCFA49e3FD44DB7C3eAcB2e13D9765890C88C"
  }, {
    "id": "348",
    "address": "0x426eF3Bed2bd81a7Cae9886a854FcE8C2B835172"
  }, {
    "id": "349",
    "address": "0x7e4c50572b6e3f2FF481d1939Db22759d9BeD6c6"
  }, {
    "id": "350",
    "address": "0x1E017aED31b126a324DdE37632DD26438CB8F6B8"
  }, {
    "id": "351",
    "address": "0x19ff27a83F2bCA700A58F3CE57a064171d3DA991"
  }, {
    "id": "352",
    "address": "0x5799AC02c6642B2d7492F121cC6B605b73404421"
  }, {
    "id": "353",
    "address": "0x344D2CcDc7208Ae80415678b893494DC3bc7e254"
  }, {
    "id": "354",
    "address": "0x262E430b9b33671d3523be9D6e37Ec36e40DB0c2"
  }, {
    "id": "355",
    "address": "0x8B2C699f5Fdfa32C71473E9C87a966C14054438E"
  }, {
    "id": "356",
    "address": "0x2d67C6e39884df6A517c60a4b292c8b17bB1dCbF"
  }, {
    "id": "357",
    "address": "0xf2bbe1CD1524Df2b6ac992fFa0d9dA2AD04C085F"
  }, {
    "id": "358",
    "address": "0xd4606553Db0EC78063C23fD2E4eF3E1DED2c3B83"
  }, {
    "id": "359",
    "address": "0xf362089cD75Aa8DDCFF02cF17cf232Db68052581"
  }, {
    "id": "360",
    "address": "0x34ca82b215f4A197d2d8946e3244a13e8C13478e"
  }, {
    "id": "361",
    "address": "0x0DAb2207Bf00DEB041bEb13CBE38a49D1e01e63D"
  }, {
    "id": "362",
    "address": "0x3cEF2f6d57A8b7C2C4f2D48974faFF2942458ACC"
  }, {
    "id": "363",
    "address": "0xdC45c6be7b4F00E0a219a5A4922E9eE4cE07aB38"
  }, {
    "id": "364",
    "address": "0x576414f2875A92C6bd1A9E7C199870c823d0f17e"
  }, {
    "id": "365",
    "address": "0xfee78F8538DBFd13536E8e513ad796142cC92699"
  }, {
    "id": "366",
    "address": "0xb7db7c58356bc465e75e18C61F4F7bC00e0eC7A7"
  }, {
    "id": "367",
    "address": "0xd6C0717267Ca594DFe3Ed867f26eF326a7233817"
  }, {
    "id": "368",
    "address": "0xC82012f34f4e82872351CB06A778573aBEabe956"
  }, {
    "id": "369",
    "address": "0x64bC5f702879e63744533ebFECed0812c7e848E1"
  }, {
    "id": "370",
    "address": "0x891E3b23a3D9506d3AA30d57D99126D1Dd3A66ed"
  }, {
    "id": "371",
    "address": "0x816554ceDb554Bb046ecBef80aAC6Fbb7c4F2708"
  }, {
    "id": "372",
    "address": "0x7221bf3F4188a39A45b29bd95cEE1eb2a9E4f601"
  }, {
    "id": "373",
    "address": "0xE16B0AFE07E0A950c3E018ec7309c0dd1deB14c3"
  }, {
    "id": "374",
    "address": "0x6b8F7BE368587B522B2C9102570e4cBC004B2AAb"
  }, {
    "id": "375",
    "address": "0x630b36e715FDCAd749739bd23Fbd5Ea5Be69Ae43"
  }, {
    "id": "376",
    "address": "0xeC017E1Df9ddAEd996B4EEfe1AdcFd6a11f77c33"
  }, {
    "id": "377",
    "address": "0xa493996498F44860212555f66F97e8DDC8016725"
  }, {
    "id": "378",
    "address": "0x55349ff8f55097b1bF1f4E5E777fA83E60e0adC5"
  }, {
    "id": "379",
    "address": "0x5EcbfE389F75736b9bD6b32ed04A56186822c5e2"
  }, {
    "id": "380",
    "address": "0x0aD27dD226a779bD0e4a50B83f0967aeD6fBbc6e"
  }, {
    "id": "381",
    "address": "0x218890479a84c1df14d58dA06ae3b631720a3A45"
  }, {
    "id": "382",
    "address": "0x7f5C941f6e19c1b989a661663B7B9C05EE818B7b"
  }, {
    "id": "383",
    "address": "0x701FA1358E46bE67cE74525585beE5dFEc599297"
  }, {
    "id": "384",
    "address": "0x030684Ec53f2c8b909086DF790CA78A3B054b31A"
  }, {
    "id": "385",
    "address": "0xCEF5c95f42c42aaaf452DBCCEDB606674502a870"
  }, {
    "id": "386",
    "address": "0x55A194De66af6B02981395d1a49431e7C9438A36"
  }, {
    "id": "387",
    "address": "0xCE662fC0F034cafC450ad8E2658A29c5805F7B92"
  }, {
    "id": "388",
    "address": "0x0E99caf43a456C9A7cBDfd5191a2833f71901015"
  }, {
    "id": "389",
    "address": "0xB05BBc0c76F7F7EaaFdd2aB7C50b920760503538"
  }, {
    "id": "390",
    "address": "0xF5ABD95d0835D235eae8d69c7a717eFdaaBfdD54"
  }, {
    "id": "391",
    "address": "0xF39BBBFC2E5ad63A16ff74DA46F3D0940c7Dc050"
  }, {
    "id": "392",
    "address": "0x780b26E45e37Dd1B9f0E110479bB6b92Ec91Cb00"
  }, {
    "id": "393",
    "address": "0x4604AEbC72b7172d22B056201ebd10efc3253b46"
  }, {
    "id": "394",
    "address": "0xCc012f81ED1D9acEC6747793F6FC2A9aE5d89998"
  }, {
    "id": "395",
    "address": "0x1e8b57cA658D3ed54B0c052187a88D0a25129e90"
  }, {
    "id": "396",
    "address": "0x47C1720B4fA4A03320643530d6D5ca5261fC40A4"
  }, {
    "id": "397",
    "address": "0xe957948c789EF6f0669fB3E623A5BbcDE1E95125"
  }, {
    "id": "398",
    "address": "0x5fD9642763591dfa56F38999298DF8b810A01a6C"
  }, {
    "id": "399",
    "address": "0x8b4255D666609cDB356c03b7770716378786ee43"
  }, {
    "id": "400",
    "address": "0xCc68d86F443cdDAB192aBeea063e14d21e933cf9"
  }, {
    "id": "401",
    "address": "0xA7B57e93A1498806cf03aa72B7DC18Ca6Dca0D3b"
  }, {
    "id": "402",
    "address": "0xCd1D44Ce8DB176492924104d285897dCda422E66"
  }, {
    "id": "403",
    "address": "0xbc4ffd4918064d7bBFF2f1b8DA0ce8Ed4686adDa"
  }, {
    "id": "404",
    "address": "0x64E72ED7DAf85a539b07E2be6Fd1bd9E734dcA47"
  }, {
    "id": "405",
    "address": "0x448924A08f3170915debc3B715Ffb6190483656D"
  }, {
    "id": "406",
    "address": "0x7a3Aa7bF93DdB0AC9324018F17c423398EA6Cb99"
  }, {
    "id": "407",
    "address": "0x08ecF0E443901996DeB389703b4b97037e9b772a"
  }, {
    "id": "408",
    "address": "0x5e8c7f5ed53ae32C6813274Aaa8A218B94433583"
  }, {
    "id": "409",
    "address": "0x92Aa2F38e3072f5397bC659f003Cd1e7E3898aFC"
  }, {
    "id": "410",
    "address": "0xe2312f9E66e8B5ca8a880FE4aea8225417d6eD54"
  }, {
    "id": "411",
    "address": "0xB2896139D2BC8b68aef57cD8d060A9fA6810c47A"
  }, {
    "id": "412",
    "address": "0x91E022314150F422D5Be6A77f61b52b1166cACc1"
  }, {
    "id": "413",
    "address": "0x9ec9dAa3Bc425072188DaAbf819f44EcAEc39692"
  }, {
    "id": "414",
    "address": "0x95b6b671574fBB70EbAA6dce567307655dCe5F9f"
  }, {
    "id": "415",
    "address": "0x600B1EB1DA60688827bae90CAb588cD7997dC704"
  }, {
    "id": "416",
    "address": "0x82c1CcAAC498D5EC69f9C777334a1a88c35Af94F"
  }, {
    "id": "417",
    "address": "0x243206b4A090D6eF77FA139f7985263E2abd6F6D"
  }, {
    "id": "418",
    "address": "0xf61D52e726EC26586F5Fd2b28f4066fdAAd124e9"
  }, {
    "id": "419",
    "address": "0xb7b47849D0dC3812fd0209cc5124c6A4103b00F4"
  }, {
    "id": "420",
    "address": "0xf028adc20CA3cE8B64b880A8ccBDd040a7b80F40"
  }, {
    "id": "421",
    "address": "0x18e0550Fe5a76203ff2F17836B23a36cd99DBDAc"
  }, {
    "id": "422",
    "address": "0x1Eb147acc8Bf1911a99705a007e37B092C373293"
  }, {
    "id": "423",
    "address": "0xdB0f340aA8e2D921202e1e623b3B9534A05E1eE3"
  }, {
    "id": "424",
    "address": "0xc58B3491bB14D41d32a084483158346cE34B3330"
  }, {
    "id": "425",
    "address": "0x03F30915643B279F213F14a20d3458FD5BAEDCA1"
  }, {
    "id": "426",
    "address": "0xBDE4Bf60A56770099645FBe904A33759E10b6502"
  }, {
    "id": "427",
    "address": "0x90AA072d23881DaC8E4E7D47645543D0E1a67F18"
  }, {
    "id": "428",
    "address": "0xfe5D3481F94DDfA3E4c464b6Cd50EC1dcd64bc40"
  }, {
    "id": "429",
    "address": "0x20e5628A9e2991C275269593fFe9A9CeB094908d"
  }, {
    "id": "430",
    "address": "0xF73e59A0E04cbC4B6B24EC550e797fA06002A03f"
  }, {
    "id": "431",
    "address": "0xAd5e1027FeC59e807c21AE5C784057Ab2a311729"
  }, {
    "id": "432",
    "address": "0x5B9C56f8c84Ddb330047BF402f8c1F936afD02FE"
  }, {
    "id": "433",
    "address": "0x178f6a89f7019d696F86867521643Ef8FfDf7277"
  }, {
    "id": "434",
    "address": "0xB4Bfa1ea5EcDd42d44f87CF730F9bC44D572eC46"
  }, {
    "id": "435",
    "address": "0xB5AB5d5F85646dBcE245b08811707842e72dAF1B"
  }, {
    "id": "436",
    "address": "0x69D7bea97767D6944E56c8B7cE60C0F31a2bd7dB"
  }, {
    "id": "437",
    "address": "0x7EC0B86ab0Fff7F7cA6ea3DFB6B70ABd658c1BAB"
  }, {
    "id": "438",
    "address": "0x52A85aa3657716390aA6f0FdB957611fEB2433E1"
  }, {
    "id": "439",
    "address": "0xb86B8FD48cf5D2d7ac3Fc1C3442d418d283a94EB"
  }, {
    "id": "440",
    "address": "0x29f9fc935Af069e175c1d9550448Aaebc84698eA"
  }, {
    "id": "441",
    "address": "0xEB49085b4A62078e9C52f4363A2Dc899a0947B81"
  }, {
    "id": "442",
    "address": "0x04B5D2a6FC68b91d485D71f25cF8Ba2D653075B8"
  }, {
    "id": "443",
    "address": "0xA513d2dc739CDDc8D1A2EfdCe79330C642EB24D4"
  }, {
    "id": "444",
    "address": "0x8088Cef1fA286c35B0Bb591c37dD7dEFd90Da59C"
  }, {
    "id": "445",
    "address": "0xAe0Acf7136b3A6CC0a1c3d4B6b8790E16697faa8"
  }, {
    "id": "446",
    "address": "0x8541424208CB8496c95ED4C91d21F8A56ba5181B"
  }, {
    "id": "447",
    "address": "0x9D37b32660b57CEe7023D8cD6b3A68510960a499"
  }, {
    "id": "448",
    "address": "0xC30326FD8e0f349e047890da93236222338f01c3"
  }, {
    "id": "449",
    "address": "0x6D673AfCF645b4A8a5717cBa7AeE97B705c78E7B"
  }, {
    "id": "450",
    "address": "0x3456A4C348B5e78940378462552c83930C719E11"
  }, {
    "id": "451",
    "address": "0xf0B36f4f53A17800C78FBd253c1559aA569D813f"
  }, {
    "id": "452",
    "address": "0x86D5F38907e9d47004A81bf2F766d42Fb00d2F42"
  }, {
    "id": "453",
    "address": "0x68f870be663f70f3F0cd0C7a663De1ABd7251B62"
  }, {
    "id": "454",
    "address": "0xC48c35ec783bB843B6BdFB8ce5ac77D2304ed38f"
  }, {
    "id": "455",
    "address": "0xDcdEfD58bA65B76976493C8ed94706ACc1994212"
  }, {
    "id": "456",
    "address": "0x8556208b530462B10Df5F267f2c9528f6f50d9B2"
  }, {
    "id": "457",
    "address": "0x33de509B1deCa30AA30638e94B970CeE32a83d5e"
  }, {
    "id": "458",
    "address": "0xbA15f1F7161f3050540bCB4FD867D5373841550A"
  }, {
    "id": "459",
    "address": "0xF5656686a20F09E99D0e98d422477d001aF3af4d"
  }, {
    "id": "460",
    "address": "0x40D376A43671F84b8A5b8e209Ed609aaebdc3529"
  }, {
    "id": "461",
    "address": "0x172cAb6C5Fe81C17e4E1f3b6006941A002C1De40"
  }, {
    "id": "462",
    "address": "0x17954e93600DE7C8135b3cdF4E047D021FFC7e65"
  }, {
    "id": "463",
    "address": "0x53aD335Bb2f83ccB0322b121bFE703ebB240e362"
  }, {
    "id": "464",
    "address": "0xc9461aD2b86a3EB7dE184808C634067473765CFD"
  }, {
    "id": "465",
    "address": "0xB640e4F1858fa11D8AA7163D27F8809B64EfE603"
  }, {
    "id": "466",
    "address": "0xd94C2F70aCaa835eB09b8152BD17b94808D43A2E"
  }, {
    "id": "467",
    "address": "0x9a207f5ecbeC7959C845e52B5f0Ee77f195D4Be5"
  }, {
    "id": "468",
    "address": "0xaacb199d67FFE66aD60f0A90957d84a50D3D6612"
  }, {
    "id": "469",
    "address": "0xf6529E75584F7E8CE9DA5008C90eBdB5E4AB379B"
  }, {
    "id": "470",
    "address": "0xa6ba537A64c302608093C1db7D6bd4DDE618A299"
  }, {
    "id": "471",
    "address": "0x35562022e2E7df76b93420E555057543CCd77E4d"
  }, {
    "id": "472",
    "address": "0xBAc988Aa6e8D2afF78CB5422283f8C82EbC272ac"
  }, {
    "id": "473",
    "address": "0x7b8c05c91cEd31bba57836b8D548Db1AFc034722"
  }, {
    "id": "474",
    "address": "0xC891080a63d2549F123f70130bbf2Cdf0b1f7D2f"
  }, {
    "id": "475",
    "address": "0xe1dc762f84fcDc8477E8A2eB42C923B5e4250FBB"
  }, {
    "id": "476",
    "address": "0x22ff1195707026B22e2a74551613B1097Cf7202A"
  }, {
    "id": "477",
    "address": "0x0100496Cc0958E764b5366ccb5C138b0291d2966"
  }, {
    "id": "478",
    "address": "0x5123cF27B4Fe8dBd0479Dc1aaA7811C183ce760A"
  }, {
    "id": "479",
    "address": "0x5efCa174224b8597a55346053C083AA14D139671"
  }, {
    "id": "480",
    "address": "0x342615B4EA5480bC3F52Eb06E9dd05632B369b42"
  }, {
    "id": "481",
    "address": "0x6c716471e8369f98612D444cA8555b868340B24c"
  }, {
    "id": "482",
    "address": "0xC238d85c0d460bdB9660fa07727Ffb6A770B88DE"
  }, {
    "id": "483",
    "address": "0x7dAdEf026b5696f7a269ED7d966950DA83b6A824"
  }, {
    "id": "484",
    "address": "0x8fAe1CFA2118Ee6611fb5e5403d44D204f7D178f"
  }, {
    "id": "485",
    "address": "0x6800c6Ab6C0F9b19fC183345982e81EDCef5eaf6"
  }, {
    "id": "486",
    "address": "0x505B267a0727820d8f2641b2f6bbaB63c35575d5"
  }, {
    "id": "487",
    "address": "0x5D52E5d5DB8496fC72bf82b4Ae60AdD674c1E8Cd"
  }, {
    "id": "488",
    "address": "0x9Db7A7CC61c4a3C4612DccddBe9141F205e26F0F"
  }, {
    "id": "489",
    "address": "0x79Ac032A11E3CF6674A19c83F2B27dfE94e6b693"
  }, {
    "id": "490",
    "address": "0xCf16019042A1DB019D5573D28B8f51CC3f2cb0F6"
  }, {
    "id": "491",
    "address": "0x2BE214922508e5bFd0901912d537247660884816"
  }, {
    "id": "492",
    "address": "0x3a5020aa2b2c53F6b812f8Dc3E07d773E320776B"
  }, {
    "id": "493",
    "address": "0x44233cc04c5D66E0e4429c2b82C80B6ce505166F"
  }, {
    "id": "494",
    "address": "0x4406C2C10D00cA35144f071eEa857569c23aA1e1"
  }, {
    "id": "495",
    "address": "0x4ba7258b91C74955dF6f4FcA3eb1b74F78ded0F4"
  }, {
    "id": "496",
    "address": "0xF3aD2CAe6B444910DF8e45A64b4fd067B3964e27"
  }, {
    "id": "497",
    "address": "0x405E49B4558958A6b415fEBc3AFE16eAA4f53991"
  }, {
    "id": "498",
    "address": "0x733a6e1753D29bFe610a4E8710dd72cacd815BF0"
  }, {
    "id": "499",
    "address": "0x2B39223BB7227FBd727B77f909fba34bc34EFc50"
  }, {
    "id": "500",
    "address": "0xd311174AcA5C18415E458639DDbD3119F88ac845"
  }, {
    "id": "501",
    "address": "0x887cac46340F4a645359C415970cbf2a5D72b511"
  }, {
    "id": "502",
    "address": "0x76e79CA97313305a2fb4FDc4C844136cEaa275bD"
  }, {
    "id": "503",
    "address": "0x830b244F2D3dDe4a446206A9c8853e8540547dC3"
  }, {
    "id": "504",
    "address": "0xe76FE658815bD7517a0729e4Af1240aE79e32c66"
  }, {
    "id": "505",
    "address": "0x2F641E88CD3dB6346e9cA68510C3AeB3315d6D34"
  }, {
    "id": "506",
    "address": "0x0E6f5487479C7783317D8C8e24eCf74b8004D94E"
  }, {
    "id": "507",
    "address": "0x83e8f17db3F66015B05ac383a3144f5E89583c5E"
  }, {
    "id": "508",
    "address": "0x843Ed7dBB1Bad92C42DD66eAA283bAd43Ef6C417"
  }, {
    "id": "509",
    "address": "0xE7e59824D6DB236FA21394EC6E6Fb590a0458FB6"
  }, {
    "id": "510",
    "address": "0xa793481Fa62Cc6D3273fcC47A72862E74a94117f"
  }, {
    "id": "511",
    "address": "0x9fac74C7833dBBda1DE6C47BbB1D0e85502aDB70"
  }, {
    "id": "512",
    "address": "0x4D11aA1Da5361a59CfaE855029C9A0D00dE04E39"
  }, {
    "id": "513",
    "address": "0x9E28E451425330e829f6A68Ed422cF62d9Fb9c70"
  }, {
    "id": "514",
    "address": "0x887F37788380D4AC8c41cB67991F8fFc3b5b4D75"
  }, {
    "id": "515",
    "address": "0x2A98377DD58ddC7BD9308a3549ED914740B9dc00"
  }, {
    "id": "516",
    "address": "0x6C34443daf6cb2736Ad854Be1BF97f959e136191"
  }, {
    "id": "517",
    "address": "0xe21aBfD6A97c741E856152Da637DbbF10c68365c"
  }, {
    "id": "518",
    "address": "0xb5D2EDCDB68DC8289DB6Fe57618FC177F41311c2"
  }]

};

export default config;