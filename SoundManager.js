class SoundManager {
  constructor(audio) {
    this.sounds = [];
    for (let i = 0; i < 10; i++) {
      const clonedAudio = audio.cloneNode();
      this.sounds.push(clonedAudio);
    }
    this.currentSound = 0;
  }

  play() {
    this.sounds[this.currentSound].play();
    this.currentSound = (this.currentSound + 1) % this.sounds.length;
  }
}
