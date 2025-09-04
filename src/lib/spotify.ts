import SpotifyWebApi from 'spotify-web-api-node';

// Define the permissions (scopes) our application needs from the user.
const scopes = [
  'user-read-email',
  'user-read-private',
  'user-top-read',
  'user-read-recently-played',
  'playlist-read-private',
  'playlist-read-collaborative',
].join(',');

const params = {
  scope: scopes,
};

const queryParamString = new URLSearchParams(params).toString();

// CORRECTED LINE: This now points to the official Spotify Accounts service.
const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString}`;

// This is our main, reusable Spotify API client instance.
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

export default spotifyApi;

export { LOGIN_URL };