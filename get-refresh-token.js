import http from 'http';
import { exec } from 'child_process';
import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

const PORT = 8888;
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`;
const SCOPES = 'user-read-private user-read-currently-playing';

async function run() {
  const rl = readline.createInterface({ input, output });

  console.log('\n==================================================');
  console.log('   Spotify 6-Month Refresh Token Generator');
  console.log('==================================================\n');

  const clientId = (await rl.question('Enter your Spotify Client ID: ')).trim();
  const clientSecret = (
    await rl.question('Enter your Spotify Client Secret: ')
  ).trim();
  rl.close();

  if (!clientId || !clientSecret) {
    console.error('\nError: Client ID and Client Secret are required.');
    process.exit(1);
  }

  // Create temporary local OAuth callback server
  const server = http.createServer(async (req, res) => {
    const urlParams = new URL(req.url, `http://127.0.0.1:${PORT}`).searchParams;
    const code = urlParams.get('code');

    if (code) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <div style="font-family: system-ui, sans-serif; text-align: center; margin-top: 15%;">
          <h1>Success!</h1>
          <p>You can close this tab and return to your terminal.</p>
        </div>
      `);
      server.close();

      console.log('\nExchanging code for 6-month refresh token...\n');

      const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
        'base64',
      );
      try {
        const tokenResponse = await fetch(
          'https://accounts.spotify.com/api/token',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Basic ${basicAuth}`,
            },
            body: new URLSearchParams({
              grant_type: 'authorization_code',
              code: code,
              redirect_uri: REDIRECT_URI,
            }),
          },
        );

        const data = await tokenResponse.json();

        if (tokenResponse.ok && data.refresh_token) {
          console.log('================ YOUR REFRESH TOKEN ================');
          console.log(data.refresh_token);
          console.log('====================================================\n');
          console.log(
            'Copy the string above into your .env file as SPOTIFY_REFRESH_TOKEN.\n',
          );
        } else {
          console.error('Error fetching token:', data);
        }
      } catch (err) {
        console.error('Network request failed:', err.message);
      }
      process.exit(0);
    }
  });

  server.listen(PORT, () => {
    const authUrl = `https://accounts.spotify.com/authorize?${new URLSearchParams(
      {
        response_type: 'code',
        client_id: clientId,
        scope: SCOPES,
        redirect_uri: REDIRECT_URI,
      },
    ).toString()}`;

    console.log('\nOpening Spotify login in your browser...');
    exec(`start "" "${authUrl}"`);
  });
}

run();
