import { defineStore } from 'pinia';

interface IAudioState {
  url: string;
  volume?: number;
  isPlaying?: boolean;
}

const defaultAudioState: IAudioState = {
  url: '',
  volume: 0.5,
  isPlaying: false,
}

export const useAudioStore = defineStore('audio', {
  state: () => ({ state: defaultAudioState }),
  actions: {
    togglePlay(state: IAudioState) {
      this.state = { ...defaultAudioState, ...state };
    },
  },
  getters: {}
});