import { useLocalStorage, type RemovableRef } from "@vueuse/core";
import { defineStore } from "pinia";

interface ISpotify {
  accessToken: string;
  userProfile: Object;
  vibeType?: string;
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
  accessToken: '',
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
    spotify: useLocalStorage('spotifyState', spotify),
  }),
  actions: {
    connect(accessToken: string) {
      this.spotify.accessToken = accessToken;
    },
    disconnect() {
      this.spotify.accessToken = '';
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
    vibeType(vibeType: string) {
      this.spotify.vibeType = vibeType;
    },
    loading(isLoading: boolean) {
      this.spotify.isLoading = isLoading;
    },
  },
  getters: {
    getAccessToken(state) {
      return state.spotify.accessToken;
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