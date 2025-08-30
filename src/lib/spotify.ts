import SpotifyWebApi from 'spotify-web-api-node';

// Define the permissions (scopes) our application needs from the user.
// These scopes determine what data we can access on the user's behalf.
const scopes = [
  'user-read-email',
  'user-read-private',
  'user-top-read', // Required for getting top artists and tracks
  'user-read-recently-played',
  'playlist-read-private',
  'playlist-read-collaborative',
].join(',');

const params = {
  scope: scopes,
};

const queryParamString = new URLSearchParams(params).toString();

// This is the URL the user will be redirected to when they click "Login"
// NextAuth.js will use this URL to initiate the Spotify authentication flow.
const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString}`;

// This is our main, reusable Spotify API client instance, pre-configured
// with our application's credentials.
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

export default spotifyApi;

export { LOGIN_URL };