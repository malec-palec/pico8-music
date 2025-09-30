/**
 * PICO-8 Audio Player TypeScript Declarations
 * 
 * A JavaScript library for playing PICO-8 music and sound effects in web browsers.
 * This library can parse and play the audio data from PICO-8 cartridges.
 * 
 * Usage:
 * ```typescript
 * import 'pico8-music';
 * 
 * const player = new Pico8(sfxData, musicData);
 * const sound = player.sfx(0);
 * ```
 */

/**
 * Represents an audio source that can be stopped.
 * This is typically an AudioBufferSourceNode from the Web Audio API.
 */
export interface Pico8AudioSource {
  /**
   * Stops the audio playback immediately.
   */
  stop(): void;
  
  /**
   * The audio buffer containing the sound data.
   */
  readonly buffer: AudioBuffer | null;
  
  /**
   * Whether the audio should loop.
   */
  loop: boolean;
  
  /**
   * The loop start time in seconds.
   */
  loopStart: number;
  
  /**
   * The loop end time in seconds.
   */
  loopEnd: number;
  
  /**
   * Connects this audio source to another audio node.
   */
  connect(destination: AudioNode): AudioNode;
  
  /**
   * Disconnects this audio source from all connected nodes.
   */
  disconnect(): void;
}

/**
 * Main PICO-8 audio player class.
 * Handles parsing and playback of PICO-8 sound effects and music.
 */
interface Pico8Instance {
  /**
   * Plays a sound effect by index.
   * 
   * @param index - The sound effect index (0-63)
   * @returns An audio source that can be used to control playback
   * 
   * @example
   * ```typescript
   * const audioSource = pico8.sfx(0);
   * // Later, stop the sound
   * audioSource.stop();
   * ```
   */
  sfx(index: number): Pico8AudioSource;

  /**
   * Plays music starting from the specified pattern.
   * 
   * @param index - The starting music pattern index
   * @returns An audio source that can be used to control playback
   * 
   * @example
   * ```typescript
   * const musicSource = pico8.music(0);
   * // Later, stop the music
   * musicSource.stop();
   * ```
   */
  music(index: number): Pico8AudioSource;

  /**
   * The Web Audio API AudioContext used by this player.
   * Can be used for advanced audio operations and integration with other Web Audio API nodes.
   * 
   * @example
   * ```typescript
   * // Connect to a gain node for volume control
   * const gainNode = pico8.ctx.createGain();
   * gainNode.gain.value = 0.5;
   * gainNode.connect(pico8.ctx.destination);
   * ```
   */
  readonly ctx: AudioContext;
}

/**
 * Pico8 constructor interface
 */
interface Pico8Constructor {
  /**
   * Creates a new PICO-8 audio player instance.
   * 
   * @param sfx - String containing PICO-8 sound effect data (newline-separated hex values)
   * @param music - String containing PICO-8 music pattern data (newline-separated hex values)
   * 
   * @example
   * ```typescript
   * const sfxData = "001000000f0500e0500e0500e0500e0500e0500e0500e0500e0500e0500e0500e0500e050";
   * const musicData = "00 41424344";
   * const pico8 = new Pico8(sfxData, musicData);
   * ```
   */
  new (sfx: string, music: string): Pico8Instance;
}

/**
 * Global declarations for browser usage.
 * The library attaches Pico8 to the global scope when imported.
 */
declare global {
  /**
   * Global Pico8 constructor function.
   * Available after importing 'pico8-music'.
   */
  const Pico8: Pico8Constructor;
  
  /**
   * Window interface extension to include Pico8.
   */
  interface Window {
    Pico8: Pico8Constructor;
  }
}