document.addEventListener('DOMContentLoaded', () => {
  const startVotingForm = document.getElementById('startVotingForm');
  const notification = document.getElementById('notification');

  startVotingForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const electionName = document.getElementById('electionName').value;
    const startDateTime = document.getElementById('startDateTime').value;
    const endDateTime = document.getElementById('endDateTime').value;

    console.log(`New election started: ${electionName}, ${startDateTime}, ${endDateTime}`);

    notification.innerText = 'Voting event initiated successfully!';
    notification.style.display = 'block';

    setTimeout(() => {
      startVotingForm.reset();
      notification.style.display = 'none';
    }, 2000);
  });
});