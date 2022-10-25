const base_url = 'https://discord.com/api/v10';
const { client_id, client_secret } = require('./app-credentials.json');
const redirect_uri = `http://localhost:8080`;

const server = require('http').createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const code = url.searchParams.get('code');
  if(!code) { res.end('No code received. Please try logging in again.'); return; }
  res.end('Code received. You will be logged in soon!');
  const token_obj = await login(code);
  console.log(token_obj);
  server.close();
}).listen(8080);

const url_to_give_to_user = 'https://discord.com/api/oauth2/authorize?client_id=1033591042945065051&redirect_uri=http%3A%2F%2Flocalhost%3A8080&response_type=code&scope=identify';

console.log(`Click here to login: ${url_to_give_to_user}`);

const scopes = 'identify';

async function login(code) {
  const data = new URLSearchParams();
  data.append('client_id', client_id);
  data.append('client_secret', client_secret);
  data.append('grant_type', 'authorization_code');
  data.append('redirect_uri', redirect_uri);
  data.append('scope', scopes);
  data.append('code', code);
  const url = `${base_url}/oauth2/token`;
  const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
  const response = await fetch(url, { method: 'POST', body: data, headers });
  return (await response.json());
}
