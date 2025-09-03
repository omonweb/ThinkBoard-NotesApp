import dotenv from 'dotenv';
dotenv.config();
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';
import { GoogleProfile } from '../types/index.js';

// Check if required environment variables are set
const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

console.log('🔍 Passport Configuration Debug:');
console.log('GOOGLE_CLIENT_ID exists:', !!clientID);
console.log('GOOGLE_CLIENT_SECRET exists:', !!clientSecret);
console.log('GOOGLE_CLIENT_ID length:', clientID?.length || 0);
console.log('GOOGLE_CLIENT_SECRET length:', clientSecret?.length || 0);

if (!clientID || !clientSecret) {
  console.warn('⚠️  Google OAuth credentials not found. Authentication will be disabled.');
  console.warn('Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in your .env file');
  console.warn('Make sure to restart the server after updating the .env file');
} else {
  console.log('✅ Google OAuth credentials found. Initializing strategy...');
  
  passport.use(
    new GoogleStrategy(
      {
        clientID,
        clientSecret,
        callbackURL: '/api/auth/google',
        
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const googleProfile = profile as GoogleProfile;
          
          // Check if user already exists
          let user = await User.findOne({ googleId: googleProfile.id });

          if (user) {
            return done(null, user);
          }

          // Create new user
          user = new User({
            googleId: googleProfile.id,
            email: googleProfile.emails[0].value,
            name: googleProfile.displayName,
            picture: googleProfile.photos?.[0]?.value,
          });

          await user.save();
          return done(null, user);
        } catch (error) {
          return done(error as Error);
        }
      }
    )
  );
  
  console.log('✅ Google OAuth strategy initialized successfully');
}

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
