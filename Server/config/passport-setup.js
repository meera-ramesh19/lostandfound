const jwt = require('jsonwebtoken');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
// const adminGoogleIds = process.env.ADMIN_GOOGLE_ID.split(','); // Assuming ADMIN_GOOGLE_IDS="id1,id2"
// const adminGoogleIds = ['admin_google_id_1', 'admin_google_id_2']; // Add actual Google IDs for your admins

passport.use(
  new GoogleStrategy(
    {
      clientID: '328963461081-m0o8uev3usd5om7hfl1topaph85ueipa',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3010/google/callback',
      passReqToCallback: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log('clientID');
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          // Determine the user's role based on whether their Google ID is in the adminGoogleIds array
          const role = adminGoogleIds.includes(profile.id) ? 'admin' : 'user';

          // Create a new user if one doesn't exist
          const newUser = await new User({
            googleId: profile.id,
            displayName: profile.displayName,
            role: 'user', // Assign the role determined above
          }).save();

          // Sign a JWT token for the new user
          const token = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
          );

          done(null, newUser, { token }); // Pass the token along with the user info
        } else {
          // User exists, so just sign a new token
          const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
          );

          done(null, user, { token });
        }
      } catch (error) {
        done(error, null);
      }
    }
  )
);
