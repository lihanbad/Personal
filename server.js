const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.static('.'));

// API Endpoint to scan notes directory
app.get('/api/notes', (req, res) => {
    const notesDir = path.join(__dirname, 'notes');
    
    fs.readdir(notesDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to scan directory' });
        }
        
        // Filter only .txt and .md files
        const noteFiles = files.filter(file => file.endsWith('.txt') || file.endsWith('.md'))
            .map(file => ({
                title: file.toUpperCase(),
                path: `notes/${file}`
            }));

        res.json(noteFiles);
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));