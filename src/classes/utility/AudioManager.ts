import { SETTINGS } from "../ui.js";

export class AudioManager {
 private static readonly audioContext: AudioContext = new AudioContext();
 private static readonly audioBuffers: { [key: string]: AudioBuffer } = {}; // Or using Record<string, AudioBuffer>

 static async loadSounds() {
  const response = await fetch("../assets/data/audios.json");
  const json = await response.json();
  const audioFiles = json.audios;
  for (const file of audioFiles) {
   const { name, url } = file; // destructuring
   const response = await fetch(url);
   const arrayBuffer = await response.arrayBuffer();
   const audioBuffer = await AudioManager.audioContext.decodeAudioData(
    arrayBuffer
   );
   AudioManager.audioBuffers[name] = audioBuffer;
  }
 }

 static playSound(
  key: string,
  volume = 1,
  rate = 1,
  offset?: number,
  duration?: number
 ) {
  if (!AudioManager.audioBuffers[key] || !SETTINGS.sound) {
   console.warn(`Audio not found or sound disabled: ${key}`);
   return;
  }

  const bufferSource = AudioManager.audioContext.createBufferSource();
  bufferSource.buffer = AudioManager.audioBuffers[key];
  bufferSource.playbackRate.value = rate;

  const gainNode = AudioManager.audioContext.createGain();
  gainNode.gain.value = volume;

  bufferSource.connect(gainNode);
  gainNode.connect(AudioManager.audioContext.destination);

  bufferSource.start(0, offset);

  if (duration)
   bufferSource.stop(AudioManager.audioContext.currentTime + duration);
 }
}
