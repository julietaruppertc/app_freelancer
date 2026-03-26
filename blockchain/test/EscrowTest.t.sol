// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/Escrow.sol";

contract EscrowTest is Test {

    Escrow escrow;

    address client = address(1);
    address freelancer = address(2);
    address arbiter = address(3);

    function setUp() public {
        escrow = new Escrow();
    }

    function testCreateEscrow() public {
        vm.deal(client, 10 ether);

        vm.prank(client);
        uint256 id = escrow.createEscrow{value: 1 ether}(
            freelancer,
            arbiter,
            block.timestamp + 1 days,
            keccak256("agreement")
        );

        assertEq(id, 1);

        (
            address c,
            address f,
            ,
            uint256 amount,
            ,
            ,
            ,
            
        ) = escrow.escrows(id);

        assertEq(c, client);
        assertEq(f, freelancer);
        assertEq(amount, 1 ether);
    }

    function testFullFlowApprove() public {
        vm.deal(client, 10 ether);

        vm.prank(client);
        uint256 id = escrow.createEscrow{value: 1 ether}(
            freelancer,
            arbiter,
            block.timestamp + 1 days,
            keccak256("agreement")
        );

        vm.prank(freelancer);
        escrow.submitWork(id, keccak256("work"));

        uint256 before = freelancer.balance;

        vm.prank(client);
        escrow.approve(id);

        assertEq(freelancer.balance, before + 1 ether);
    }

    function testDisputeResolve() public {
        vm.deal(client, 10 ether);

        vm.prank(client);
        uint256 id = escrow.createEscrow{value: 1 ether}(
            freelancer,
            arbiter,
            block.timestamp + 1 days,
            keccak256("agreement")
        );

        vm.prank(freelancer);
        escrow.submitWork(id, keccak256("work"));

        vm.prank(client);
        escrow.reject(id);

        uint256 before = client.balance;

        vm.prank(arbiter);
        escrow.resolve(id, false); // refund

        assertEq(client.balance, before + 1 ether);
    }
}