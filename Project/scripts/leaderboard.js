const axios = require('axios');

// Your Dreamlo leaderboard URL
const leaderboardURL = 'http://dreamlo.com/lb/n3p0eycpL0ezEpE8rFmmfwXUATO57iOEmfQPy0b2O3uA';

// Function to fetch leaderboard data
const fetchLeaderboard = async () => {
    try {
        const response = await axios.get(`${leaderboardURL}/json`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching leaderboard: ' + error.message);
    }
};



module.exports = {
    fetchLeaderboard,
};
