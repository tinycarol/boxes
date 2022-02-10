const home = document.getElementById("home");
const button = document.querySelector("button");
const audio = document.querySelector("audio");

const start = () => {
  home.removeChild(button);
  const wrapper = document.createElement("div");
  home.appendChild(wrapper);
  wrapper.id = "wrapper";
  wrapper.classList.add("visible");

  let wrapperWidth = 0;
  let wrapperHeight = 0;
  let wrapperX = 0;
  let wrapperY = 0;

  const boxSize = 40;

  let boxes = [];

  const sound = new SoundManager(audio);

  const colors = [
    "red",
    "orange",
    "yellow",
    "chartreuse",
    "aqua",
    "blue",
    "blueviolet",
  ];

  const generateMobileEvents = () => {
    const prev = {};

    const onMobileHover = (e) => {
      e.preventDefault();
      const x = Math.floor((e.touches[0].pageX - wrapperX) / boxSize);
      const y = Math.floor((e.touches[0].pageY - wrapperY) / boxSize);

      if (prev.x !== x || prev.y !== y) {
        if (prev.x !== undefined) {
          const outEvent = new Event(`o${prev.x},${prev.y}`);
          document.body.dispatchEvent(outEvent);
        }

        const inEvent = new CustomEvent(`i${x},${y}`, {
          detail: { hovering: true, mobile: true },
        });

        document.body.dispatchEvent(inEvent);
      }

      prev.x = x;
      prev.y = y;
    };

    const onMobileHoverOut = () => {
      e.preventDefault();
      const event = new Event(`o${prev.x},${prev.y}`);
      document.body.dispatchEvent(event);
    };

    document.body.addEventListener("touchstart", onMobileHover);
    document.body.addEventListener("touchmove", onMobileHover);
    document.body.addEventListener("touchend", onMobileHoverOut);
  };

  const generateBoxes = () => {
    wrapper.innerHTML = "";
    boxes = [];

    for (let i = 0; (i + 1) * boxSize <= wrapperHeight; i++) {
      for (let j = 0; (j + 1) * boxSize <= wrapperWidth; j++) {
        const box = new Box(j, i, colors[(i + j) % colors.length], sound);
        boxes.push(box);
        wrapper.appendChild(box.render());
      }
    }

    generateMobileEvents();
  };

  const onWindowResize = () => {
    wrapperWidth = wrapper.offsetWidth;
    wrapperHeight = wrapper.offsetHeight;
    wrapperX = wrapper.offsetLeft;
    wrapperY = wrapper.offsetTop;
    generateBoxes();
  };
  onWindowResize();

  new ResizeObserver(onWindowResize).observe(wrapper);
};

button.addEventListener("click", start);
