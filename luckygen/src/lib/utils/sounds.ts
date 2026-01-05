/**
 * @deprecated This file is deprecated in favor of the Web Audio API implementation.
 * Use `@/hooks/useWheelSound` instead for synthesized audio (no MP3 files needed).
 * 
 * This file is kept for backward compatibility only.
 * Migration guide: Replace `soundManager.playTick()` with `playTick()` from useWheelSound hook.
 */

export const SOUNDS = {
    // Short mechanical click - using local file
    TICK: '/sounds/tick.mp3',
    // Success chime/fanfare - using local file
    WIN: '/sounds/win.mp3',
    // Elimination glitch/bonk (fallback to CDN if local file not available)
    ELIMINATE: 'https://cdn.freesound.org/previews/415/415209_5121236-lq.mp3'
};

class SoundManager {
    private enabled: boolean = true;
    private tickAudio: HTMLAudioElement | null = null;
    private winAudio: HTMLAudioElement | null = null;
    private eliminateAudio: HTMLAudioElement | null = null;

    constructor() {
        if (typeof window !== 'undefined') {
            this.tickAudio = new Audio(SOUNDS.TICK);
            this.winAudio = new Audio(SOUNDS.WIN);
            this.eliminateAudio = new Audio(SOUNDS.ELIMINATE);

            // Preload
            this.tickAudio.load();
            this.winAudio.load();
            this.eliminateAudio.load();

            // Adjust volume
            this.tickAudio.volume = 0.5;
        }
    }

    setEnabled(enabled: boolean) {
        this.enabled = enabled;
    }

    playTick() {
        if (!this.enabled || !this.tickAudio) return;
        // Clone to allow rapid fire overlap or simply reset time
        const sound = this.tickAudio.cloneNode() as HTMLAudioElement;
        sound.volume = 0.2;
        sound.play().catch(() => { }); // catch autoplay errors
    }

    playWin() {
        if (!this.enabled || !this.winAudio) return;
        this.winAudio.currentTime = 0;
        this.winAudio.play().catch(() => { });
    }

    playEliminate() {
        if (!this.enabled || !this.eliminateAudio) return;
        this.eliminateAudio.currentTime = 0;
        this.eliminateAudio.play().catch(() => { });
    }
}

export const soundManager = new SoundManager();
