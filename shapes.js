// Two things matter needs

//*******************************
// 01 An engine

//*******************************
// 02 A renderer

// alias is a shortcut for making the code cleaner
// const Engine = Matter.Engine;
// const Render = Matter.Render;
const { Engine, Render, Bodies, World } = Matter;

// Where is matter being deployed
const sectionTag = document.querySelector("section.shapes");

// Canvas height and width
const w = window.innerWidth;
const h = window.innerHeight;
const engine = Engine.create();
const renderer = Render.create({
  element: sectionTag,
  engine: engine,
  options: {
    height: h,
    width: w,
    background: "#000",
    wireframes: false,
    pixelRatio: window.devicePixelRatio,
  },
});

// Create shapes
const createShape = (x, y) => {
  return Bodies.circle(x, y, 20 + 1 * Math.random());
};

// When we click the page add a new shape
document.addEventListener("mousemove", function (event) {
  const shape = createShape(event.pageX, event.pageY);
  World.add(engine.world, shape);
});

// run both the engine and the renderer

Engine.run(engine);
Render.run(renderer);
