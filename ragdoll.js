// Create body parts and assemble them into a ragdoll
const createRagdoll = (x, y, scale, options) => {
  scale = typeof scale === "undefined" ? 1 : scale;

  // Alias is a shortcut for making the code cleaner
  const { Bodies, Body, Composite, Constraint } = Matter;

  /*********************
   * Define Body Parts *
   *********************/

  const headOptions = Common.extend(
    {
      label: "head",
      collisionFilter: {
        group: Body.nextGroup(true),
      },
      friction: 0.0001,
      frictionAir: 0,
      restitution: 0.8,
      render: {
        fillStyle: "#2692F0",
        strokeStyle: "#eeeeee",
        lineWidth: 32,
      },
    },
    options
  );

  const chestOptions = Common.extend(
    {
      label: "chest",
      collisionFilter: {
        group: Body.nextGroup(true),
      },
      chamfer: {
        radius: [20 * scale, 20 * scale, 26 * scale, 26 * scale],
      },
      friction: 0.0001,
      frictionAir: 0,
      restitution: 0.8,
      render: {
        fillStyle: "#e1e1e1",
        strokeStyle: "gray",
        lineWidth: 5,
      },
    },
    options
  );

  const leftArmOptions = Common.extend(
    {
      label: "left-arm",
      collisionFilter: {
        group: Body.nextGroup(true),
      },
      chamfer: {
        radius: 10 * scale,
      },
      friction: 0.0001,
      frictionAir: 0,
      restitution: 0.8,
      render: {
        fillStyle: "#FFBC42",
      },
    },
    options
  );

  const leftLowerArmOptions = Common.extend({}, leftArmOptions, {
    render: {
      fillStyle: "#e1e1e1",
      strokeStyle: "gray",
    },
  });

  const rightArmOptions = Common.extend(
    {
      label: "right-arm",
      collisionFilter: {
        group: Body.nextGroup(true),
      },
      chamfer: {
        radius: 10 * scale,
      },
      render: {
        fillStyle: "#FFBC42",
      },
    },
    options
  );

  const rightLowerArmOptions = Common.extend({}, rightArmOptions, {
    render: {
      fillStyle: "#e1e1e1",
      strokeStyle: "gray",
    },
  });

  const leftLegOptions = Common.extend(
    {
      label: "left-leg",
      collisionFilter: {
        group: Body.nextGroup(true),
      },
      chamfer: {
        radius: 10 * scale,
      },
      render: {
        fillStyle: "#FFBC42",
      },
    },
    options
  );

  const leftLowerLegOptions = Common.extend({}, leftLegOptions, {
    render: {
      fillStyle: "#e1e1e1",
      strokeStyle: "gray",
    },
  });

  const rightLegOptions = Common.extend(
    {
      label: "right-leg",
      collisionFilter: {
        group: Body.nextGroup(true),
      },
      chamfer: {
        radius: 10 * scale,
      },
      render: {
        fillStyle: "#FFBC42",
      },
    },
    options
  );

  const rightLowerLegOptions = Common.extend({}, rightLegOptions, {
    render: {
      fillStyle: "#e1e1e1",
      strokeStyle: "gray",
    },
  });

  const head = Bodies.circle(x, y - 70, 25, headOptions);
  const chest = Bodies.rectangle(x, y, 55 * scale, 80 * scale, chestOptions);
  const rightUpperArm = Bodies.rectangle(
    x + 39 * scale,
    y - 15 * scale,
    20 * scale,
    40 * scale,
    rightArmOptions
  );
  const rightLowerArm = Bodies.rectangle(
    x + 39 * scale,
    y + 25 * scale,
    20 * scale,
    60 * scale,
    rightLowerArmOptions
  );
  const leftUpperArm = Bodies.rectangle(
    x - 39 * scale,
    y - 15 * scale,
    20 * scale,
    40 * scale,
    leftArmOptions
  );
  const leftLowerArm = Bodies.rectangle(
    x - 39 * scale,
    y + 25 * scale,
    20 * scale,
    60 * scale,
    leftLowerArmOptions
  );
  const leftUpperLeg = Bodies.rectangle(
    x - 20 * scale,
    y + 57 * scale,
    20 * scale,
    40 * scale,
    leftLegOptions
  );
  const leftLowerLeg = Bodies.rectangle(
    x - 20 * scale,
    y + 97 * scale,
    20 * scale,
    60 * scale,
    leftLowerLegOptions
  );
  const rightUpperLeg = Bodies.rectangle(
    x + 20 * scale,
    y + 57 * scale,
    20 * scale,
    40 * scale,
    rightLegOptions
  );
  const rightLowerLeg = Bodies.rectangle(
    x + 20 * scale,
    y + 97 * scale,
    20 * scale,
    60 * scale,
    rightLowerLegOptions
  );

  const chestToRightUpperArm = Constraint.create({
    bodyA: chest,
    pointA: {
      x: 24 * scale,
      y: -23 * scale,
    },
    pointB: {
      x: 0,
      y: -8 * scale,
    },
    bodyB: rightUpperArm,
    stiffness: 0.6,
    render: {
      visible: false,
    },
  });

  const chestToLeftUpperArm = Constraint.create({
    bodyA: chest,
    pointA: {
      x: -24 * scale,
      y: -23 * scale,
    },
    pointB: {
      x: 0,
      y: -8 * scale,
    },
    bodyB: leftUpperArm,
    stiffness: 0.6,
    render: {
      visible: false,
    },
  });

  const chestToLeftUpperLeg = Constraint.create({
    bodyA: chest,
    pointA: {
      x: -10 * scale,
      y: 30 * scale,
    },
    pointB: {
      x: 0,
      y: -10 * scale,
    },
    bodyB: leftUpperLeg,
    stiffness: 0.6,
    render: {
      visible: false,
    },
  });

  const chestToRightUpperLeg = Constraint.create({
    bodyA: chest,
    pointA: {
      x: 10 * scale,
      y: 30 * scale,
    },
    pointB: {
      x: 0,
      y: -10 * scale,
    },
    bodyB: rightUpperLeg,
    stiffness: 0.6,
    render: {
      visible: false,
    },
  });

  const upperToLowerRightArm = Constraint.create({
    bodyA: rightUpperArm,
    bodyB: rightLowerArm,
    pointA: {
      x: 0,
      y: 15 * scale,
    },
    pointB: {
      x: 0,
      y: -25 * scale,
    },
    stiffness: 0.6,
    render: {
      visible: false,
    },
  });

  const upperToLowerLeftArm = Constraint.create({
    bodyA: leftUpperArm,
    bodyB: leftLowerArm,
    pointA: {
      x: 0,
      y: 15 * scale,
    },
    pointB: {
      x: 0,
      y: -25 * scale,
    },
    stiffness: 0.6,
    render: {
      visible: false,
    },
  });

  const upperToLowerLeftLeg = Constraint.create({
    bodyA: leftUpperLeg,
    bodyB: leftLowerLeg,
    pointA: {
      x: 0,
      y: 20 * scale,
    },
    pointB: {
      x: 0,
      y: -20 * scale,
    },
    stiffness: 0.6,
    render: {
      visible: false,
    },
  });

  const upperToLowerRightLeg = Constraint.create({
    bodyA: rightUpperLeg,
    bodyB: rightLowerLeg,
    pointA: {
      x: 0,
      y: 20 * scale,
    },
    pointB: {
      x: 0,
      y: -20 * scale,
    },
    stiffness: 0.6,
    render: {
      visible: false,
    },
  });

  const headContraint = Constraint.create({
    bodyA: head,
    pointA: {
      x: 0,
      y: 25 * scale,
    },
    pointB: {
      x: 0,
      y: -35 * scale,
    },
    bodyB: chest,
    stiffness: 0.6,
    render: {
      visible: false,
    },
  });

  const legToLeg = Constraint.create({
    bodyA: leftLowerLeg,
    bodyB: rightLowerLeg,
    stiffness: 0.01,
    render: {
      visible: false,
    },
  });

  const person = Composite.create({
    bodies: [
      chest,
      head,
      leftLowerArm,
      leftUpperArm,
      rightLowerArm,
      rightUpperArm,
      leftLowerLeg,
      rightLowerLeg,
      leftUpperLeg,
      rightUpperLeg,
    ],
    constraints: [
      upperToLowerLeftArm,
      upperToLowerRightArm,
      chestToLeftUpperArm,
      chestToRightUpperArm,
      headContraint,
      upperToLowerLeftLeg,
      upperToLowerRightLeg,
      chestToLeftUpperLeg,
      chestToRightUpperLeg,
      legToLeg,
    ],
  });

  return person;
};
