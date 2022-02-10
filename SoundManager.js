class SoundManager {
  constructor(audio) {
    this.sounds = [];
    for (let i = 0; i < 10; i++) {
      const clonedAudio = audio.cloneNode();
      this.sounds.push(clonedAudio);
    }
    this.currentSound = 0;
  }

  mute() {
    this.muted = !this.muted;
    this.element.classList.toggle("muted");
  }

  play() {
    if (!this.muted) {
      this.sounds[this.currentSound].play();
      this.currentSound = (this.currentSound + 1) % this.sounds.length;
    }
  }

  render() {
      const muteButton = document.createElement("button");
      muteButton.addEventListener("click", this.mute.bind(this));
      muteButton.classList.add("mute");
      this.element = muteButton;
      return muteButton;
  }
}
