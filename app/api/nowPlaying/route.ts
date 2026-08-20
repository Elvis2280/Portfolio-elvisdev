import { NextResponse } from 'next/server';
import type {
  SpotifyCurrentlyPlaying,
  SpotifyRefreshTokenResponse,
} from '@/types/spotify';

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const client_spotify_id = process.env.SPOTIFY_CLIENT_ID;
const client_spotify_secret = process.env.SPOTIFY_CLIENT_SECRET;
let refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const getBasicAuthHeader = () => {
  /*
  This function generates the Basic Authorization header required for Spotify's token refresh endpoint.
  */
  const basic = Buffer.from(
    `${client_spotify_id}:${client_spotify_secret}`,
  ).toString('base64');
  return `Basic ${basic}`; // Encode credentials in Base64 for Basic Auth
};

const _getRefreshToken = async () => {
  /* 
  This function handles the process of refreshing the Spotify access token using the refresh token.
  It sends a POST request to Spotify's token endpoint with the necessary headers and body parameters.
  If the refresh token is valid, it returns the new access token. If the refresh token is invalid or expired,
  it logs an error and returns null, indicating that user re-authorization is required.
    */
  try {
    if (!refresh_token) {
      throw new Error('Refresh token is not set in environment variables.');
    }

    const payload = {
      method: 'POST',
      headers: {
        Authorization: getBasicAuthHeader(),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
      }),
      cache: 'no-store' as RequestCache, // Ensure no caching for token refresh
    };
    const result = await fetch(TOKEN_ENDPOINT, payload);
    const response: SpotifyRefreshTokenResponse = await result.json();

    // If refresh token is expired (6-month limit) or revoked by user
    if ('error' in response) {
      return null;
    }

    if (!response?.access_token) {
      console.error(
        'Spotify Refresh Token is invalid or expired. User re-authorization required.',
      );
      return null;
    }

    if (response.access_token) {
      refresh_token = response.refresh_token || refresh_token;
      return response.access_token;
    }
  } catch (error) {
    console.error('Error refreshing Spotify access token:', error);
    return null;
  }
};

export async function GET() {
  /*
  This function handles the GET request to fetch the currently playing track from Spotify.
  It first retrieves a valid access token by calling the _getRefreshToken function. Then, it makes a request to Spotify's
  currently playing endpoint. If successful, it extracts relevant information about the currently playing track and returns
  it in a structured JSON response. If there is an error or no track is currently playing, it returns a response indicating
  that no song is playing.
  */
  const access_token = await _getRefreshToken();
  let song: SpotifyCurrentlyPlaying | null = null;

  try {
    const response = await fetch(
      'https://api.spotify.com/v1/me/player/currently-playing',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        cache: 'no-store',
      },
    );

    // If currently playing fails (e.g. 401/500) OR no track is playing (204 No Content)
    if (!response.ok || response.status === 204) {
      const recentlyPlayedRes = await fetch(
        'https://api.spotify.com/v1/me/player/recently-played?limit=1',
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          cache: 'no-store',
        },
      );

      if (recentlyPlayedRes.ok) {
        const recentData = await recentlyPlayedRes.json();
        const lastTrack = recentData.items[0]?.track;

        if (lastTrack) {
          // Map the recently played track to match your SpotifyCurrentlyPlaying structure
          song = {
            is_playing: false,
            item: lastTrack,
          } as SpotifyCurrentlyPlaying;
        }
      }
    } else {
      // Currently playing track returned successfully (200 OK)
      song = (await response.json()) as SpotifyCurrentlyPlaying;
    }
  } catch (error) {
    console.error('Error fetching Spotify track:', error);
  }

  if (!song) {
    return NextResponse.json({ isPlaying: false });
  }

  if (song.item === null) {
    console.warn('No song is currently playing.');
    return NextResponse.json({ isPlaying: false });
  }

  const isPlaying = song.is_playing;
  const title = song.item.name;
  const artist = song.item.artists.map((artist) => artist.name).join(', ');
  const albumImageUrl = song.item.album.images[0].url;
  const songUrl = song.item.external_urls.spotify;

  return NextResponse.json({
    isPlaying,
    title,
    artist,
    albumImageUrl,
    songUrl,
  });
}
