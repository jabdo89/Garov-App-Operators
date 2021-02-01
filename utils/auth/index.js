import axios from 'axios';
import { authUrl } from '@config/environment';

let accessToken;
let refreshToken;
let session;

const authManager = {
  refreshToken: {
    set: (newToken) => {
      refreshToken = newToken;
    },
    get: () => refreshToken,
  },
  accessToken: {
    set: (newToken) => {
      accessToken = newToken;
    },
    get: () => accessToken,
  },
  session: {
    set: (newToken) => {
      session = newToken;
    },
    get: () => session,
  },
  reset: () => {
    authManager.session.set();
    authManager.refreshToken.set();
    authManager.accessToken.set();
  },
};

const client = axios.create({
  baseURL: authUrl,
});

client.interceptors.request.use((config) => ({
  ...config,
  headers: {
    ...config.headers,
    Cookie: `
      ${session ? `session=${session};` : ''}
      ${refreshToken ? `refresh-token=${refreshToken};` : ''}
    `,
  },
}));

export { client, authManager };
