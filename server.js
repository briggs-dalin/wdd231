const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const cors = require('cors');


app.use(cors());


app.use(express.json());

// Private Dreamlo URL for adding scores
const dreamloPrivateURL = "http://dreamlo.com/lb/n3p0eycpL0ezEpE8rFmmfwXUATO57iOEmfQPy0b2O3uA";

// Endpoint to add a score
app.post('/add-score', async (req, res) => {
    const { player, score } = req.body;

    if (!player || !score) {
        return res.status(400).json({ error: 'Player and score are required' });
    }

    try {
        const url = `${dreamloPrivateURL}/add/${player}/${score}`;
        const response = await axios.get(url);
        res.status(200).json({ message: 'Score added successfully', data: response.data });
    } catch (error) {
        console.error("Error adding score:", error);
        res.status(500).json({ error: 'Error adding score to leaderboard' });
    }
});

// Endpoint to get the leaderboard data
app.get('/leaderboard', async (req, res) => {
    const dreamloPublicURL = "http://dreamlo.com/lb/n3p0eycpL0ezEpE8rFmmfwXUATO57iOEmfQPy0b2O3uA/json";
    
    try {
        const response = await axios.get(dreamloPublicURL);
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        res.status(500).json({ error: 'Error fetching leaderboard data' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
