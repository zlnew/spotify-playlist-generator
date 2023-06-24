import { ref, type Ref } from 'vue';

export let currentAudio: Ref<HTMLAudioElement | null> = ref(null);

export function play(audio: { id: string, src: string }, volume: number) {
  const track = document.getElementById(`track${audio.id}`) as HTMLElement;
  const titleTrack = document.getElementById(`title${audio.id}`) as HTMLElement;
  const playButton = document.getElementById(`play${audio.id}`) as HTMLElement;
  const pauseButton = document.getElementById(`pause${audio.id}`) as HTMLElement;
  const audioEl = document.getElementById(audio.id) as HTMLAudioElement;

  track.classList.add('bg-primary/10');
  titleTrack.classList.add('text-primary');
  playButton.classList.add('hidden');
  pauseButton.classList.remove('hidden');

  if (currentAudio.value !== null) {
    pause(currentAudio.value.id);
  }

  audioEl.play();
  audioEl.volume = volume;
  currentAudio.value = audioEl;

  audioEl.addEventListener('ended', () => {
    track.classList.remove('bg-primary/10');
    titleTrack.classList.remove('text-primary');
    playButton.classList.remove('hidden');
    pauseButton.classList.add('hidden');
    currentAudio.value = null;
  });
}

export function pause(audioID: string) {
  const track = document.getElementById(`track${audioID}`) as HTMLElement;
  const titleTrack = document.getElementById(`title${audioID}`) as HTMLElement;
  const playButton = document.getElementById(`play${audioID}`) as HTMLElement;
  const pauseButton = document.getElementById(`pause${audioID}`) as HTMLElement;
  const audioEl = document.getElementById(audioID) as HTMLAudioElement;

  if (track) {
    track.classList.remove('bg-primary/10');
    titleTrack.classList.remove('text-primary');
    playButton.classList.remove('hidden');
    pauseButton.classList.add('hidden');
  
    audioEl.pause();
    currentAudio.value = null;
  }
}

const UI_Elements = (track_id): Object => {
  //
  return elements;
}

export function toggleAudioPlay(track: Object) {
  //
}

export function updateUI_onAudioPlay() {
  //
} 

export function updateUI_onAudioSwitch() {
  //
}

export function updateUI_onAudioStop() {
  //
}

export function setAudioVolume(volume: number) {
  const audioStore = useAudioStore();
  audioStore.state.volume = volume:
}