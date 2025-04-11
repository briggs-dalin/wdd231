document.addEventListener('DOMContentLoaded', () => {
    const year = document.getElementById("currentyear");
    const lastMod = document.getElementById("lastModified");
    if (year) year.textContent = new Date().getFullYear();
    if (lastMod) lastMod.textContent = `Last Modified: ${document.lastModified}`;

    document.getElementById('menu-toggle').addEventListener('click', () => {
        const navLinks = document.getElementById('nav-links');
        navLinks.classList.toggle('open');  
    });
  
    const form = document.getElementById('score-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const player = document.getElementById('player').value;
        const score = document.getElementById('score').value;
  
        try {
          const response = await fetch('https://wdd231-0ps2.onrender.com/add-score', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ player, score }),
          });
  
          const data = await response.json();
          alert(data.message || 'Score added successfully!');
          fetchLeaderboard(); // Refresh leaderboard
        } catch (error) {
          console.error(error);
        }
      });
    }
  
    fetchLeaderboard();
  });
  
  async function fetchLeaderboard() {
    try {
      const response = await fetch('https://wdd231-0ps2.onrender.com/leaderboard');
      if (!response.ok) throw new Error('Network response was not ok');
  
      const data = await response.json();
      const leaderboardEntries = data.dreamlo?.leaderboard?.entry || [];
  
      const leaderboardList = document.getElementById('leaderboard-list');
      leaderboardList.innerHTML = '';
  
      if (leaderboardEntries.length > 0) {
        leaderboardEntries.forEach(entry => {
          const li = document.createElement('li');
          li.classList.add('leaderboard-item');
          li.textContent = `${entry.name}: ${entry.score}`;
          leaderboardList.appendChild(li);
        });
      } else {
        leaderboardList.innerHTML = '<li>No leaderboard data available.</li>';
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      alert('Error fetching leaderboard');
    }
  }
  
  