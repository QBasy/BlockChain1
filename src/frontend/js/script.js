document.addEventListener('DOMContentLoaded', () => {
    async function connectMetaMask() {
        if (typeof window.ethereum === 'undefined') {
            alert('MetaMask is not installed.');
            return;
        }
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
            const signer = provider.getSigner();
            console.log("Account:", await signer.getAddress());

            document.getElementById('startVotingForm').style.display = 'block';

            await loadLiveElections();
        } catch (error) {
            console.error("Error connecting MetaMask:", error);
        }
    }


    async function connectTrustWallet() {
        if (typeof window.ethereum === 'undefined') {
            alert('Trust Wallet is not installed.');
            return;
        }
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
            const signer = provider.getSigner();
            console.log("Account:", await signer.getAddress());
            // Enable additional UI elements after successful connection
            document.getElementById('startVotingForm').style.display = 'block';
            // Call function to load live elections
            await loadLiveElections();
        } catch (error) {
            console.error("Error connecting Trust Wallet:", error);
        }
    }

    async function loadLiveElections() {
        const response = fetch('/getElectionResult', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        console.log("Loading live elections...");
    }

    async function startElection(name, startDateTime, endDateTime) {
        console.log("New election started:", name, startDateTime, endDateTime);
        await loadLiveElections();
        document.getElementById('notification').style.display = 'block';
    }

    async function handleStartElection(event) {
        event.preventDefault();
        const electionName = document.getElementById('electionName').value;
        const startDateTime = document.getElementById('startDateTime').value;
        const endDateTime = document.getElementById('endDateTime').value;
        // Call function to start election with form data
        await startElection(electionName, startDateTime, endDateTime);
    }

    document.getElementById('connectMetaMaskButton').addEventListener('click', connectMetaMask);

    document.getElementById('connectTrustWalletButton').addEventListener('click', connectTrustWallet);

    document.getElementById('startVotingForm').addEventListener('submit', handleStartElection);

    document.getElementById('clearFormButton').addEventListener('click', () => {
        document.getElementById('startVotingForm').reset();
    });

    document.getElementById('toggleFormVisibilityButton').addEventListener('click', () => {
        const form = document.getElementById('startVotingForm');
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('voteForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const voterID = document.getElementById('voterID').value;
        const voteOption = document.getElementById('voteOption').value;
        
        if (voterID.trim() === '') {
            alert('Please enter your voter ID.');
            return;
        }

        const notification = document.getElementById('notification');
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 2000);

        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        document.body.appendChild(confetti);
        setTimeout(() => {
            confetti.remove();
        }, 2000);
    });
});
