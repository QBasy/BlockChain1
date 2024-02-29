const express = require('express');
const app = express();
const port = 4235;
const path = __dirname + '/src/frontend/';
const fs = require('fs');
const { ethers } = require("hardhat");
const { Web3 } = require('web3');

let abi;
let votingSystem;

const provider = 'https://go.getblock.io/15b59d80dbd64551acf9aab6f4a46fef';

(async () => {
  try {
    const abiPath = (__dirname + '/src/frontend/contract/VotingSystem.sol/VotingSystem.json');
    const abiData = fs.readFileSync(abiPath, 'utf8');
    abi = JSON.parse(abiData).abi;
  } catch (error) {
    console.error('Error reading ABI:', error);
  }
})();

let contractAddress;
let contractInstance;

const web3Instance = new Web3(provider);

app.use(express.static(path));

async function deployContract() {
  try {
    const VotingSystem = await ethers.getContractFactory("VotingSystem");
    votingSystem = await VotingSystem.deploy(["Candidate1", "Candidate2", "Candidate3", "Candidate4"]);

    if (votingSystem) {console.log("Contract deployed successfully.");}

    votingSystem.on("VoteCast", (voter, candidate) => {
      console.log("Vote cast by:", voter, "for candidate:", candidate);
    });

    return votingSystem;
  } catch (error) {
    console.error("Error deploying contract:", error);
    throw error;
  }
}

(async () => {
  try {
    contractInstance = await new web3Instance.eth.Contract(abi, contractAddress);
    contractAddress = await deployContract();
    console.log(contractAddress);
  } catch (error) {
    console.error("Error deploying contract:", error);
  }
})();

async function pollEvents() {
  try {
    const blockNumber = await web3Instance.eth.getBlockNumber();
    const events = await contractInstance.getPastEvents("VoteCast", { fromBlock: blockNumber, toBlock: 'latest' });
    events.forEach(event => {
      console.log("Vote cast by:", event.returnValues.voter, "for candidate:", event.returnValues.candidate);
    });
  } catch (error) {
    console.error("Error polling for events:", error);
  }
}

setInterval(pollEvents, 5000);

app.get(('/'), (req,res) => {
  res.sendFile(path + 'index.html');
});

app.get(('/startvoting'), (req, res) => {
  res.sendFile(path + 'startvoting.html');
});

app.get(('/voting'), (req ,res) => {
  res.sendFile(path + 'voting.html');
});

app.get('/castVote', async (req, res) => {
  const { candidate } = req.query;
  try {
    await votingSystem.vote(candidate);
    res.status(200).json({ success: true, message: `Vote for ${candidate} cast successfully` });
  } catch (error) {
    console.error("Error casting vote:", error);
    res.status(500).json({ success: false, message: "Failed to cast vote" });
  }
});

app.get('/getContractAddress', (req, res) => {
  res.json({ address: contractAddress });
});

app.post('/getElectionResult', async (req, res) => {
  try {
    const electionResultsBigInt = await votingSystem.getElectionResult();
    const electionResults = electionResultsBigInt.map(result => Number(result));

    res.json({ electionResults });
  } catch (error) {
    console.error("Error fetching election results:", error);
    res.status(500).json({ error: "Failed to fetch election results" });
  }
});

app.listen(port, () => {
  console.log(`Server working on port ${port}`);
});
