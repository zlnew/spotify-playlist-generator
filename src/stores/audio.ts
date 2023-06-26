import { defineStore } from 'pinia';

export interface ITrack {
  id: string;
  url: string;
}

export interface IAudioState {
  name: 'playing' | 'paused' | 'suspended' | 'playthrough' | 'ended';
  volume: number;
}

const defaultAudioState: IAudioState = {
  name: 'suspended',
  volume: 0.5,
};

const defaultTrackSettings: ITrack = {
  id: '',
  url: '',
};

export const useAudioStore = defineStore('audio', {
  state: () => ({
    state: defaultAudioState,
    track: defaultTrackSettings,
  }),
  actions: {
    toggleState(state: IAudioState['name'], volume: IAudioState['volume'] = defaultAudioState.volume) {
      this.state.name = state;
      this.state.volume = volume;
    },
    setVolume(value: number) {
      this.state.volume = value;
    },
    setTrack(track: ITrack) {
      this.track = track;
    },
  },
  getters: {}
});