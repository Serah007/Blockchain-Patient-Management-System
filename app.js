// 1. After deploying PatientSystem.sol on Sepolia (Remix), paste the address here.
const CONTRACT_ADDRESS = "0x309423c07C0556B61C07173d07A5fdF435442d70";
const SEPOLIA_CHAIN_ID = 11155111;
// 2. Block number where the contract was deployed (Etherscan -> your contract -> creation transaction -> Block).
const DEPLOY_BLOCK = 11908649;

const ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "patient",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "doctor",
        "type": "address"
      }
    ],
    "name": "AccessGranted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "patient",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "doctor",
        "type": "address"
      }
    ],
    "name": "AccessRevoked",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "patient",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "recordType",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "data",
        "type": "string"
      }
    ],
    "name": "addRecord",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "doctor",
        "type": "address"
      }
    ],
    "name": "grantAccess",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "patient",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "doctor",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "recordType",
        "type": "string"
      }
    ],
    "name": "RecordAdded",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "enum PatientSystem.Role",
        "name": "role",
        "type": "uint8"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "name": "registerUser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "doctor",
        "type": "address"
      }
    ],
    "name": "revokeAccess",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
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
        "internalType": "enum PatientSystem.Role",
        "name": "role",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "name": "UserRegistered",
    "type": "event"
  },
  {
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
    "name": "access",
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
    "name": "admin",
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
        "internalType": "address",
        "name": "patient",
        "type": "address"
      }
    ],
    "name": "getRecords",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "doctor",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "recordType",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "data",
            "type": "string"
          },
          {
            "internalType": "bytes32",
            "name": "dataHash",
            "type": "bytes32"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "internalType": "struct PatientSystem.Record[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
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
    "name": "names",
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
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "roles",
    "outputs": [
      {
        "internalType": "enum PatientSystem.Role",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

let provider, signer, contract, account;
const $ = (id) => document.getElementById(id);
const short = (a) => a.slice(0, 6) + "..." + a.slice(-4);

function say(msg, isError = false) {
  $("status").textContent = msg;
  $("status").className = isError ? "error" : "";
}

// Runs a contract action, shows progress and a readable error.
async function run(label, fn) {
  try {
    say(label + "...");
    const result = await fn();
    say(label + " done.");
    return result;
  } catch (e) {
    say((e.reason || (e.error && e.error.message) || e.message || "Something went wrong"), true);
  }
}

async function sendTx(label, txPromiseFn) {
  return run(label, async () => {
    const tx = await txPromiseFn();
    say("Waiting for confirmation on Sepolia...");
    await tx.wait();
  });
}

$("connect").onclick = async () => {
  if (!window.ethereum) return say("MetaMask not found. Install the MetaMask extension.", true);
  if (CONTRACT_ADDRESS.startsWith("PASTE")) return say("Set CONTRACT_ADDRESS in app.js first.", true);
  await run("Connecting", async () => {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const net = await provider.getNetwork();
    if (net.chainId !== SEPOLIA_CHAIN_ID) throw new Error("Switch MetaMask to the Sepolia network.");
    signer = provider.getSigner();
    account = await signer.getAddress();
    contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    $("account").textContent = short(account);
    await showRole();
  });
};

async function showRole() {
  ["admin", "doctor", "patient"].forEach((id) => ($(id).hidden = true));
  const adminAddr = await contract.admin();
  let role = "Unregistered";
  if (adminAddr.toLowerCase() === account.toLowerCase()) {
    role = "Admin"; $("admin").hidden = false;
  } else {
    const r = await contract.roles(account);
    if (r === 1) { role = "Patient"; $("patient").hidden = false; loadMine(); }
    if (r === 2) { role = "Doctor"; $("doctor").hidden = false; }
  }
  $("role").textContent = role;
  if (role === "Unregistered") say("This wallet is not registered. Ask the admin to register it.", true);
}

// Renders records with an integrity check: recompute the hash and compare with the stored one.
function renderRecords(listEl, records) {
  listEl.innerHTML = "";
  if (!records.length) { listEl.innerHTML = "<li>No records yet.</li>"; return; }
  records.forEach((r) => {
    const li = document.createElement("li");
    const date = new Date(r.timestamp.toNumber() * 1000).toLocaleString();
    const intact = ethers.utils.id(r.data) === r.dataHash;
    li.innerHTML = `<strong></strong><p></p><small></small>
      <span class="${intact ? "ok" : "bad"}">${intact ? "Integrity verified" : "Record altered"}</span>`;
    li.querySelector("strong").textContent = r.recordType + " #" + r.id.toString();
    li.querySelector("p").textContent = r.data;
    li.querySelector("small").textContent = `${date} | by ${short(r.doctor)} | hash ${r.dataHash}`;
    listEl.appendChild(li);
  });
}

// Admin
$("regBtn").onclick = () => sendTx("Registering user", () =>
  contract.registerUser($("regAddr").value.trim(), Number($("regRole").value), $("regName").value.trim()));

// Node providers limit log queries to about 10,000 blocks, so read in chunks from the deploy block.
async function queryAll(filter) {
  if (!DEPLOY_BLOCK) throw new Error("Set DEPLOY_BLOCK in app.js to your contract's deployment block.");
  const latest = await provider.getBlockNumber();
  let events = [];
  for (let from = DEPLOY_BLOCK; from <= latest; from += 9000) {
    events = events.concat(await contract.queryFilter(filter, from, Math.min(from + 8999, latest)));
  }
  return events;
}

$("logBtn").onclick = () => run("Loading activity", async () => {
  const all = await Promise.all([
    queryAll(contract.filters.UserRegistered()),
    queryAll(contract.filters.AccessGranted()),
    queryAll(contract.filters.AccessRevoked()),
    queryAll(contract.filters.RecordAdded())
  ]);
  const events = all.flat().sort((a, b) => b.blockNumber - a.blockNumber);
  $("log").innerHTML = "";
  events.forEach((e) => {
    const li = document.createElement("li");
    const a = e.args;
    li.textContent = e.event + (a.name ? ": " + a.name : "") + (a.recordType ? ": " + a.recordType : "");
    const s = document.createElement("small");
    s.textContent = "block " + e.blockNumber + " | tx " + e.transactionHash;
    li.appendChild(s);
    $("log").appendChild(li);
  });
  if (!events.length) $("log").innerHTML = "<li>No activity yet.</li>";
});

// Doctor
$("docView").onclick = () => run("Loading records", async () =>
  renderRecords($("docList"), await contract.getRecords($("docPatient").value.trim())));

$("docAdd").onclick = async () => {
  await sendTx("Adding record", () =>
    contract.addRecord($("docPatient").value.trim(), $("docType").value, $("docData").value.trim()));
  $("docData").value = "";
  $("docView").onclick();
};

// Patient
$("grantBtn").onclick = () => sendTx("Granting access", () => contract.grantAccess($("accDoctor").value.trim()));
$("revokeBtn").onclick = () => sendTx("Revoking access", () => contract.revokeAccess($("accDoctor").value.trim()));

function loadMine() {
  return run("Loading your records", async () => renderRecords($("myList"), await contract.getRecords(account)));
}
$("myView").onclick = loadMine;

if (window.ethereum) {
  window.ethereum.on("accountsChanged", () => location.reload());
  window.ethereum.on("chainChanged", () => location.reload());
}
