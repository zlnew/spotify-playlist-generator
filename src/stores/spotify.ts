import { type IVibe } from "@/services/vibesService";
import { useSessionStorage } from "@vueuse/core";
import { defineStore } from "pinia";

export interface ISpotify {
  auth: {
    accessToken: string,
    refreshToken: string,
    expiresIn: number,
  };
  userProfile: Object;
  vibeType?: IVibe['type'];
  recommendations: {
    seed_artists: Array<string>;
    seed_genres: Array<string>;
    seed_tracks: Array<string>;
    tracks: Array<string>;
  };
  playlist: Object;
  isLoading: boolean;
};

const spotify: ISpotify = {
  auth: {
    accessToken: '',
    refreshToken: '',
    expiresIn: 0,
  },
  userProfile: {},
  recommendations: {
    seed_artists: [],
    seed_genres: [],
    seed_tracks: [],
    tracks: [],
  },
  playlist: {},
  isLoading: false,
};

export const useSpotifyStore = defineStore('spotify', {
  state: () => ({
    spotify: useSessionStorage('spotifyState', spotify),
  }),
  actions: {
    connect(auth: ISpotify['auth']) {
      this.spotify.auth = auth;
    },
    disconnect() {
      this.spotify.auth = spotify.auth;
      this.spotify.userProfile = {};
    },
    user(userProfile: Object) {
      this.spotify.userProfile = userProfile;
    },
    recommendations(recommendations: Object) {
      this.spotify.recommendations = { ...spotify.recommendations, ...recommendations };
    },
    playlist(tracks: Object) {
      this.spotify.playlist = tracks;
    },
    vibeType(vibeType: IVibe['type']) {
      this.spotify.vibeType = vibeType;
    },
    loading(isLoading: boolean) {
      this.spotify.isLoading = isLoading;
    },
  },
  getters: {
    getAuth(state) {
      return state.spotify.auth;
    },
    getUserProfile(state) {
      return state.spotify.userProfile;
    },
    getRecommendations(state) {
      return state.spotify.recommendations;
    },
    getPlaylist(state) {
      return state.spotify.playlist;
    },
    getVibeType(state) {
      return state.spotify.vibeType;
    },
    isLoading(state) {
      return state.spotify.isLoading;
    },
  },
});