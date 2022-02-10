const home = document.getElementById("home");
const button = document.querySelector("button");

const start = () => {
  home.removeChild(button);
  const wrapper = document.createElement("div");
  home.appendChild(wrapper);
  wrapper.id = "wrapper";
  wrapper.classList.add("visible");

  let wrapperWidth = 0;
  let wrapperHeight = 0;

  const boxSize = 40;

  let boxes = [];
  const eventHandler = new EventHandler();

  const colors = [
    "red",
    "orange",
    "yellow",
    "chartreuse",
    "aqua",
    "blue",
    "blueviolet",
  ];

  const generateBoxes = () => {
    eventHandler.cleanUp();
    wrapper.innerHTML = "";
    boxes = [];

    for (let i = 0; (i + 1) * boxSize <= wrapperHeight; i++) {
      for (let j = 0; (j + 1) * boxSize <= wrapperWidth; j++) {
        const box = new Box(
          j,
          i,
          eventHandler,
          colors[(i + j) % colors.length]
        );
        boxes.push(box);
        wrapper.appendChild(box.render());
      }
    }
  };

  const onWindowResize = () => {
    wrapperWidth = wrapper.offsetWidth;
    wrapperHeight = wrapper.offsetHeight;
    generateBoxes();
  };
  onWindowResize();

  new ResizeObserver(onWindowResize).observe(wrapper);
};

button.addEventListener("click", start);
