class SoundManager {
  constructor(audio) {
    this.sounds = [];
    for (let i = 0; i < 20; i++) {
      this.sounds.push(audio.cloneNode());
    }
    this.currentSound = 0;
  }

  play() {
      this.sounds[this.currentSound].play();
      this.currentSound = (this.currentSound + 1) % this.sounds.length;
  }
}
