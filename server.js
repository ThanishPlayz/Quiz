const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());
app.use(express.static(__dirname)); // Serves static files

// POST endpoint to store user quiz responses
app.post('/submit-quiz', (req, res) => {
  const { name, answers, time } = req.body; // Capture time from request
  const newEntry = { 
    name, 
    score: answers.filter(answer => answer.correct).length, 
    time // Store the timestamp in the response
  };

  // Load existing responses, add the new entry, and write back to responses.json
  fs.readFile('responses.json', 'utf8', (err, data) => {
    const responses = data ? JSON.parse(data) : [];
    responses.push(newEntry);

    fs.writeFile('responses.json', JSON.stringify(responses, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('Error saving responses:', writeErr);
        return res.status(500).json({ message: 'Failed to save responses.' });
      }
      res.status(200).json({ message: 'Quiz submitted successfully' });
    });
  });
});


app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});
