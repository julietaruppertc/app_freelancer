//blockchain/src/Escrow.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Escrow {

    // =========================
    // ENUM
    // =========================
    enum Status {
        Created,
        Funded,
        Submitted,
        Approved,
        Disputed,
        Resolved
    }

    // =========================
    // STRUCT
    // =========================
    struct EscrowData {
        address client;
        address freelancer;
        address arbiter;
        uint256 amount;
        uint256 deadline;
        bytes32 agreementHash;
        bytes32 workHash;
        Status status;
    }

    // =========================
    // STORAGE
    // =========================
    uint256 public escrowCount;

    mapping(uint256 => EscrowData) public escrows;

    // =========================
    // EVENTS
    // =========================
    event EscrowCreated(uint256 id, address client, address freelancer);
    event Deposited(uint256 id, uint256 amount);
    event WorkSubmitted(uint256 id, bytes32 workHash);
    event Approved(uint256 id);
    event Disputed(uint256 id);
    event Resolved(uint256 id, bool freelancerPaid);

    // =========================
    // CREATE ESCROW
    // =========================
    function createEscrow(
        address freelancer,
        address arbiter,
        uint256 deadline,
        bytes32 agreementHash
    ) external payable returns (uint256) {
        require(msg.value > 0, "Must deposit funds");

        escrowCount++;

        escrows[escrowCount] = EscrowData({
            client: msg.sender,
            freelancer: freelancer,
            arbiter: arbiter,
            amount: msg.value,
            deadline: deadline,
            agreementHash: agreementHash,
            workHash: bytes32(0),
            status: Status.Funded
        });

        emit EscrowCreated(escrowCount, msg.sender, freelancer);
        emit Deposited(escrowCount, msg.value);

        return escrowCount;
    }

    // =========================
    // SUBMIT WORK
    // =========================
    function submitWork(uint256 id, bytes32 workHash) external {
        EscrowData storage e = escrows[id];

        require(msg.sender == e.freelancer, "Not freelancer");
        require(e.status == Status.Funded, "Invalid state");

        e.workHash = workHash;
        e.status = Status.Submitted;

        emit WorkSubmitted(id, workHash);
    }

    // =========================
    // APPROVE
    // =========================
    function approve(uint256 id) external {
        EscrowData storage e = escrows[id];

        require(msg.sender == e.client, "Not client");
        require(e.status == Status.Submitted, "Invalid state");

        e.status = Status.Approved;

        (bool success, ) = e.freelancer.call{value: e.amount}("");
        require(success, "Transfer failed");

        emit Approved(id);
    }

    // =========================
    // REJECT → DISPUTE
    // =========================
    function reject(uint256 id) external {
        EscrowData storage e = escrows[id];

        require(msg.sender == e.client, "Not client");
        require(e.status == Status.Submitted, "Invalid state");

        e.status = Status.Disputed;

        emit Disputed(id);
    }

    // =========================
    // RESOLVE
    // =========================
    function resolve(uint256 id, bool releaseToFreelancer) external {
        EscrowData storage e = escrows[id];

        require(msg.sender == e.arbiter, "Not arbiter");
        require(e.status == Status.Disputed, "Invalid state");

        e.status = Status.Resolved;

        address to = releaseToFreelancer ? e.freelancer : e.client;

        (bool success, ) = to.call{value: e.amount}("");
        require(success, "Transfer failed");

        emit Resolved(id, releaseToFreelancer);
    }

    // =========================
    // VIEW
    // =========================
    function getEscrow(uint256 id) external view returns (EscrowData memory) {
        return escrows[id];
    }
}