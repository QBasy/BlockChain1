const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contractPath = path.resolve("./ERC721.sol");
const contractSource = fs.readFileSync(contractPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'ERC721.sol': {
      content: contractSource,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '': ['abi', 'bin'],
      },
    },
  },
};

try {
  const compiledContract = JSON.parse(solc.compile(JSON.stringify(input)));

  const outputDirectory = path.resolve(__dirname, 'contracts');
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory);
  }

  for (const contractName in compiledContract.contracts['ERC721.sol']) {
    const contractFileName = contractName.replace(':', '') + '.json';
    const outputFile = path.join(outputDirectory, contractFileName);
    fs.writeFileSync(outputFile, JSON.stringify(compiledContract.contracts['ERC721.sol'][contractName]));
  }

  console.log('Contract compiled successfully!');
} catch (error) {
  console.error('An error occurred while compiling the contract:', error);
}