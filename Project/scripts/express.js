const express = require('express');
const axios = require('axios');
const cors = require('cors'); 

const app = express();
const PORT = 3000;

app.use(cors());  
app.use(express.json());


const leaderboardURL = 'http://dreamlo.com/lb/n3p0eycpL0ezEpE8rFmmfwXUATO57iOEmfQPy0b2O3uA';


app.post('/add-score', async (req, res) => {
    const { player, score } = req.body;
    const url = `${leaderboardURL}/add/${player}/${score}`;

    try {
        const response = await axios.get(url);
        res.json({ message: 'Score added successfully', data: response.data });
    } catch (error) {
        res.status(500).json({ message: 'Error adding score', error: error.message });
    }
});

// Route to fetch the leaderboard
app.get('/leaderboard', async (req, res) => {
    try {
        const response = await axios.get(`${leaderboardURL}/json`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leaderboard', error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
