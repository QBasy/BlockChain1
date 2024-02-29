document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('startVotingForm').addEventListener('submit', initiateVotingEvent);

    document.getElementById('connectButton').addEventListener('click', connectWallet);

    document.getElementById('electionName').addEventListener('input', handleElectionNameChange);

    document.getElementById('startDateTime').addEventListener('input', handleStartDateTimeChange);
});

async function initiateVotingEvent(event) {
    event.preventDefault();
    const electionName = document.getElementById('electionName').value;
    const startDateTime = document.getElementById('startDateTime').value;
    const endDateTime = document.getElementById('endDateTime').value;

    alert('Voting event initiated successfully!');
}

function handleElectionNameChange(event) {
    console.log('Election name changed:', event.target.value);
}

function handleStartDateTimeChange(event) {
    console.log('Start date and time changed:', event.target.value);
}
    