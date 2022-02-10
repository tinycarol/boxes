class Box {
  constructor(x, y, color, sound) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.sound = sound;
  }

  onSibling2Hover = (event) => {
    if (event.detail.hovering) {
      this.element.classList.add("sibling-2");
    } else {
      this.element.classList.remove("sibling-2");
    }
  };

  onSibling1Hover = (event) => {
    if (event.detail.hovering) {
      this.element.classList.add("sibling-1");
    } else {
      this.element.classList.remove("sibling-1");
    }
  };

  onHover(e) {
    e.preventDefault();
    this.sound.play();
    const event = new CustomEvent(`${this.x},${this.y}`, {
      detail: { hovering: true },
    });
    document.body.dispatchEvent(event);
  }

  onHoverOut(e) {
    e.preventDefault();
    const event = new CustomEvent(`${this.x},${this.y}`, {
      detail: { hovering: false },
    });
    document.body.dispatchEvent(event);
  }

  render() {
    const box = document.createElement("span");
    box.style.setProperty("--box-color", this.color);
    box.classList.add("box");
    box.dataset.x = this.x;
    box.dataset.y = this.y;
    box.addEventListener("mouseenter", this.onHover.bind(this));
    box.addEventListener("touchstart", this.onHover.bind(this));
    box.addEventListener("mouseleave", this.onHoverOut.bind(this));
    box.addEventListener("touchend", this.onHoverOut.bind(this));
    box.addEventListener("touchmove", this.onHoverOut.bind(this));
    this.element = box;
    this.setupListeners();
    return box;
  }

  setupListeners() {
    for (let i = -2; i <= 2; i++) {
      for (let j = -2; j <= 2; j++) {
        /**
         *  If the box is in a diagonal, it counts as one level further.
         * Makes the raised boxes look more circular.
         */
        const diff = Math.abs(i) == Math.abs(j) ? 1 : 0;
        switch (Math.max(Math.abs(i), Math.abs(j))) {
          case 2 - diff:
            document.body.addEventListener(
              `${this.x + i},${this.y + j}`,
              this.onSibling2Hover.bind(this)
            );
            break;
          case 1 - diff:
            document.body.addEventListener(
              `${this.x + i},${this.y + j}`,
              this.onSibling1Hover.bind(this)
            );
        }
      }
    }
  }
}
