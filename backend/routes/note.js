const express = require('express');

const Video=require('../models/Video');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

var fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Video.js');






router.post('/notes', async (req, res) => {
  const { user, videoId, notes } = req.body;

  if (!videoId || !notes) {
    return res.status(400).json({ message: 'Video ID and notes are required' });
  }

  try {
    const newNote = new Note({
      user, // This would typically come from the logged-in user's session
      videoId,
      notes
    });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});
module.exports = router