document.getElementById('menu-toggle').addEventListener('click', () => {
    document.getElementById('nav-links').classList.toggle('show');
  });
  
  document.getElementById('menu-toggle').addEventListener('click', () => {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('open');  
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    const year = document.getElementById("currentyear");
    const lastMod = document.getElementById("lastModified");
    if (year) year.textContent = new Date().getFullYear();
    if (lastMod) lastMod.textContent = `Last Modified: ${document.lastModified}`;
  
    document.addEventListener('DOMContentLoaded', () => {
        // Function to fetch and display the top 3 players from the leaderboard
        const fetchTopPlayers = async () => {
            try {
                const response = await fetch('https://wdd231-0ps2.onrender.com/leaderboard');  // Change to the actual backend URL if needed
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const leaderboardEntries = data.dreamlo.leaderboard.entry;
    
                const topPlayersList = document.getElementById('top-players-list');
                topPlayersList.innerHTML = '';  // Clear previous content
    
                // Display top 3 players
                leaderboardEntries.slice(0, 3).forEach((entry, index) => {
                    const li = document.createElement('li');
                    li.classList.add('top-player');
                    li.textContent = `${index + 1}. ${entry.name}: ${entry.score}`;
                    topPlayersList.appendChild(li);
                });
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
                alert('Error fetching leaderboard');
            }
        };
    
        // Fetch and display the top players when the page loads
        fetchTopPlayers();
    });
});

const quotes = [
    "Victory is earned, not given.",
    "Keep grinding. Legends are built, not born.",
    "Only the best make it to the top.",
    "Play hard. Play fair.",
    "Every click counts."
];

document.getElementById('random-quote').textContent =
    quotes[Math.floor(Math.random() * quotes.length)];
