const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');
app.use(express.json()); // Enable JSON parsing for incoming requests
app.use(express.static(__dirname)); // Serves static files
app.use(cors({ origin: '*' })); // Allow requests from any origin

app.use(cors()); // Allow all origins

// Manually handle preflight requests for all routes
app.options('*', cors()); 

// POST endpoint to store user quiz responses
app.post('/submit-quiz', (req, res) => {
  console.log("Received quiz submission:", req.body);
  // rest of the code


  fs.readFile('responses.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading responses.json:', err);
      return res.status(500).json({ message: 'Error reading data' });
    }

    const responses = data ? JSON.parse(data) : [];
    responses.push(newResponse);

    fs.writeFile('responses.json', JSON.stringify(responses, null, 2), (err) => {
      if (err) {
        console.error('Error writing to responses.json:', err);
        return res.status(500).json({ message: 'Error saving data' });
      }
      res.status(200).json({ message: 'Quiz submitted successfully' });
    });
  });
});

app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});
