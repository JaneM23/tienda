require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('./jwtConfig'); // <- usa misma clave

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
const hasGoogle = !!GOOGLE_CLIENT_ID && !!GOOGLE_CLIENT_SECRET;
console.log('[OAuth] Google habilitado:', hasGoogle);

if (hasGoogle) {
  passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback',
  }, (accessToken, refreshToken, profile, done) => {
    const user = {
      id: profile.id,
      username: profile.displayName,
      email: profile.emails?.[0]?.value || '',
      role: 'user',
    };
    const token = jwt.sign(user, secret, { expiresIn }); // <- misma firma
    return done(null, { user, token });
  }));
}

module.exports = passport;
