import express, { Router } from 'express';
import passport from 'passport';
import { googleAuthCallback, getCurrentUser } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';

const router: Router = express.Router();

// Function to configure routes after environment variables are loaded
const configureAuthRoutes = () => {
  // Check if Google OAuth is configured
  const isGoogleOAuthConfigured = process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET;

  console.log('🔍 Auth Routes Debug:');
  console.log('isGoogleOAuthConfigured:', isGoogleOAuthConfigured);
  console.log('GOOGLE_CLIENT_ID exists:', !!process.env.GOOGLE_CLIENT_ID);
  console.log('GOOGLE_CLIENT_SECRET exists:', !!process.env.GOOGLE_CLIENT_SECRET);

  // Google OAuth routes (only if configured)
  if (isGoogleOAuthConfigured) {
    console.log('✅ Setting up Google OAuth routes...');
    
    router.get(
      '/google',
      passport.authenticate('google', { scope: ['profile', 'email'] })
    );

    router.get(
      '/google/callback',
      passport.authenticate('google', { session: false }),
      googleAuthCallback
    );
    
    console.log('✅ Google OAuth routes configured');
  } else {
    console.log('⚠️  Google OAuth not configured, setting up fallback routes...');
    
    // Fallback routes when Google OAuth is not configured
    router.get('/google', (req, res) => {
      console.log('❌ Google OAuth route accessed but not configured');
      res.status(503).json({ 
        message: 'Google OAuth is not configured. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in your environment variables.' 
      });
    });

    router.get('/google/callback', (req, res) => {
      console.log('❌ Google OAuth callback accessed but not configured');
      res.status(503).json({ 
        message: 'Google OAuth is not configured. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in your environment variables.' 
      });
    });
    
    console.log('⚠️  Fallback routes configured');
  }
};

// Configure routes after a short delay to ensure environment variables are loaded
setImmediate(configureAuthRoutes);

// Get current user
router.get('/me', authenticateToken, getCurrentUser);

export default router;
