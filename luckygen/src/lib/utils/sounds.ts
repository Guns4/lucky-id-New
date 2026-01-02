export const SOUNDS = {
    // Short mechanical click
    TICK: 'https://cdn.freesound.org/previews/256/256113_3263906-lq.mp3',
    // Success chime/fanfare
    WIN: 'https://cdn.freesound.org/previews/270/270402_5123851-lq.mp3',
    // Elimination glitch/bonk
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
