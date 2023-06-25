import axios from "axios";
import querystring from "querystring";

const authBaseUrl = import.meta.env.VITE_AUTH_BASE_URL;
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
const redirectUri = import.meta.env.VITE_REDIRECT_URI;

interface IUserTopItems {
  type: 'artists' | 'tracks';
  time_range?: 'short_term' | 'medium_term' | 'long_term';
  limit?: number;
  offset?: number;
}

interface IRecommendations {
  limit?: number;
  seed_artists: string;
  seed_genres: string;
  seed_tracks: string;
}

interface IPlaylistStore {
  name?: string;
  public: boolean;
  description?: string;
}

interface IAddItemsToPlaylist {
  uris: string[];
}

export function authorizeAccount(): void {
  const state = generateRandomString(16);
  const scope = 'user-read-private user-read-email user-top-read playlist-modify-private playlist-modify-public';

  const queryParams = {
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: scope,
    state: state,
  };

  const authorizeUrl = `https://accounts.spotify.com/authorize?${querystring.stringify(queryParams)}`;
  window.location.href = authorizeUrl;
}

export async function getAccessToken(code: string): Promise<string> {
  const response = await axios.post(`${authBaseUrl}/api/token`, null, {
    params: {
      grant_type: 'authorization_code', code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    },
  });

  if (response.status !== 200) {
    throw new Error('Failed to retrieve access token');
  }

  return response.data.access_token;
}

export async function getUserProfile(accessToken: string): Promise<object> {
  const response = await axios.get(`${apiBaseUrl}/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (response.status !== 200) {
    throw new Error('Failed to retrieve user profile');
  }

  return response.data;
}

export async function getUserTopItems(
  accessToken:string,
  items: IUserTopItems = {
    type: 'artists',
    time_range:'medium_term',
    limit: 10,
    offset: 0,
  }
): Promise<object>
{ 
  const response = await axios.get(`${apiBaseUrl}/me/top/${items.type}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
    params: {
      time_range: items.time_range,
      limit: items.limit,
      offset: items.offset,
    },
  });

  if (response.status!== 200) {
    throw new Error('Failed to retrieve user top items');
  }

  return response.data;
}

export async function getRecommendations(
  accessToken: string,
  recommendations: IRecommendations = {
    limit: 20,
    seed_artists: '',
    seed_genres: '',
    seed_tracks: '',
  }
): Promise<object>
{
  const response = await axios.get(`${apiBaseUrl}/recommendations`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
    params: {
      limit: recommendations.limit,
      seed_artists: recommendations.seed_artists,
      seed_genres: recommendations.seed_genres,
      seed_tracks: recommendations.seed_tracks,
    },
  });

  if (response.status!== 200) {
    throw new Error('Failed to retrieve recommendations');
  }

  return response.data;
}

export async function createPlaylist(
  accessToken: string,
  userId: string,
  body: IPlaylistStore = {
    public: false,
  },
): Promise<Object>
{
  const response = await axios.post(`${apiBaseUrl}/users/${userId}/playlists`, body, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
  });

  if (response.status !== 201) {
    throw new Error('Failed to create playlist');
  }

  return response.data;
}

export async function addItemsToPlaylist(
  accessToken: string,
  playlistId: string,
  body: IAddItemsToPlaylist,
): Promise<string>
{
  const response = await axios.post(`${apiBaseUrl}/playlists/${playlistId}/tracks`, body, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
  });

  if (response.status!== 201) {
    throw new Error('Failed to add items to playlist');
  }

  return response.data;
}

function generateRandomString(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    randomString += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return randomString;
}
  