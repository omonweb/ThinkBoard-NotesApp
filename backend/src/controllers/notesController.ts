import { Response } from 'express';
import Note from '../models/Note.js';
import { AuthenticatedRequest } from '../types/index.js';

export const getAllNotes = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    const notes = await Note.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(notes);
  } catch (error) {
    console.error('Get all notes error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getNoteById = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!note) {
      res.status(404).json({ message: 'Note not found' });
      return;
    }

    res.json(note);
  } catch (error) {
    console.error('Get note by id error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createNote = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    const { title, content } = req.body;

    if (!title || !content) {
      res.status(400).json({ message: 'Title and content are required' });
      return;
    }

    const note = new Note({
      title,
      content,
      userId: req.user._id,
    });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error('Create note error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateNote = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    const { title, content } = req.body;

    if (!title || !content) {
      res.status(400).json({ message: 'Title and content are required' });
      return;
    }

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { title, content },
      { new: true }
    );

    if (!note) {
      res.status(404).json({ message: 'Note not found' });
      return;
    }

    res.json(note);
  } catch (error) {
    console.error('Update note error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteNote = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!note) {
      res.status(404).json({ message: 'Note not found' });
      return;
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Delete note error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
