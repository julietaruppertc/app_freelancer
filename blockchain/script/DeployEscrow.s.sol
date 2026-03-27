//blockchain/script/DeployEscrow.s.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/Escrow.sol";

contract DeployEscrow is Script {
    function run() external {
        vm.startBroadcast();

        Escrow escrow = new Escrow();

        vm.stopBroadcast();
    }
}