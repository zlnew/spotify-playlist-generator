import { useAudioStore, type ITrack } from '@/stores/audio';

function updateUI_onAudioPlay(track_id: string) {
  const UI: any = UI_Elements(track_id);
  UI.track.classList.add('bg-primary/10');
  UI.titleTrack.classList.add('text-primary');
  UI.playButton.classList.add('hidden');
  UI.pauseButton.classList.remove('hidden');
}

function updateUI_onAudioPause(track_id: string) {
  const UI: any = UI_Elements(track_id);
  UI.track.classList.add('bg-primary/10');
  UI.titleTrack.classList.add('text-primary');
  UI.playButton.classList.remove('hidden');
  UI.pauseButton.classList.add('hidden');
}

function updateUI_onAudioSwitch(track_id: string) {
  const UI: any = UI_Elements(track_id);
  UI.track.classList.remove('bg-primary/10');
  UI.titleTrack.classList.remove('text-primary');
  UI.playButton.classList.remove('hidden');
  UI.pauseButton.classList.add('hidden');
}

export function updateUI_onAudioStop(track_id: string) {
  const UI: any = UI_Elements(track_id);
  UI.track.classList.remove('bg-primary/10');
  UI.titleTrack.classList.remove('text-primary');
  UI.playButton.classList.remove('hidden');
  UI.pauseButton.classList.add('hidden');
}

const UI_Elements = (track_id: string): Object => {
  const track = document.getElementById(`track${track_id}`) as HTMLElement;
  const titleTrack = document.getElementById(`title${track_id}`) as HTMLElement;
  const playButton = document.getElementById(`play${track_id}`) as HTMLElement;
  const pauseButton = document.getElementById(`pause${track_id}`) as HTMLElement;
  const audioEl = document.getElementById(track_id) as HTMLAudioElement;

  return { track, titleTrack, playButton, pauseButton, audioEl };
}

function playAudio(track: ITrack): void {
  const audioStore = useAudioStore();
  const settings = { id: track.id, url: track.url, };

  audioStore.setTrack(settings);
  audioStore.toggleState('playing');
  updateUI_onAudioPlay(track.id);
}

function pauseAudio(track: ITrack): void {
  const audioStore = useAudioStore();
  const settings = { id: track.id, url: track.url, };

  audioStore.setTrack(settings);
  audioStore.toggleState('paused');  
  updateUI_onAudioPause(track.id);
}

export function toggleAudioPlay(track: ITrack) {
  const audioStore = useAudioStore();

  if (audioStore.track.id && track.id !== audioStore.track.id && audioStore.state.name !== 'suspended') {
    updateUI_onAudioSwitch(audioStore.track.id);
    audioStore.toggleState('suspended');
  }

  if (audioStore.state.name === 'playing') {
    pauseAudio(track);
    return;
  }

  if (audioStore.state.name === 'suspended' || audioStore.state.name === 'paused') {
    playAudio(track);
    return;
  }
}

export function setAudioVolume(volume: number) {
  const audioStore = useAudioStore();
  audioStore.setVolume(volume);
}