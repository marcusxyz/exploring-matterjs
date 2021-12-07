// Alias is a shortcut for making the code cleaner
const {
  Engine,
  Render,
  Bodies,
  World,
  MouseConstraint,
  Composite,
  Composites,
  Common,
  Runner,
  Events,
} = Matter;

// Two things matter.js needs

/*********************
 * 01 An engine *
 *********************/

const engine = Engine.create();

/*********************
 * 02 A renderer *
 *********************/

// Where the matter is being deployed
const sectionTag = document.querySelector("section.shapes");

// Canvas height and width
const w = window.innerWidth;
const h = window.innerHeight;

// Create renderer
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

/*********************
 * 03 Create your world *
 *********************/

// Add invisible walls to contain objects
const wallOptions = {
  isStatic: true,
  render: {
    visible: false,
  },
};

const ground = Bodies.rectangle(w / 2, h + 50, w + 100, 100, wallOptions);
const ceiling = Bodies.rectangle(w / 2, -50, w + 100, 100, wallOptions);
const leftWall = Bodies.rectangle(-50, h / 2, 100, h + 100, wallOptions);
const rightWall = Bodies.rectangle(w + 50, h / 2, 100, h + 100, wallOptions);

const bouncyCircles = (x, y) => {
  // Random colors to choose from
  const color = Common.choose([
    "#FBFBFB",
    "#58EDD8",
    "#2692F0",
    "#FEAC24",
    "#FF3C5C",
  ]);

  // Object settings
  const bouncyOptions = {
    frictionAir: 0,
    friction: 0.0001,
    restitution: 0.8,
    speed: 1,
    render: {
      fillStyle: color,
    },
  };

  // Randomize shapes
  switch (Math.round(Common.random(0, 1))) {
    case 0:
      if (Common.random() < 0.8) {
        return Bodies.rectangle(
          x,
          y,
          Common.random(20, 50),
          Common.random(20, 50),
          bouncyOptions
        );
      } else {
        return Bodies.rectangle(
          x,
          y,
          Common.random(80, 120),
          Common.random(20, 30),
          bouncyOptions
        );
      }
    case 1:
      return Bodies.polygon(
        x,
        y,
        Math.round(Common.random(4, 8)),
        Common.random(20, 50),
        bouncyOptions
      );
  }
};

// Create the ragdoll
const ragdoll = createRagdoll(w / 2, 50);

// Big ball in middle
const bigBall = Bodies.circle(w / 2, h / 2, h / 8, {
  // shape options
  isStatic: true,
  render: {
    sprite: {
      texture: "./images/earth.svg",
      xScale: 1.75,
      yScale: 1.75,
    },
  },
});

const circles = bouncyCircles(w / 2, 50);

const mouseControl = MouseConstraint.create(engine, {
  element: sectionTag,
  constraint: {
    render: {
      visible: false,
    },
  },
});

// Add bodies to world to see results
World.add(engine.world, [
  ceiling,
  rightWall,
  ground,
  leftWall,
  mouseControl,
  bigBall,
  ragdoll,
  bouncyCircles,
]);

// Shapes spawn based on mousemove or click
document.addEventListener("click", function (event) {
  // console.log("You've pressed the key:", event.key)
  const shape = bouncyCircles(event.pageX, event.pageY);
  World.add(engine.world, shape);
});

// Gravity options
engine.gravity.y = 0;
engine.gravity.x = 0;

Matter.Runner.run(engine);
Render.run(renderer);
