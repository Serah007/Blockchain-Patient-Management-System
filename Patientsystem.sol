// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PatientSystem {
    enum Role { None, Patient, Doctor }

    struct Record {
        uint256 id;
        address doctor;
        string recordType;   // "Diagnosis" or "Prescription"
        string data;
        bytes32 dataHash;
        uint256 timestamp;
    }

    address public admin;
    mapping(address => Role) public roles;
    mapping(address => string) public names;
    mapping(address => mapping(address => bool)) public access; // patient => doctor => allowed
    mapping(address => Record[]) private records;

    event UserRegistered(address indexed user, Role role, string name);
    event AccessGranted(address indexed patient, address indexed doctor);
    event AccessRevoked(address indexed patient, address indexed doctor);
    event RecordAdded(address indexed patient, address indexed doctor, uint256 id, string recordType);

    modifier onlyAdmin() { require(msg.sender == admin, "Admin only"); _; }

    constructor() { admin = msg.sender; }

    function registerUser(address user, Role role, string calldata name) external onlyAdmin {
        require(role != Role.None, "Invalid role");
        require(roles[user] == Role.None, "Already registered");
        roles[user] = role;
        names[user] = name;
        emit UserRegistered(user, role, name);
    }

    function grantAccess(address doctor) external {
        require(roles[msg.sender] == Role.Patient, "Patients only");
        require(roles[doctor] == Role.Doctor, "Not a doctor");
        access[msg.sender][doctor] = true;
        emit AccessGranted(msg.sender, doctor);
    }

    function revokeAccess(address doctor) external {
        require(roles[msg.sender] == Role.Patient, "Patients only");
        access[msg.sender][doctor] = false;
        emit AccessRevoked(msg.sender, doctor);
    }

    function addRecord(address patient, string calldata recordType, string calldata data) external {
        require(roles[msg.sender] == Role.Doctor, "Doctors only");
        require(roles[patient] == Role.Patient, "Not a patient");
        require(access[patient][msg.sender], "No access from patient");
        uint256 id = records[patient].length;
        records[patient].push(Record(id, msg.sender, recordType, data, keccak256(bytes(data)), block.timestamp));
        emit RecordAdded(patient, msg.sender, id, recordType);
    }

    // Works as a read call from MetaMask because msg.sender is the connected account.
    function getRecords(address patient) external view returns (Record[] memory) {
        require(
            msg.sender == patient || (roles[msg.sender] == Role.Doctor && access[patient][msg.sender]),
            "Not authorised"
        );
        return records[patient];
    }
}
