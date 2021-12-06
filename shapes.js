// Two things matter.js needs

/*********************
 * 01 An engine *
 *********************/

/*********************
 * 02 A renderer *
 *********************/

// alias is a shortcut for making the code cleaner
const {
  Engine,
  Render,
  Bodies,
  World,
  MouseConstraint,
  Composite,
  Composites,
  Common,
} = Matter;

// Where the matter is being deployed
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

//Create shapes

const createShape = (x, y) => {
  const sides = Math.round(Common.random(1, 8), {
    options: {
      render: {
        fillStyle: ["red", "green", "blue", "pink", "orange"],
      },
    },
  });

  // round the edges of some bodies
  const chamfer = null;
  if (sides > 2 && Common.random() > 0.7) {
    chamfer = {
      radius: 10,
    };
  }

  switch (Math.round(Common.random(0, 1))) {
    case 0:
      if (Common.random() < 0.8) {
        return Bodies.rectangle(
          x,
          y,
          Common.random(25, 50),
          Common.random(25, 50),
          { chamfer: chamfer }
        );
      } else {
        return Bodies.rectangle(
          x,
          y,
          Common.random(80, 120),
          Common.random(25, 30),
          { chamfer: chamfer }
        );
      }
    case 1:
      return Bodies.polygon(x, y, sides, Common.random(25, 50), {
        chamfer: chamfer,
      });
  }
};

// Create the ragdoll
const ragdoll = createRagdoll(w / 2, 50);

// Big ball in middle

const bigBall = Bodies.circle(w / 2, h / 2, h / 5, {
  // shape options
  isStatic: true,
  render: {
    fillStyle: "#fff",
  },
});

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
  bigBall,
  ground,
  ceiling,
  leftWall,
  rightWall,
  mouseControl,
  ragdoll,
]);

// Shapes spawn based on mousemove or click
document.addEventListener("click", function (event) {
  const shape = createShape(event.pageX, event.pageY);
  World.add(engine.world, shape);
});

// run both the engine and the renderer

// change gravity
engine.gravity.y = 0.05;

Engine.run(engine);
Render.run(renderer);
