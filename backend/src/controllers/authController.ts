import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { GoogleProfile } from '../types/index.js';

export const googleAuthCallback = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const profile = req.user as any;
    
    console.log('🔍 Google Auth Callback Debug:');
    console.log('Profile received:', !!profile);
    console.log('Profile structure:', JSON.stringify(profile, null, 2));
    
    if (!profile) {
      console.error('❌ No profile data received');
      res.status(400).json({ message: 'No profile data' });
      return;
    }

    // Check if this is already a User document from the database
    if (profile._id && profile.googleId && profile.email) {
      console.log('✅ User document received from database');
      
      // Generate JWT token directly from the user document
      const token = jwt.sign(
        { userId: profile._id, email: profile.email },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
      );

      console.log('✅ JWT token generated, redirecting to frontend...');
      res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
      return;
    }

    // Handle raw Google profile (this should not happen with current setup)
    console.log('⚠️  Raw Google profile received, processing...');
    
    const googleId = profile.id;
    const emails = profile.emails || [];
    const displayName = profile.displayName || 'Unknown User';
    const photos = profile.photos || [];

    console.log('Extracted data:');
    console.log('- googleId:', googleId);
    console.log('- emails count:', emails.length);
    console.log('- displayName:', displayName);
    console.log('- photos count:', photos.length);

    if (!googleId) {
      console.error('❌ No Google ID found in profile');
      res.status(400).json({ message: 'Invalid profile data - no Google ID' });
      return;
    }

    if (emails.length === 0) {
      console.error('❌ No emails found in profile');
      res.status(400).json({ message: 'Invalid profile data - no email' });
      return;
    }

    const email = emails[0].value;
    const picture = photos.length > 0 ? photos[0].value : undefined;

    console.log('Final extracted data:');
    console.log('- email:', email);
    console.log('- picture:', picture ? 'available' : 'not available');

    // Check if user exists
    let user = await User.findOne({ googleId });

    if (!user) {
      console.log('Creating new user...');
      // Create new user
      user = new User({
        googleId,
        email,
        name: displayName,
        picture,
      });
      await user.save();
      console.log('✅ New user created:', user._id);
    } else {
      console.log('✅ Existing user found:', user._id);
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    console.log('✅ JWT token generated, redirecting to frontend...');

    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
  } catch (error) {
    console.error('❌ Google auth callback error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/auth/error`);
  }
};

export const getCurrentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const user = await User.findById(decoded.userId).select('-__v');

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};
