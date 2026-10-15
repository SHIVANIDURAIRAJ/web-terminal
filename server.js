
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => console.log('Database Error:', err.message));

// Create Schema
const driveSchema = new mongoose.Schema({
    company: { type: String, required: true },
    role: { type: String, required: true },
    package: { type: Number, required: true },
    lastDate: { type: String, required: true }
});

// Create Model
const Drive = mongoose.model('Drive', driveSchema);

// Home page
app.get('/', (req, res) => {
    res.send('Placement Drive CRUD API is Running!');
});

// CREATE: Add a new drive
app.post('/drives', async (req, res) => {
    try {
        const drive = await Drive.create(req.body);
        res.status(201).json(drive);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// READ: Get all drives
app.get('/drives', async (req, res) => {
    try {
        const drives = await Drive.find();
        res.json(drives);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE: Modify a drive using its ID
app.put('/drives/:id', async (req, res) => {
    try {
        const drive = await Drive.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!drive) {
            return res.status(404).json({ message: 'Drive not found' });
        }

        res.json(drive);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE: Remove a drive using its ID
app.delete('/drives/:id', async (req, res) => {
    try {
        const drive = await Drive.findByIdAndDelete(req.params.id);

        if (!drive) {
            return res.status(404).json({ message: 'Drive not found' });
        }

        res.json({ message: 'Drive deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Start Server
app.listen(process.env.PORT || 3000, () => {
    console.log('Server running at http://localhost:3000');
});
