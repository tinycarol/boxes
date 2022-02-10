class Box {
  constructor(x, y, eventHandler, color) {
    this.x = x;
    this.y = y;
    this.eventHandler = eventHandler;
    this.color = color;

    this.sound = new Audio("plop.m4a");
    this.sound.volume = 0.5;
    this.sound.load();
    this.sound.addEventListener("canplaythrough", () => {
      this.soundLoaded = true;
    });
    this.soundLoaded = false;

    for (let i = -2; i <= 2; i++) {
      for (let j = -2; j <= 2; j++) {
        /**
         *  If the box is in a diagonal, it counts as one level further.
         * Makes the raised boxes look more circular.
         */
        const diff = Math.abs(i) == Math.abs(j) ? 1 : 0;
        switch (Math.max(Math.abs(i), Math.abs(j))) {
          case 2 - diff:
            eventHandler.subscribe(
              `${this.x + i},${this.y + j}`,
              this.onSibling2Hover.bind(this)
            );
            break;
          case 1 - diff:
            eventHandler.subscribe(
              `${this.x + i},${this.y + j}`,
              this.onSibling1Hover.bind(this)
            );
        }
      }
    }
  }

  onSibling2Hover = (hovering) => {
    if (hovering) {
      this.element.classList.add("sibling-2");
    } else {
      this.element.classList.remove("sibling-2");
    }
  };

  onSibling1Hover = (hovering) => {
    if (hovering) {
      this.element.classList.add("sibling-1");
    } else {
      this.element.classList.remove("sibling-1");
    }
  };

  onHover() {
    if (this.soundLoaded) {
      this.sound.play();
    }
    this.eventHandler.emit(`${this.x},${this.y}`, true);
  }

  onHoverOut() {
    this.eventHandler.emit(`${this.x},${this.y}`, false);
  }

  render() {
    const box = document.createElement("span");
    box.style.setProperty("--box-color", this.color);
    box.classList.add("box");
    box.dataset.x = this.x;
    box.dataset.y = this.y;
    box.addEventListener("mouseenter", this.onHover.bind(this));
    box.addEventListener("mouseleave", this.onHoverOut.bind(this));
    this.element = box;
    return box;
  }
}
