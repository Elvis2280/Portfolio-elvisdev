import { NextResponse } from 'next/server';
import type {
  SpotifyCurrentlyPlaying,
  SpotifyTokenResponse,
} from '@/types/spotify';

const client_spotify_id = process.env.SPOTIFY_CLIENT_ID;
const client_spotify_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const _get_access_token = async (): Promise<SpotifyTokenResponse> => {
  const endpoint = Buffer.from(
    `${client_spotify_id}:${client_spotify_secret}`,
  ).toString('base64');

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${endpoint}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token || '',
    }),
  });

  return response.json();
};

export async function GET() {
  const { access_token } = await _get_access_token();

  const response = await fetch(
    'https://api.spotify.com/v1/me/player/currently-playing',
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: 'no-store',
    },
  );

  if (response.status === 204 || response.status === 400) {
    return NextResponse.json({ isPlaying: false });
  }

  const song: SpotifyCurrentlyPlaying = await response.json();

  if (song.item === null) {
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
