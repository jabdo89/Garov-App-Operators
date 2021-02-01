import Constants from 'expo-constants';
import urljoin from 'url-join';

const { manifest } = Constants;

let serverUrl;

if (manifest.releaseChannel) {
  if (manifest.releaseChannel.indexOf('prod') !== -1) {
    serverUrl = 'https://api.avviare.site/';
  } else if (manifest.releaseChannel.indexOf('staging') !== -1) {
    serverUrl = 'https://api.staging.avviare.site/';
  }
} else {
  serverUrl = `http://${manifest.debuggerHost.split(':').shift()}:7500`;
}

const apiUrl = urljoin(serverUrl, 'graphql');
const authUrl = urljoin(serverUrl, 'auth');

export { apiUrl, authUrl };
