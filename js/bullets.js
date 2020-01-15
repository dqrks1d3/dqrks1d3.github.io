let bullet = [];

const b = {
  dmgScale: null, //scales all gun damage from momentum, but not raw .dmg //set in levels.setDifficulty
  gravity: 0.0006, //most other bodies have   gravity = 0.001
  //variables use for gun mod upgrades
  modCount: null,
  modFireRate: null,
  modExplosionRadius: null,
  modBulletSize: null,
  modEnergySiphon: null,
  modHealthDrain: null,
  modNoAmmo: null,
  isModBulletsLastLonger: null,
  isModImmortal: null,
  modSpores: null,
  isModImmuneExplosion: null,
  isModDroneOnDamage: null,
  modExtraDmg: null,
  annihilation: null,
  modRecursiveHealing: null,
  modSquirrelFx: null,
  isModCrit: null,
  isModBayesian: null,
  isModLowHealthDmg: null,
  isModFarAwayDmg: null,
  isModEntanglement: null,
  isModMassEnergy: null,
  isModFourOptions: null,
  modLaserBotCount: null,
  modNailBotCount: null,
  modCollisionImmuneCycles: null,
  modBlockDmg: null,
  isModPiezo: null,
  setModDefaults() {
    b.modCount = 0;
    b.modFireRate = 1;
    b.modExplosionRadius = 1;
    b.isModImmuneExplosion = false;
    b.modBulletSize = 1;
    b.isModDroneOnDamage = false;
    b.modEnergySiphon = 0;
    b.modHealthDrain = 0;
    b.modNoAmmo = 0;
    b.isModBulletsLastLonger = 1;
    b.isModImmortal = false;
    b.modSpores = 0;
    b.modExtraDmg = 0;
    b.isModAnnihilation = false;
    b.modRecursiveHealing = 1;
    b.modSquirrelFx = 1;
    b.isModCrit = false;
    b.isModBayesian = 0;
    b.isModFourOptions = false;
    b.isModLowHealthDmg = false;
    b.isModFarAwayDmg = false;
    b.isModEntanglement = false;
    b.isModMassEnergy = false;
    b.modLaserBotCount = 0;
    b.modNailBotCount = 0;
    b.modCollisionImmuneCycles = 30;
    b.modBlockDmg = 0;
    b.isModPiezo = false;
    mech.Fx = 0.015;
    mech.jumpForce = 0.38;
    mech.maxHealth = 1;
    mech.fieldEnergyMax = 1;
    for (let i = 0; i < b.mods.length; i++) {
      b.mods[i].count = 0
    }
  },
  mods: [{
      name: "depleted uranium rounds", //0
      description: `your <strong>bullets</strong> are +11% larger<br>increased mass and physical <strong class='color-d'>damage</strong>`,
      count: 0,
      maxCount: 4,
      effect() {
        b.modBulletSize += 0.11
      }
    },
    {
      name: "fluoroantimonic acid", //1
      description: "each <strong>bullet</strong> does extra chemical <strong class='color-d'>damage</strong><br>instant damage, unaffected by momentum",
      maxCount: 4,
      count: 0,
      effect() {
        b.modExtraDmg += 0.25
        game.playerDmgColor = "rgba(0,80,80,0.9)"
      }
    },
    {
      name: "fracture analysis", //2
      description: "<strong>5x</strong> physical <strong class='color-d'>damage</strong> to unaware enemies<br><em>unaware enemies don't have a health bar</em>",
      maxCount: 1,
      count: 0,
      effect() {
        b.isModCrit = true;
      }
    },
    {
      name: "kinetic bombardment", //3
      description: "do up to 33% more <strong class='color-d'>damage</strong> at a distance<br><em>increase starts at about 6 steps away</em>",
      maxCount: 1,
      count: 0,
      effect() {
        b.isModFarAwayDmg = true; //used in mob.damage()
        // game.drawList.push({ //draw range
        //   //add dmg to draw queue
        //   x: player.position.x,
        //   y: player.position.y,
        //   radius: 3000,
        //   color: "rgba(255,0,0,0.05)",
        //   time: 120
        // });
        // game.drawList.push({ //draw range
        //   //add dmg to draw queue
        //   x: player.position.x,
        //   y: player.position.y,
        //   radius: 500,
        //   color: "rgba(0,0,0,0.2)",
        //   time: 120
        // });
      }
    },
    {
      name: "quasistatic equilibrium", //4
      description: "do extra <strong class='color-d'>damage</strong> at low health<br><em>up to 50% increase when near death</em>",
      maxCount: 1,
      count: 0,
      effect() {
        b.isModLowHealthDmg = true; //used in mob.damage()
      }
    },
    {
      name: "high explosives", //15
      description: "the radius of <strong class='color-e'>explosions</strong> are +20% <strong>larger</strong><br>immune to <strong>harm</strong> from <strong class='color-e'>explosions</strong>",
      maxCount: 4,
      count: 0,
      effect: () => {
        b.modExplosionRadius += 0.2;
        b.isModImmuneExplosion = true;
      }
    },
    {
      name: "auto-loading heuristics", //5
      description: "your <strong>delay</strong> after firing is +12% <strong>shorter</strong>",
      maxCount: 4,
      count: 0,
      effect() {
        b.modFireRate *= 0.88
      }
    },
    {
      name: "desublimated ammunition", //6
      description: "use 50% less <strong>ammo</strong> when <strong>crouching</strong>",
      maxCount: 1,
      count: 0,
      effect() {
        b.modNoAmmo = 1
      }
    },
    {
      name: "Lorentzian topology", //7
      description: "your <strong>bullets</strong> last +33% <strong>longer</strong>",
      maxCount: 4,
      count: 0,
      effect() {
        b.isModBulletsLastLonger += 0.33
      }
    },
    {
      name: "zoospore vector", //8
      description: "enemies discharge <strong style='letter-spacing: 2px;'>spores</strong> on <strong>death</strong><br>+11% chance",
      maxCount: 4,
      count: 0,
      effect() {
        b.modSpores += 0.11;
        for (let i = 0; i < 10; i++) {
          b.spore(player) //spawn drone
        }
      }
    },
    {
      name: "laser-bot", //10
      description: "a bot <strong>protects</strong> the space around you<br>uses a <strong>short range</strong> laser that drains <strong class='color-f'>energy</strong>",
      maxCount: 4,
      count: 0,
      effect() {
        b.modLaserBotCount++;
        b.laserBot();
      }
    },
    {
      name: "nail-bot", //11
      description: "a bot <strong>protects</strong> the space around you<br>fires a <strong>nail</strong> at targets in range",
      maxCount: 4,
      count: 0,
      effect() {
        b.modNailBotCount++;
        b.nailBot();
      }
    },
    {
      name: "ablative synthesis", //9
      description: "rebuild your broken parts as <strong>drones</strong><br>chance to occur after being <strong>harmed</strong>",
      maxCount: 1,
      count: 0,
      effect() {
        b.isModDroneOnDamage = true;
        for (let i = 0; i < 3; i++) {
          b.drone() //spawn drone
        }
      }
    },
    {
      name: "bremsstrahlung radiation", //13
      description: "when your <strong>field blocks</strong> it also does <strong class='color-d'>damage</strong>",
      maxCount: 4,
      count: 0,
      effect() {
        b.modBlockDmg += 0.7 //if you change this value also update the for loop in the electricity graphics in mech.pushMass
      }
    },
    {
      name: "entanglement", //16
      description: "using your first gun reduces <strong>harm</strong><br>scales by <strong>10%</strong> for each gun in your inventory",
      maxCount: 1,
      count: 0,
      effect() {
        b.isModEntanglement = true
      }
    },
    {
      name: "squirrel-cage rotor", //27
      description: "<strong>jump</strong> higher and <strong>move</strong> faster<br>reduced <strong>harm</strong> from <strong>falling</strong> ",
      maxCount: 1,
      count: 0,
      effect() { // good with melee builds, content skipping builds
        b.modSquirrelFx = 1.2;
        mech.Fx = 0.015 * b.modSquirrelFx;
        mech.jumpForce = 0.38 * 1.1;
      }
    },
    {
      name: "Pauli exclusion", //12
      description: "unable to <strong>collide</strong> with enemies for +2 seconds<br>activates after being <strong>harmed</strong> from a collision",
      maxCount: 1,
      count: 0,
      effect() {
        b.modCollisionImmuneCycles += 120;
        mech.collisionImmune = mech.cycle + b.modCollisionImmuneCycles; //player is immune to collision damage for 30 cycles
      }
    },
    {
      name: "annihilation", //14
      description: "after <strong>touching</strong> enemies, they are annihilated",
      maxCount: 1,
      count: 0,
      effect() {
        b.isModAnnihilation = true
      }
    },
    {
      name: "piezoelectricity", //17
      description: "<strong>colliding</strong> with enemies fills your <strong class='color-f'>energy</strong>",
      maxCount: 1,
      count: 0,
      effect() {
        b.isModPiezo = true;
        mech.fieldMeter = mech.fieldEnergyMax;
      }
    },
    {
      name: "energy conservation", //18
      description: "gain <strong class='color-f'>energy</strong> proportional to <strong class='color-d'>damage</strong> done",
      maxCount: 4,
      count: 0,
      effect() {
        b.modEnergySiphon += 0.15;
        mech.fieldMeter = mech.fieldEnergyMax
      }
    },
    {
      name: "entropy exchange", //19
      description: "<strong class='color-h'>heal</strong> proportional to <strong class='color-d'>damage</strong> done",
      maxCount: 4,
      count: 0,
      effect() {
        b.modHealthDrain += 0.015;
      }
    },
    {
      name: "overcharge", //20
      description: "charge <strong class='color-f'>energy</strong> <strong>+33%</strong> beyond your <strong>maximum</strong>",
      maxCount: 4,
      count: 0,
      effect() {
        mech.fieldEnergyMax += 0.33
        mech.fieldMeter += 0.33
      }
    },
    {
      name: "supersaturation", //21
      description: "<strong class='color-h'>heal</strong> <strong>+33%</strong> beyond your <strong>max health</strong>",
      maxCount: 4,
      count: 0,
      effect() {
        mech.maxHealth += 0.33
        mech.addHealth(0.33)
      }
    },
    {
      name: "recursive healing", //22
      description: "<strong class='color-h'>healing</strong> power ups trigger an extra time.",
      maxCount: 4,
      count: 0,
      effect() {
        b.modRecursiveHealing += 1
      }
    },
    {
      name: "mass-energy equivalence", //23
      description: "convert the mass of <strong>power ups</strong> into <strong class='color-f'>energy</strong><br>power ups fill your <strong class='color-f'>energy</strong> and <strong class='color-h'>heal</strong> for +5%",
      maxCount: 1,
      count: 0,
      effect: () => {
        b.isModMassEnergy = true // used in mech.usePowerUp
        mech.fieldMeter = mech.fieldEnergyMax
      }
    },
    {
      name: "quantum immortality", //28
      description: "after <strong>dying</strong>, continue in an <strong>alternate reality</strong><br><em>guns, ammo, field, and mods are randomized</em>",
      maxCount: 1,
      count: 0,
      effect() {
        b.isModImmortal = true;
      }
    },
    {
      name: "+1 cardinality", //24
      description: "one extra <strong>choice</strong> when selecting <strong>power ups</strong>",
      maxCount: 1,
      count: 0,
      effect: () => {
        b.isModFourOptions = true;
      }
    },
    {
      name: "Bayesian inference", //25
      description: "<strong>20%</strong> chance for double <strong>power ups</strong> to drop<br>one fewer <strong>choice</strong> when selecting <strong>power ups</strong>",
      maxCount: 1,
      count: 0,
      effect: () => {
        b.isModBayesian = 0.20;
      }
    },
    {
      name: "Born rule", //26
      description: "<strong>remove</strong> all current <strong class='color-m'>mods</strong><br>spawn new <strong class='color-m'>mods</strong> to replace them",
      maxCount: 1,
      count: 0,
      effect: () => {
        for (let i = 0; i < b.modCount; i++) { // spawn new mods
          powerUps.spawn(mech.pos.x, mech.pos.y, "mod");
        }
        b.setModDefaults(); // remove all mods
        //have state is checked in mech.death()
      }
    },
  ],
  giveMod(index = 'random') {
    if (index === 'random') {
      let options = [];
      for (let i = 0; i < b.mods.length; i++) {
        if (b.mods[i].count < b.mods[i].maxCount) options.push(i);
      }

      // give a random mod from the mods I don't have
      if (options.length > 0) {
        let newMod = options[Math.floor(Math.random() * options.length)]
        b.giveMod(newMod)
      }
    } else {
      b.mods[index].effect(); //give specific mod
      b.mods[index].count++
      b.modCount++ //used in power up randomization
      game.updateModHUD();
    }
  },
  activeGun: null, //current gun in use by player
  inventoryGun: 0,
  inventory: [], //list of what guns player has  // 0 starts with basic gun
  fire() {
    if (game.mouseDown && mech.fireCDcycle < mech.cycle && (!(keys[32] || game.mouseDownRight) || mech.fieldFire) && b.inventory.length) {
      if (b.guns[b.activeGun].ammo > 0) {
        b.guns[b.activeGun].fire();
        if (b.modNoAmmo && mech.crouch) {
          if (b.modNoAmmo % 2) {
            b.guns[b.activeGun].ammo--;
            game.updateGunHUD();
          }
          b.modNoAmmo++ //makes the no ammo toggle off and on
        } else {
          b.guns[b.activeGun].ammo--;
          game.updateGunHUD();
        }
      } else {
        mech.fireCDcycle = mech.cycle + 30; //cooldown
        // game.makeTextLog("<div style='font-size:140%;'>NO AMMO</div><strong class = 'box'>E</strong> / <strong class = 'box'>Q</strong>", 200);
        game.replaceTextLog = true;
        game.makeTextLog("<div style='font-size:140%;'>NO AMMO</div> <p style='font-size:90%;'><strong>Q</strong>, <strong>E</strong>, and <strong>mouse wheel</strong> change weapons</p>", 200);
      }
      if (mech.holdingTarget) {
        mech.drop();
      }
    }
  },
  bulletActions() { //run in main loop
    //remove bullet if at end cycle for that bullet
    let i = bullet.length;
    while (i--) {
      if (bullet[i].endCycle < game.cycle) {
        bullet[i].onEnd(i); //some bullets do stuff on end
        if (bullet[i]) {
          Matter.World.remove(engine.world, bullet[i]);
          bullet.splice(i, 1);
        } else {
          break; //if bullet[i] doesn't exist don't complete the for loop, because the game probably reset
        }
      }
    }

    //draw
    ctx.beginPath();
    for (let i = 0, len = bullet.length; i < len; i++) {
      let vertices = bullet[i].vertices;
      ctx.moveTo(vertices[0].x, vertices[0].y);
      for (let j = 1; j < vertices.length; j += 1) {
        ctx.lineTo(vertices[j].x, vertices[j].y);
      }
      ctx.lineTo(vertices[0].x, vertices[0].y);
    }
    ctx.fillStyle = "#000";
    ctx.fill();

    //do bullet things
    for (let i = 0, len = bullet.length; i < len; i++) {
      bullet[i].do();
    }
  },
  fireProps(cd, speed, dir, me) {
    mech.fireCDcycle = mech.cycle + Math.floor(cd * b.modFireRate); // cool down
    Matter.Body.setVelocity(bullet[me], {
      x: mech.Vx / 2 + speed * Math.cos(dir),
      y: mech.Vy / 2 + speed * Math.sin(dir)
    });
    World.add(engine.world, bullet[me]); //add bullet to world
  },
  fireAttributes(dir, rotate = true) {
    if (rotate) {
      return {
        // density: 0.0015,			//frictionAir: 0.01,			//restitution: 0,
        angle: dir,
        friction: 0.5,
        frictionAir: 0,
        dmg: 0, //damage done in addition to the damage from momentum
        classType: "bullet",
        collisionFilter: {
          category: cat.bullet,
          mask: cat.map | cat.body | cat.mob | cat.mobBullet | cat.mobShield
        },
        minDmgSpeed: 10,
        onDmg() {}, //this.endCycle = 0  //triggers despawn
        onEnd() {}
      };
    } else {
      return {
        // density: 0.0015,			//frictionAir: 0.01,			//restitution: 0,
        inertia: Infinity, //prevents rotation
        angle: dir,
        friction: 0.5,
        frictionAir: 0,
        dmg: 0, //damage done in addition to the damage from momentum
        classType: "bullet",
        collisionFilter: {
          category: cat.bullet,
          mask: cat.map | cat.body | cat.mob | cat.mobBullet | cat.mobShield
        },
        minDmgSpeed: 10,
        onDmg() {}, //this.endCycle = 0  //triggers despawn
        onEnd() {}
      };
    }
  },
  muzzleFlash(radius = 10) {
    ctx.fillStyle = "#fb0";
    ctx.beginPath();
    ctx.arc(mech.pos.x + 35 * Math.cos(mech.angle), mech.pos.y + 35 * Math.sin(mech.angle), radius, 0, 2 * Math.PI);
    ctx.fill();
  },
  removeConsBB(me) {
    for (let i = 0, len = consBB.length; i < len; ++i) {
      if (consBB[i].bodyA === me) {
        consBB[i].bodyA = consBB[i].bodyB;
        consBB.splice(i, 1);
        // b.removeConsBB(me);
        break;
      } else if (consBB[i].bodyB === me) {
        consBB[i].bodyB = consBB[i].bodyA;
        consBB.splice(i, 1);
        // b.removeConsBB(me);
        break;
      }
    }
  },
  onCollision(event) {
    const pairs = event.pairs;
    for (let i = 0, j = pairs.length; i != j; i++) {
      //map + bullet collisions
      if (pairs[i].bodyA.collisionFilter.category === cat.map && pairs[i].bodyB.collisionFilter.category === cat.bullet) {
        collideBulletStatic(pairs[i].bodyB)
      } else if (pairs[i].bodyB.collisionFilter.category === cat.map && pairs[i].bodyA.collisionFilter.category === cat.bullet) {
        collideBulletStatic(pairs[i].bodyA)
      }

      function collideBulletStatic(obj) {
        if (obj.onWallHit) obj.onWallHit();
      }
    }
  },
  explosion(where, radius) {
    radius *= b.modExplosionRadius
    // typically explode is used for some bullets with .onEnd
    //add dmg to draw queue
    game.drawList.push({
      x: where.x,
      y: where.y,
      radius: radius,
      color: "rgba(255,25,0,0.6)",
      time: game.drawTime
    });
    let dist, sub, knock;
    let dmg = b.dmgScale * radius * 0.009;

    const alertRange = 100 + radius * 2; //alert range
    //add alert to draw queue
    game.drawList.push({
      x: where.x,
      y: where.y,
      radius: alertRange,
      color: "rgba(100,20,0,0.03)",
      time: game.drawTime
    });

    //player damage and knock back
    sub = Vector.sub(where, player.position);
    dist = Vector.magnitude(sub);
    if (dist < radius) {
      if (!b.isModImmuneExplosion) mech.damage(radius * 0.0002);
      knock = Vector.mult(Vector.normalise(sub), -Math.sqrt(dmg) * player.mass / 30);
      player.force.x += knock.x;
      player.force.y += knock.y;
      mech.drop();
    } else if (dist < alertRange) {
      knock = Vector.mult(Vector.normalise(sub), -Math.sqrt(dmg) * player.mass / 55);
      player.force.x += knock.x;
      player.force.y += knock.y;
      mech.drop();
    }

    //body knock backs
    for (let i = 0, len = body.length; i < len; ++i) {
      sub = Vector.sub(where, body[i].position);
      dist = Vector.magnitude(sub);
      if (dist < radius) {
        knock = Vector.mult(Vector.normalise(sub), (-Math.sqrt(dmg) * body[i].mass) / 18);
        body[i].force.x += knock.x;
        body[i].force.y += knock.y;
      } else if (dist < alertRange) {
        knock = Vector.mult(Vector.normalise(sub), (-Math.sqrt(dmg) * body[i].mass) / 40);
        body[i].force.x += knock.x;
        body[i].force.y += knock.y;
      }
    }

    //power up knock backs
    for (let i = 0, len = powerUp.length; i < len; ++i) {
      sub = Vector.sub(where, powerUp[i].position);
      dist = Vector.magnitude(sub);
      if (dist < radius) {
        knock = Vector.mult(Vector.normalise(sub), (-Math.sqrt(dmg) * powerUp[i].mass) / 30);
        powerUp[i].force.x += knock.x;
        powerUp[i].force.y += knock.y;
      } else if (dist < alertRange) {
        knock = Vector.mult(Vector.normalise(sub), (-Math.sqrt(dmg) * powerUp[i].mass) / 45);
        powerUp[i].force.x += knock.x;
        powerUp[i].force.y += knock.y;
      }
    }

    //mob damage and knock back with alert
    let damageScale = 1.5; // reduce dmg for each new target to limit total AOE damage
    for (let i = 0, len = mob.length; i < len; ++i) {
      if (mob[i].alive && !mob[i].isShielded) {
        sub = Vector.sub(where, mob[i].position);
        dist = Vector.magnitude(sub) - mob[i].radius;
        if (dist < radius) {
          if (mob[i].shield) dmg *= 3 //balancing explosion dmg to shields
          mob[i].damage(dmg * damageScale);
          mob[i].locatePlayer();
          knock = Vector.mult(Vector.normalise(sub), (-Math.sqrt(dmg * damageScale) * mob[i].mass) / 50);
          mob[i].force.x += knock.x;
          mob[i].force.y += knock.y;
          radius *= 0.93 //reduced range for each additional explosion target
          damageScale *= 0.8 //reduced damage for each additional explosion target 
        } else if (!mob[i].seePlayer.recall && dist < alertRange) {
          mob[i].locatePlayer();
          knock = Vector.mult(Vector.normalise(sub), (-Math.sqrt(dmg * damageScale) * mob[i].mass) / 80);
          mob[i].force.x += knock.x;
          mob[i].force.y += knock.y;
        }
      }
    }
  },
  explode(me) {
    // typically explode is used for some bullets with .onEnd
    let radius = bullet[me].explodeRad * b.modExplosionRadius
    //add dmg to draw queue
    game.drawList.push({
      x: bullet[me].position.x,
      y: bullet[me].position.y,
      radius: radius,
      color: "rgba(255,25,0,0.6)",
      time: game.drawTime
    });
    let dist, sub, knock;
    let dmg = b.dmgScale * radius * 0.009;

    const alertRange = 100 + radius * 2; //alert range
    //add alert to draw queue
    game.drawList.push({
      x: bullet[me].position.x,
      y: bullet[me].position.y,
      radius: alertRange,
      color: "rgba(100,20,0,0.03)",
      time: game.drawTime
    });

    //player damage and knock back
    sub = Vector.sub(bullet[me].position, player.position);
    dist = Vector.magnitude(sub);
    if (dist < radius) {
      if (!b.isModImmuneExplosion) mech.damage(radius * 0.0002);
      knock = Vector.mult(Vector.normalise(sub), -Math.sqrt(dmg) * player.mass / 30);
      player.force.x += knock.x;
      player.force.y += knock.y;
      mech.drop();
    } else if (dist < alertRange) {
      knock = Vector.mult(Vector.normalise(sub), -Math.sqrt(dmg) * player.mass / 55);
      player.force.x += knock.x;
      player.force.y += knock.y;
      mech.drop();
    }

    //body knock backs
    for (let i = 0, len = body.length; i < len; ++i) {
      sub = Vector.sub(bullet[me].position, body[i].position);
      dist = Vector.magnitude(sub);
      if (dist < radius) {
        knock = Vector.mult(Vector.normalise(sub), (-Math.sqrt(dmg) * body[i].mass) / 18);
        body[i].force.x += knock.x;
        body[i].force.y += knock.y;
      } else if (dist < alertRange) {
        knock = Vector.mult(Vector.normalise(sub), (-Math.sqrt(dmg) * body[i].mass) / 40);
        body[i].force.x += knock.x;
        body[i].force.y += knock.y;
      }
    }

    //power up knock backs
    for (let i = 0, len = powerUp.length; i < len; ++i) {
      sub = Vector.sub(bullet[me].position, powerUp[i].position);
      dist = Vector.magnitude(sub);
      if (dist < radius) {
        knock = Vector.mult(Vector.normalise(sub), (-Math.sqrt(dmg) * powerUp[i].mass) / 30);
        powerUp[i].force.x += knock.x;
        powerUp[i].force.y += knock.y;
      } else if (dist < alertRange) {
        knock = Vector.mult(Vector.normalise(sub), (-Math.sqrt(dmg) * powerUp[i].mass) / 45);
        powerUp[i].force.x += knock.x;
        powerUp[i].force.y += knock.y;
      }
    }

    //mob damage and knock back with alert
    let damageScale = 1.5; // reduce dmg for each new target to limit total AOE damage
    for (let i = 0, len = mob.length; i < len; ++i) {
      if (mob[i].alive && !mob[i].isShielded) {
        sub = Vector.sub(bullet[me].position, mob[i].position);
        dist = Vector.magnitude(sub) - mob[i].radius;
        if (dist < radius) {
          if (mob[i].shield) dmg *= 3 //balancing explosion dmg to shields
          mob[i].damage(dmg * damageScale);
          mob[i].locatePlayer();
          knock = Vector.mult(Vector.normalise(sub), (-Math.sqrt(dmg * damageScale) * mob[i].mass) / 50);
          mob[i].force.x += knock.x;
          mob[i].force.y += knock.y;
          radius *= 0.93 //reduced range for each additional explosion target
          damageScale *= 0.8 //reduced damage for each additional explosion target 
        } else if (!mob[i].seePlayer.recall && dist < alertRange) {
          mob[i].locatePlayer();
          knock = Vector.mult(Vector.normalise(sub), (-Math.sqrt(dmg * damageScale) * mob[i].mass) / 80);
          mob[i].force.x += knock.x;
          mob[i].force.y += knock.y;
        }
      }
    }
  },
  mine(where, velocity, angle = 0) {
    const bIndex = bullet.length;
    bullet[bIndex] = Bodies.rectangle(where.x, where.y, 45 * b.modBulletSize, 16 * b.modBulletSize, {
      angle: angle,
      friction: 1,
      frictionStatic: 1,
      frictionAir: 0,
      restitution: 0,
      dmg: 0, //damage done in addition to the damage from momentum
      classType: "bullet",
      collisionFilter: {
        category: cat.bullet,
        mask: cat.map | cat.body | cat.mob | cat.mobBullet | cat.mobShield | cat.bullet
      },
      minDmgSpeed: 5,
      stillCount: 0,
      isArmed: false,
      endCycle: game.cycle + 2000 + 360 * Math.random(),
      lookFrequency: 41 + Math.floor(23 * Math.random()),
      range: 700,
      onDmg() {},
      do() {
        this.force.y += this.mass * 0.002; //extra gravity
        let collide = Matter.Query.collides(this, map) //check if collides with map
        if (collide.length > 0) {
          for (let i = 0; i < collide.length; i++) {
            if (collide[i].bodyA.collisionFilter.category === cat.map || collide[i].bodyB.collisionFilter.category === cat.map) {
              // console.log(collide)
              const angle = Matter.Vector.angle(collide[i].normal, {
                x: 1,
                y: 0
              })
              Matter.Body.setAngle(this, Math.atan2(collide[i].tangent.y, collide[i].tangent.x))
              //move until touching map again after rotation
              for (let j = 0; j < 10; j++) {
                if (Matter.Query.collides(this, map).length > 0) {
                  if (angle > -0.2 || angle < -1.5) { //don't stick to level ground
                    Matter.Body.setStatic(this, true) //don't set to static if not touching map
                  } else {
                    Matter.Body.setVelocity(this, {
                      x: 0,
                      y: 0
                    });
                    Matter.Body.setAngularVelocity(this, 0)
                  }
                  this.arm();

                  //sometimes the mine can't attach to map and it just needs to be reset
                  const that = this
                  setTimeout(function () {
                    if (Matter.Query.collides(that, map).length === 0) {
                      that.endCycle = 0 // if not touching map explode
                      that.isArmed = false
                      b.mine(that.position, that.velocity, that.angle)
                    }
                  }, 100, that);
                  break
                }
                //move until you are touching the wall
                Matter.Body.setPosition(this, Vector.add(this.position, Vector.mult(collide[i].normal, 2)))
              }

            }
          }
        } else {
          if (this.speed < 1 && this.angularSpeed < 0.01 && !mech.isBodiesAsleep) {
            this.stillCount++
          }
        }
        if (this.stillCount > 25) this.arm();
      },
      arm() {
        this.isArmed = true
        game.drawList.push({
          //add dmg to draw queue
          x: this.position.x,
          y: this.position.y,
          radius: 10,
          color: "#f00",
          time: 4
        });

        this.do = function () { //overwrite the do method for this bullet
          this.force.y += this.mass * 0.002; //extra gravity
          if (!(game.cycle % this.lookFrequency)) { //find mob targets
            for (let i = 0, len = mob.length; i < len; ++i) {
              if (Vector.magnitudeSquared(Vector.sub(this.position, mob[i].position)) < 500000 &&
                mob[i].dropPowerUp &&
                Matter.Query.ray(map, this.position, mob[i].position).length === 0 &&
                Matter.Query.ray(body, this.position, mob[i].position).length === 0) {
                this.endCycle = 0 //end life if mob is near and visible
              }
            }
          }
        }
      },
      onEnd() {
        if (this.isArmed) {
          const targets = [] //target nearby mobs
          for (let i = 0, len = mob.length; i < len; i++) {
            if (mob[i].dropPowerUp) {
              const dist = Vector.magnitudeSquared(Vector.sub(this.position, mob[i].position));
              if (dist < 1440000 && //1200*1200
                Matter.Query.ray(map, this.position, mob[i].position).length === 0 &&
                Matter.Query.ray(body, this.position, mob[i].position).length === 0) {
                targets.push(Vector.add(mob[i].position, Vector.mult(mob[i].velocity, Math.sqrt(dist) / 60))) //predict where the mob will be in a few cycles
              }
            }
          }
          for (let i = 0; i < 16; i++) {
            const speed = 53 + 10 * Math.random()
            if (targets.length > 0) { // aim near a random target in array
              const index = Math.floor(Math.random() * targets.length)
              const SPREAD = 150 / targets.length
              const WHERE = {
                x: targets[index].x + SPREAD * (Math.random() - 0.5),
                y: targets[index].y + SPREAD * (Math.random() - 0.5)
              }
              b.nail(this.position, Vector.mult(Vector.normalise(Vector.sub(WHERE, this.position)), speed), 1.1)
            } else { // aim in random direction
              const ANGLE = 2 * Math.PI * Math.random()
              b.nail(this.position, {
                x: speed * Math.cos(ANGLE),
                y: speed * Math.sin(ANGLE)
              })
            }
          }
        }
      }
    });
    bullet[bIndex].torque += bullet[bIndex].inertia * 0.0002 * (0.5 - Math.random())
    Matter.Body.setVelocity(bullet[bIndex], velocity);
    World.add(engine.world, bullet[bIndex]); //add bullet to world
  },
  spore(who) { //used with the mod upgrade in mob.death()
    const bIndex = bullet.length;
    const side = 4 * b.modBulletSize;
    bullet[bIndex] = Bodies.polygon(who.position.x, who.position.y, 5, side, {
      // density: 0.0015,			//frictionAir: 0.01,
      inertia: Infinity,
      restitution: 0.5,
      angle: Math.random() * 2 * Math.PI,
      friction: 0,
      frictionAir: 0.025,
      dmg: 2.5, //damage done in addition to the damage from momentum
      classType: "bullet",
      collisionFilter: {
        category: cat.bullet,
        mask: cat.map | cat.mob | cat.mobBullet | cat.mobShield //no collide with body
      },
      endCycle: game.cycle + Math.floor((660 + Math.floor(Math.random() * 240)) * b.isModBulletsLastLonger),
      minDmgSpeed: 0,
      onDmg() {
        this.endCycle = 0; //bullet ends cycle after doing damage 
      },
      onEnd() {},
      lookFrequency: 97 + Math.floor(77 * Math.random()),
      do() {
        //find mob targets
        if (!(game.cycle % this.lookFrequency)) {
          this.closestTarget = null;
          this.lockedOn = null;
          let closeDist = Infinity;
          for (let i = 0, len = mob.length; i < len; ++i) {
            if (mob[i].dropPowerUp && Matter.Query.ray(map, this.position, mob[i].position).length === 0) {
              // Matter.Query.ray(body, this.position, mob[i].position).length === 0
              const targetVector = Vector.sub(this.position, mob[i].position)
              const dist = Vector.magnitude(targetVector);
              if (dist < closeDist) {
                this.closestTarget = mob[i].position;
                closeDist = dist;
                this.lockedOn = mob[i] //Vector.normalise(targetVector);
                if (0.3 > Math.random()) break //doesn't always target the closest mob
              }
            }
          }
        }
        //accelerate towards mobs
        const THRUST = 0.0004
        if (this.lockedOn && this.lockedOn.alive) {
          this.force = Vector.mult(Vector.normalise(Vector.sub(this.position, this.lockedOn.position)), -this.mass * THRUST)
          // this.force.x -= THRUST * this.lockedOn.x
          // this.force.y -= THRUST * this.lockedOn.y
        } else {
          this.force.y += this.mass * 0.0001; //gravity
        }
      },
    });
    const SPEED = 8 + 3 * Math.random();
    const ANGLE = 2 * Math.PI * Math.random()
    Matter.Body.setVelocity(bullet[bIndex], {
      x: SPEED * Math.cos(ANGLE),
      y: SPEED * Math.sin(ANGLE)
    });
    World.add(engine.world, bullet[bIndex]); //add bullet to world
  },
  drone(speed = 1) {
    const me = bullet.length;
    const THRUST = 0.0015
    const dir = mech.angle + 0.2 * (Math.random() - 0.5);
    const RADIUS = (4.5 + 3 * Math.random()) * b.modBulletSize
    bullet[me] = Bodies.polygon(mech.pos.x + 30 * Math.cos(mech.angle), mech.pos.y + 30 * Math.sin(mech.angle), 8, RADIUS, {
      angle: dir,
      inertia: Infinity,
      friction: 0.05,
      frictionAir: 0.0005,
      restitution: 1,
      dmg: 0.13, //damage done in addition to the damage from momentum
      lookFrequency: 83 + Math.floor(41 * Math.random()),
      endCycle: game.cycle + Math.floor((1200 + 420 * Math.random()) * b.isModBulletsLastLonger),
      classType: "bullet",
      collisionFilter: {
        category: cat.bullet,
        mask: cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet | cat.mobShield //self collide
      },
      minDmgSpeed: 0,
      lockedOn: null,
      isFollowMouse: true,
      onDmg() {
        this.lockedOn = null
        if (this.endCycle > game.cycle + 180) {
          this.endCycle -= 60
          if (game.cycle + 180 > this.endCycle) this.endCycle = game.cycle + 180
        }
      },
      onEnd() {},
      do() {
        if (game.cycle + 180 > this.endCycle) { //fall and die
          this.force.y += this.mass * 0.0012;
          this.restitution = 0.2;
        } else {
          this.force.y += this.mass * 0.0002;
          //find mob targets
          if (!(game.cycle % this.lookFrequency)) {
            this.lockedOn = null;
            let closeDist = Infinity;
            for (let i = 0, len = mob.length; i < len; ++i) {
              if (
                mob[i].dropPowerUp &&
                Matter.Query.ray(map, this.position, mob[i].position).length === 0 &&
                Matter.Query.ray(body, this.position, mob[i].position).length === 0
              ) {
                const TARGET_VECTOR = Vector.sub(this.position, mob[i].position)
                const DIST = Vector.magnitude(TARGET_VECTOR);
                if (DIST < closeDist) {
                  closeDist = DIST;
                  this.lockedOn = mob[i]
                }
              }
            }
            if (!this.lockedOn) {
              //grab a power up if it is (ammo) or (a heal when player is low)
              let closeDist = Infinity;
              for (let i = 0, len = powerUp.length; i < len; ++i) {
                if (
                  ((powerUp[i].name !== "field" && powerUp[i].name !== "heal") || (powerUp[i].name === "heal" && mech.health < 0.8)) &&
                  Matter.Query.ray(map, this.position, powerUp[i].position).length === 0 &&
                  Matter.Query.ray(body, this.position, powerUp[i].position).length === 0
                ) {
                  const TARGET_VECTOR = Vector.sub(this.position, powerUp[i].position)
                  const DIST = Vector.magnitude(TARGET_VECTOR);
                  if (DIST < closeDist) {
                    if (DIST < 50) { //eat the power up if close enough
                      powerUp[i].effect();
                      Matter.World.remove(engine.world, powerUp[i]);
                      powerUp.splice(i, 1);
                      break;
                    }
                    closeDist = DIST;
                    this.lockedOn = powerUp[i]
                  }
                }
              }
            }
          }
          if (this.lockedOn) { //accelerate towards mobs
            this.force = Vector.mult(Vector.normalise(Vector.sub(this.position, this.lockedOn.position)), -this.mass * THRUST)
          } else { //accelerate towards mouse
            this.force = Vector.mult(Vector.normalise(Vector.sub(this.position, game.mouseInGame)), -this.mass * THRUST)
          }
          // speed cap instead of friction to give more agility
          if (this.speed > 6) {
            Matter.Body.setVelocity(this, {
              x: this.velocity.x * 0.97,
              y: this.velocity.y * 0.97
            });
          }
        }
      }
    })
    World.add(engine.world, bullet[me]); //add bullet to world
    Matter.Body.setVelocity(bullet[me], {
      x: speed * Math.cos(dir),
      y: speed * Math.sin(dir)
    });
  },
  nail(pos, velocity, dmg = 0) {
    const me = bullet.length;
    bullet[me] = Bodies.rectangle(pos.x, pos.y, 25 * b.modBulletSize, 2 * b.modBulletSize, b.fireAttributes(Math.atan2(velocity.y, velocity.x)));
    Matter.Body.setVelocity(bullet[me], velocity);
    World.add(engine.world, bullet[me]); //add bullet to world
    bullet[me].endCycle = game.cycle + 60 + 18 * Math.random();
    bullet[me].dmg = dmg
    bullet[me].do = function () {};
  },
  nailBot(speed = 1) {
    const me = bullet.length;
    const dir = mech.angle;
    const RADIUS = (10 + 5 * Math.random()) * b.modBulletSize
    bullet[me] = Bodies.polygon(mech.pos.x + 30 * Math.cos(mech.angle), mech.pos.y + 30 * Math.sin(mech.angle), 4, RADIUS, {
      angle: dir,
      friction: 0,
      frictionStatic: 0,
      restitution: 0.6 * (1 + 0.5 * Math.random()),
      dmg: 0, // 0.14   //damage done in addition to the damage from momentum
      minDmgSpeed: 2,
      lookFrequency: 56 + Math.floor(17 * Math.random()),
      acceleration: 0.005 * (1 + 0.5 * Math.random()),
      range: 200 * (1 + 0.3 * Math.random()),
      endCycle: Infinity,
      classType: "bullet",
      collisionFilter: {
        category: cat.bullet,
        mask: cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet | cat.mobShield
      },
      lockedOn: null,
      onDmg() {
        this.lockedOn = null
      },
      onEnd() {},
      do() {
        if (!(game.cycle % this.lookFrequency)) {
          let target
          for (let i = 0, len = mob.length; i < len; i++) {
            const dist = Vector.magnitudeSquared(Vector.sub(this.position, mob[i].position));
            if (dist < 2000000 && //1400*1400
              Matter.Query.ray(map, this.position, mob[i].position).length === 0 &&
              Matter.Query.ray(body, this.position, mob[i].position).length === 0) {
              target = Vector.add(mob[i].position, Vector.mult(mob[i].velocity, Math.sqrt(dist) / 60))
              const SPEED = 50
              b.nail(this.position, Vector.mult(Vector.normalise(Vector.sub(target, this.position)), SPEED), 0.5)
              break;
            }
          }
        }

        const distanceToPlayer = Vector.magnitude(Vector.sub(this.position, mech.pos))
        if (distanceToPlayer > this.range) { //if far away move towards player
          this.force = Vector.mult(Vector.normalise(Vector.sub(mech.pos, this.position)), this.mass * this.acceleration)
          this.frictionAir = 0.06
        } else { //close to player
          this.frictionAir = 0
          //add player's velocity
          // Matter.Body.setVelocity(this, Vector.add(Vector.mult(this.velocity, 0.9), Vector.mult(player.velocity, 0.1)));
        }
      }
    })
    World.add(engine.world, bullet[me]); //add bullet to world
    Matter.Body.setVelocity(bullet[me], {
      x: speed * Math.cos(dir),
      y: speed * Math.sin(dir)
    });
  },
  laserBot(speed = 1) {
    const me = bullet.length;
    const dir = mech.angle;
    const RADIUS = (14 + 6 * Math.random()) * b.modBulletSize
    bullet[me] = Bodies.polygon(mech.pos.x + 30 * Math.cos(mech.angle), mech.pos.y + 30 * Math.sin(mech.angle), 3, RADIUS, {
      angle: dir,
      friction: 0,
      frictionStatic: 0,
      frictionAir: 0.004 * (1 + 0.3 * Math.random()),
      restitution: 0.5 * (1 + 0.5 * Math.random()),
      dmg: 0, // 0.14   //damage done in addition to the damage from momentum
      minDmgSpeed: 2,
      lookFrequency: 27 + Math.floor(17 * Math.random()),
      acceleration: 0.0015 * (1 + 0.3 * Math.random()),
      range: 300 * (1 + 0.2 * Math.random()),
      followRange: 150 + Math.floor(30 * Math.random()),
      offPlayer: {
        x: 100 * (Math.random() - 0.5),
        y: 90 * (Math.random() - 0.5) - 20,
      },
      endCycle: Infinity,
      classType: "bullet",
      collisionFilter: {
        category: cat.bullet,
        mask: cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet | cat.mobShield
      },
      lockedOn: null,
      onDmg() {
        this.lockedOn = null
      },
      onEnd() {},
      do() {
        //move in a circle
        // const radius = 1.5
        // this.offPlayer.x -= radius * Math.cos(game.cycle * 0.02)
        // this.offPlayer.y -= radius * Math.sin(game.cycle * 0.02)

        const velocityOff = Vector.mult(player.velocity, 20) //look 15 cycles ahead
        let playerPos = Vector.add(Vector.add(this.offPlayer, mech.pos), velocityOff) //also include an offset unique to this bot to keep many bots spread out
        const farAway = Math.max(0, (Vector.magnitude(Vector.sub(this.position, playerPos))) / this.followRange) //linear bounding well 
        let mag = Math.min(farAway, 4) * this.mass * this.acceleration
        this.force = Vector.mult(Vector.normalise(Vector.sub(playerPos, this.position)), mag)
        //manual friction to not lose rotational velocity
        Matter.Body.setVelocity(this, {
          x: this.velocity.x * 0.95,
          y: this.velocity.y * 0.95
        });

        //find targets
        if (!(game.cycle % this.lookFrequency)) {
          this.lockedOn = null;
          let closeDist = this.range;
          for (let i = 0, len = mob.length; i < len; ++i) {
            const DIST = Vector.magnitude(Vector.sub(this.vertices[0], mob[i].position));
            if (DIST - mob[i].radius < closeDist &&
              !mob[i].isShielded &&
              Matter.Query.ray(map, this.vertices[0], mob[i].position).length === 0 &&
              Matter.Query.ray(body, this.vertices[0], mob[i].position).length === 0) {
              closeDist = DIST;
              this.lockedOn = mob[i]
            }
          }
        }

        //hit target with laser
        if (this.lockedOn && this.lockedOn.alive && mech.fieldMeter > 0.15) {
          mech.fieldMeter -= 0.0014
          //make sure you can still see vertex
          const DIST = Vector.magnitude(Vector.sub(this.vertices[0], this.lockedOn.position));
          if (DIST - this.lockedOn.radius < this.range + 150 &&
            Matter.Query.ray(map, this.vertices[0], this.lockedOn.position).length === 0 &&
            Matter.Query.ray(body, this.vertices[0], this.lockedOn.position).length === 0) {
            //move towards the target
            this.force = Vector.add(this.force, Vector.mult(Vector.normalise(Vector.sub(this.lockedOn.position, this.position)), 0.001))

            //find the closest vertex
            let bestVertexDistance = Infinity
            let bestVertex = null
            for (let i = 0; i < this.lockedOn.vertices.length; i++) {
              const dist = Vector.magnitude(Vector.sub(this.vertices[0], this.lockedOn.vertices[i]));
              if (dist < bestVertexDistance) {
                bestVertex = i
                bestVertexDistance = dist
              }
            }
            const dmg = b.dmgScale * 0.1;
            this.lockedOn.damage(dmg);
            this.lockedOn.locatePlayer();

            ctx.beginPath(); //draw laser
            ctx.moveTo(this.vertices[0].x, this.vertices[0].y);
            ctx.lineTo(this.lockedOn.vertices[bestVertex].x, this.lockedOn.vertices[bestVertex].y);
            ctx.strokeStyle = "#f00";
            ctx.lineWidth = "2"
            ctx.lineDashOffset = 300 * Math.random()
            ctx.setLineDash([50 + 100 * Math.random(), 100 * Math.random()]);
            ctx.stroke();
            ctx.setLineDash([0, 0]);
            ctx.beginPath();
            ctx.arc(this.lockedOn.vertices[bestVertex].x, this.lockedOn.vertices[bestVertex].y, Math.sqrt(dmg) * 100, 0, 2 * Math.PI);
            ctx.fillStyle = "#f00";
            ctx.fill();
          }
        }
      }
    })
    World.add(engine.world, bullet[me]); //add bullet to world
    Matter.Body.setVelocity(bullet[me], {
      x: speed * Math.cos(dir),
      y: speed * Math.sin(dir)
    });
  },
  giveGuns(gun = "random", ammoPacks = 6) {
    if (gun === "random") {
      //find what guns player doesn't have
      options = []
      for (let i = 0, len = b.guns.length; i < len; i++) {
        if (!b.guns[i].have) options.push(i)
      }
      if (options.length === 0) return
      //randomly pick from list of possible guns
      gun = options[Math.floor(Math.random() * options.length)]
    }
    if (gun === "all") {
      b.activeGun = 0;
      b.inventoryGun = 0;
      for (let i = 0; i < b.guns.length; i++) {
        b.inventory[i] = i;
        b.guns[i].have = true;
        b.guns[i].ammo = b.guns[i].ammoPack * ammoPacks;
      }
    } else {
      if (!b.guns[gun].have) b.inventory.push(gun);
      if (b.activeGun === null) b.activeGun = gun //if no active gun switch to new gun
      b.guns[gun].have = true;
      b.guns[gun].ammo = b.guns[gun].ammoPack * ammoPacks;
    }
    game.makeGunHUD();
  },
  guns: [{
      name: "minigun", //0
      description: "rapidly fire a stream of small <strong>bullets</strong>",
      ammo: 0,
      ammoPack: 55,
      have: false,
      isStarterGun: true,
      fire() {
        const me = bullet.length;
        b.muzzleFlash(15);
        // if (Math.random() > 0.2) mobs.alert(500);
        const dir = mech.angle + (Math.random() - 0.5) * ((mech.crouch) ? 0.03 : 0.1);
        bullet[me] = Bodies.rectangle(mech.pos.x + 30 * Math.cos(mech.angle), mech.pos.y + 30 * Math.sin(mech.angle), 20 * b.modBulletSize, 6 * b.modBulletSize, b.fireAttributes(dir));
        b.fireProps(mech.crouch ? 8 : 4, mech.crouch ? 52 : 38, dir, me); //cd , speed
        bullet[me].endCycle = game.cycle + 70;
        bullet[me].dmg = 0.07;
        bullet[me].frictionAir = mech.crouch ? 0.007 : 0.01;
        bullet[me].do = function () {
          this.force.y += this.mass * 0.0005;
        };
      }
    },
    {
      name: "shotgun", //1
      description: "fire a <strong>burst</strong> of short range bullets<br><em>crouch to reduce recoil</em>",
      ammo: 0,
      ammoPack: 6,
      have: false,
      isStarterGun: true,
      fire() {
        mech.fireCDcycle = mech.cycle + Math.floor((mech.crouch ? 50 : 35) * b.modFireRate); // cool down

        b.muzzleFlash(35);
        // mobs.alert(650);
        const side = 11 * b.modBulletSize
        for (let i = 0; i < 9; i++) {
          const me = bullet.length;
          const dir = mech.angle + (Math.random() - 0.5) * (mech.crouch ? 0.22 : 0.7)
          bullet[me] = Bodies.rectangle(mech.pos.x + 35 * Math.cos(mech.angle) + 15 * (Math.random() - 0.5), mech.pos.y + 35 * Math.sin(mech.angle) + 15 * (Math.random() - 0.5), side, side, b.fireAttributes(dir));
          World.add(engine.world, bullet[me]); //add bullet to world
          const SPEED = 40 + Math.random() * 11
          Matter.Body.setVelocity(bullet[me], {
            x: SPEED * Math.cos(dir),
            y: SPEED * Math.sin(dir)
          });
          bullet[me].endCycle = game.cycle + 55
          bullet[me].frictionAir = 0.03;
          bullet[me].do = function () {
            this.force.y += this.mass * 0.001;
          };
        }

        //knock back
        const KNOCK = ((mech.crouch) ? 0.013 : 0.15) * b.modBulletSize * b.modBulletSize
        player.force.x -= KNOCK * Math.cos(mech.angle)
        player.force.y -= KNOCK * Math.sin(mech.angle) * 0.3 //reduce knock back in vertical direction to stop super jumps
      }
    },
    {
      name: "super balls", //2
      description: "fire <strong>five</strong> balls in a wide arc<br>balls <strong>bounce</strong> with no momentum loss",
      ammo: 0,
      ammoPack: 5,
      have: false,
      isStarterGun: true,
      fire() {
        mech.fireCDcycle = mech.cycle + Math.floor((mech.crouch ? 35 : 20) * b.modFireRate); // cool down
        b.muzzleFlash(20);
        // mobs.alert(450);
        const SPEED = mech.crouch ? 55 : 35
        const SPREAD = mech.crouch ? 0.04 : 0.15
        let dir = mech.angle - SPREAD * 2;
        for (let i = 0; i < 5; i++) {
          const me = bullet.length;
          bullet[me] = Bodies.polygon(mech.pos.x + 30 * Math.cos(mech.angle), mech.pos.y + 30 * Math.sin(mech.angle), 10, 7 * b.modBulletSize, b.fireAttributes(dir, false));
          World.add(engine.world, bullet[me]); //add bullet to world
          Matter.Body.setVelocity(bullet[me], {
            x: SPEED * Math.cos(dir),
            y: SPEED * Math.sin(dir)
          });
          // Matter.Body.setDensity(bullet[me], 0.0001);
          bullet[me].endCycle = game.cycle + Math.floor(360 * b.isModBulletsLastLonger);
          bullet[me].dmg = 0;
          bullet[me].minDmgSpeed = 0;
          bullet[me].restitution = 0.99;
          bullet[me].friction = 0;
          bullet[me].do = function () {
            this.force.y += this.mass * 0.001;
          };
          dir += SPREAD;
        }
      }
    },
    {
      name: "fléchettes", //3
      description: "fire a volley of <strong>precise</strong> high velocity needles",
      ammo: 0,
      ammoPack: 20,
      have: false,
      isStarterGun: true,
      count: 0, //used to track how many shots are in a volley before a big CD
      lastFireCycle: 0, //use to remember how longs its been since last fire, used to reset count
      fire() {
        const CD = (mech.crouch) ? 45 : 25
        if (this.lastFireCycle + CD < mech.cycle) this.count = 0 //reset count if it cycles past the CD
        this.lastFireCycle = mech.cycle

        if (this.count > ((mech.crouch) ? 6 : 1)) {
          this.count = 0
          mech.fireCDcycle = mech.cycle + Math.floor(CD * b.modFireRate); // cool down
        } else {
          this.count++
          mech.fireCDcycle = mech.cycle + Math.floor(2 * b.modFireRate); // cool down
        }

        const me = bullet.length;
        bullet[me] = Bodies.rectangle(mech.pos.x + 40 * Math.cos(mech.angle), mech.pos.y + 40 * Math.sin(mech.angle), 45 * b.modBulletSize, 1.4 * b.modBulletSize, b.fireAttributes(mech.angle));
        bullet[me].endCycle = game.cycle + 180;
        bullet[me].dmg = 1;
        bullet[me].do = function () {
          if (this.speed < 10) this.force.y += this.mass * 0.0003; //no gravity until it slows don to improve aiming
        };
        const SPEED = 50
        Matter.Body.setVelocity(bullet[me], {
          x: mech.Vx / 2 + SPEED * Math.cos(mech.angle),
          y: mech.Vy / 2 + SPEED * Math.sin(mech.angle)
        });
        World.add(engine.world, bullet[me]); //add bullet to world
      }
    },
    {
      name: "wave beam", //4
      description: "emit a <strong>sine wave</strong> of oscillating particles<br>particles propagate through <strong>walls</strong>",
      ammo: 0,
      ammoPack: 32,
      have: false,
      isStarterGun: true,
      fire() {
        const me = bullet.length;
        const dir = mech.angle
        const SCALE = (mech.crouch ? 0.963 : 0.95)
        const wiggleMag = ((mech.crouch) ? 0.004 : 0.005) * ((mech.flipLegs === 1) ? 1 : -1)
        bullet[me] = Bodies.polygon(mech.pos.x + 25 * Math.cos(dir), mech.pos.y + 25 * Math.sin(dir), 10, 10 * b.modBulletSize, {
          angle: dir,
          cycle: -0.43, //adjust this number until the bullets line up with the cross hairs
          endCycle: game.cycle + Math.floor((mech.crouch ? 155 : 120) * b.isModBulletsLastLonger),
          inertia: Infinity,
          frictionAir: 0,
          minDmgSpeed: 0,
          dmg: 0.3, //damage done in addition to the damage from momentum
          classType: "bullet",
          collisionFilter: {
            category: cat.bullet,
            mask: cat.mob | cat.mobBullet | cat.mobShield
          },
          onDmg() {},
          onEnd() {},
          do() {
            if (!mech.isBodiesAsleep) {
              this.cycle++
              const THRUST = wiggleMag * Math.cos(this.cycle * 0.3)
              this.force = Vector.mult(Vector.normalise(this.direction), this.mass * THRUST) //wiggle

              if (this.cycle > 0 && !(Math.floor(this.cycle) % 6)) Matter.Body.scale(this, SCALE, SCALE); //shrink
            }
          }
        });
        World.add(engine.world, bullet[me]); //add bullet to world
        mech.fireCDcycle = mech.cycle + Math.floor((mech.crouch ? 8 : 4) * b.modFireRate); // cool down
        const SPEED = mech.crouch ? 5.2 : 4.5;
        Matter.Body.setVelocity(bullet[me], {
          x: SPEED * Math.cos(dir),
          y: SPEED * Math.sin(dir)
        });
        bullet[me].direction = Vector.perp(bullet[me].velocity)
        // if (mech.angle + Math.PI / 2 > 0) {
        //   bullet[me].direction = Vector.perp(bullet[me].velocity, true)
        // } else {
        //   bullet[me].direction = Vector.perp(bullet[me].velocity)
        // }

        World.add(engine.world, bullet[me]); //add bullet to world
      }
    },
    {
      name: "rail gun", //5
      description: "electro-magnetically launch a dense rod<br><strong>hold</strong> left mouse to charge, <strong>release</strong> to fire", //and <strong>repel</strong> enemies
      ammo: 0,
      ammoPack: 1,
      have: false,
      isStarterGun: false,
      fire() {
        const me = bullet.length;
        bullet[me] = Bodies.rectangle(0, 0, 0.012 * b.modBulletSize, 0.0025 * b.modBulletSize, {
          density: 0.01, //0.001 is normal
          //frictionAir: 0.01,			//restitution: 0,
          // angle: 0,
          // friction: 0.5,
          frictionAir: 0,
          dmg: 0, //damage done in addition to the damage from momentum
          classType: "bullet",
          collisionFilter: {
            category: 0,
            mask: cat.map | cat.body | cat.mob | cat.mobBullet | cat.mobShield
          },
          minDmgSpeed: 5,
          onDmg() {}, //this.endCycle = 0  //triggers despawn
          onEnd() {}
        });
        mech.fireCDcycle = Infinity; // cool down
        World.add(engine.world, bullet[me]); //add bullet to world
        bullet[me].endCycle = Infinity
        bullet[me].isCharging = true;
        bullet[me].charge = 0;
        bullet[me].do = function () {
          if (this.isCharging) {
            if ((!game.mouseDown && this.charge > 0.6)) { //fire on mouse release
              this.isCharging = false
              mech.fireCDcycle = mech.cycle + 2; // set fire cool down
              Matter.Body.scale(this, 8000, 8000) // show the bullet by scaling it up  (don't judge me...  I know this is a bad way to do it)
              this.endCycle = game.cycle + 140
              this.collisionFilter.category = cat.bullet
              Matter.Body.setPosition(this, {
                x: mech.pos.x,
                y: mech.pos.y
              })
              Matter.Body.setAngle(this, mech.angle)
              const speed = 90
              Matter.Body.setVelocity(this, {
                x: mech.Vx / 2 + speed * this.charge * Math.cos(mech.angle),
                y: mech.Vy / 2 + speed * this.charge * Math.sin(mech.angle)
              });

              //knock back
              const KNOCK = ((mech.crouch) ? 0.1 : 0.5) * b.modBulletSize * b.modBulletSize * this.charge * this.charge
              player.force.x -= KNOCK * Math.cos(mech.angle)
              player.force.y -= KNOCK * Math.sin(mech.angle) * 0.35 //reduce knock back in vertical direction to stop super jumps

              //push away blocks when firing
              let range = 700 * this.charge
              for (let i = 0, len = body.length; i < len; ++i) {
                const SUB = Vector.sub(body[i].position, mech.pos)
                const DISTANCE = Vector.magnitude(SUB)

                if (DISTANCE < range) {
                  const DEPTH = Math.min(range - DISTANCE, 300)
                  const FORCE = Vector.mult(Vector.normalise(SUB), 0.003 * Math.sqrt(DEPTH) * body[i].mass)
                  body[i].force.x += FORCE.x;
                  body[i].force.y += FORCE.y - body[i].mass * (game.g * 1.5); //kick up a bit to give them some arc
                }
              }
              for (let i = 0, len = mob.length; i < len; ++i) {
                const SUB = Vector.sub(mob[i].position, mech.pos)
                const DISTANCE = Vector.magnitude(SUB)

                if (DISTANCE < range) {
                  const DEPTH = Math.min(range - DISTANCE, 300)
                  const FORCE = Vector.mult(Vector.normalise(SUB), 0.003 * Math.sqrt(DEPTH) * mob[i].mass)
                  mob[i].force.x += 1.5 * FORCE.x;
                  mob[i].force.y += 1.5 * FORCE.y;
                }
              }
            } else { // charging on mouse down
              mech.fireCDcycle = Infinity //can't fire until mouse is released
              if (mech.crouch) {
                this.charge = this.charge * 0.965 + 0.035 // this.charge converges to 1
              } else {
                this.charge = this.charge * 0.985 + 0.015 // this.charge converges to 1
              }
              //draw laser targeting
              let best;
              let range = 3000
              const dir = mech.angle
              const path = [{
                  x: mech.pos.x + 20 * Math.cos(dir),
                  y: mech.pos.y + 20 * Math.sin(dir)
                },
                {
                  x: mech.pos.x + range * Math.cos(dir),
                  y: mech.pos.y + range * Math.sin(dir)
                }
              ];
              const vertexCollision = function (v1, v1End, domain) {
                for (let i = 0; i < domain.length; ++i) {
                  let vertices = domain[i].vertices;
                  const len = vertices.length - 1;
                  for (let j = 0; j < len; j++) {
                    results = game.checkLineIntersection(v1, v1End, vertices[j], vertices[j + 1]);
                    if (results.onLine1 && results.onLine2) {
                      const dx = v1.x - results.x;
                      const dy = v1.y - results.y;
                      const dist2 = dx * dx + dy * dy;
                      if (dist2 < best.dist2) {
                        best = {
                          x: results.x,
                          y: results.y,
                          dist2: dist2,
                          who: domain[i],
                          v1: vertices[j],
                          v2: vertices[j + 1]
                        };
                      }
                    }
                  }
                  results = game.checkLineIntersection(v1, v1End, vertices[0], vertices[len]);
                  if (results.onLine1 && results.onLine2) {
                    const dx = v1.x - results.x;
                    const dy = v1.y - results.y;
                    const dist2 = dx * dx + dy * dy;
                    if (dist2 < best.dist2) {
                      best = {
                        x: results.x,
                        y: results.y,
                        dist2: dist2,
                        who: domain[i],
                        v1: vertices[0],
                        v2: vertices[len]
                      };
                    }
                  }
                }
              };

              //check for collisions
              best = {
                x: null,
                y: null,
                dist2: Infinity,
                who: null,
                v1: null,
                v2: null
              };
              vertexCollision(path[0], path[1], mob);
              vertexCollision(path[0], path[1], map);
              vertexCollision(path[0], path[1], body);
              if (best.dist2 != Infinity) { //if hitting something
                path[path.length - 1] = {
                  x: best.x,
                  y: best.y
                };
              }

              //draw laser beam
              ctx.beginPath();
              ctx.moveTo(path[0].x, path[0].y);
              ctx.lineTo(path[1].x, path[1].y);
              ctx.strokeStyle = `rgba(100,0,180,0.7)`;
              ctx.lineWidth = this.charge * 1
              ctx.setLineDash([10, 20]);
              ctx.stroke();
              ctx.setLineDash([0, 0]);

              //draw magnetic field
              const X = mech.pos.x
              const Y = mech.pos.y
              const unitVector = Vector.normalise(Vector.sub(game.mouseInGame, mech.pos))
              const unitVectorPerp = Vector.perp(unitVector)

              function magField(mag, arc) {
                ctx.moveTo(X, Y);
                ctx.bezierCurveTo(
                  X + unitVector.x * mag, Y + unitVector.y * mag,
                  X + unitVector.x * mag + unitVectorPerp.x * arc, Y + unitVector.y * mag + unitVectorPerp.y * arc,
                  X + unitVectorPerp.x * arc, Y + unitVectorPerp.y * arc)
                ctx.bezierCurveTo(
                  X - unitVector.x * mag + unitVectorPerp.x * arc, Y - unitVector.y * mag + unitVectorPerp.y * arc,
                  X - unitVector.x * mag, Y - unitVector.y * mag,
                  X, Y)
              }
              ctx.fillStyle = `rgba(50,0,100,0.05)`;
              for (let i = 3; i < 7; i++) {
                const MAG = 8 * i * i * this.charge * (0.93 + 0.07 * Math.random())
                const ARC = 6 * i * i * this.charge * (0.93 + 0.07 * Math.random())
                ctx.beginPath();
                magField(MAG, ARC)
                magField(MAG, -ARC)
                ctx.fill();
              }
            }
          } else { //normal bullet behavior
            this.force.y += this.mass * 0.00015 / this.charge; // low gravity that scales with charge
          }
        }
      }
    },
    {
      name: "missiles", //6
      description: "fire missiles that accelerate towards enemies<br><strong class='color-e'>explodes</strong> when near target",
      ammo: 0,
      ammoPack: 3,
      have: false,
      isStarterGun: false,
      fireCycle: 0,
      ammoLoaded: 0,
      fire() {
        const thrust = 0.0005;
        let dir = mech.angle + (0.5 - Math.random()) * (mech.crouch ? 0 : 0.2);
        const me = bullet.length;
        bullet[me] = Bodies.rectangle(mech.pos.x + 40 * Math.cos(mech.angle), mech.pos.y + 40 * Math.sin(mech.angle) - 3, 30 * b.modBulletSize, 4 * b.modBulletSize, b.fireAttributes(dir));
        b.fireProps(mech.crouch ? 55 : 30, -3 * (0.5 - Math.random()) + (mech.crouch ? 25 : -8), dir, me); //cd , speed
        // bullet[me].collisionFilter.mask = cat.map | cat.body | cat.mobBullet
        // Matter.Body.setDensity(bullet[me], 0.01)  //doesn't help with reducing explosion knock backs
        bullet[me].force.y += 0.0005; //a small push down at first to make it seem like the missile is briefly falling
        bullet[me].frictionAir = 0.023
        bullet[me].endCycle = game.cycle + Math.floor((280 + 40 * Math.random()) * b.isModBulletsLastLonger);
        bullet[me].explodeRad = 170 + 60 * Math.random();
        bullet[me].lookFrequency = Math.floor(31 + Math.random() * 11);
        bullet[me].onEnd = b.explode; //makes bullet do explosive damage at end
        bullet[me].onDmg = function () {
          this.tryToLockOn();
          // this.endCycle = 0; //bullet ends cycle after doing damage  // also triggers explosion
        };
        bullet[me].lockedOn = null;
        bullet[me].tryToLockOn = function () {
          this.lockedOn = null;
          let closeDist = Infinity;

          //look for closest target to where the missile will be in 30 cycles
          const futurePos = Vector.add(this.position, Vector.mult(this.velocity, 30))
          for (let i = 0, len = mob.length; i < len; ++i) {
            if (
              mob[i].alive && mob[i].dropPowerUp &&
              Matter.Query.ray(map, this.position, mob[i].position).length === 0 &&
              Matter.Query.ray(body, this.position, mob[i].position).length === 0
            ) {
              const futureDist = Vector.magnitude(Vector.sub(futurePos, mob[i].position));
              if (futureDist < closeDist) {
                closeDist = futureDist;
                this.lockedOn = mob[i];
                this.frictionAir = 0.05; //extra friction once a target it locked
              }
            }
          }
          //explode when bullet is close enough to target
          if (this.lockedOn && Vector.magnitude(Vector.sub(this.position, this.lockedOn.position)) < this.explodeRad * 0.95) {
            // console.log('hit')
            this.endCycle = 0; //bullet ends cycle after doing damage  //also triggers explosion
            const dmg = b.dmgScale * 5;
            this.lockedOn.damage(dmg); //does extra damage to target
          }
        };
        bullet[me].do = function () {
          if (!mech.isBodiesAsleep) {
            if (!(mech.cycle % this.lookFrequency)) {
              this.tryToLockOn();
            }

            //rotate missile towards the target
            if (this.lockedOn) {
              const face = {
                x: Math.cos(this.angle),
                y: Math.sin(this.angle)
              };
              const target = Vector.normalise(Vector.sub(this.position, this.lockedOn.position));
              if (Vector.dot(target, face) > -0.98) {
                if (Vector.cross(target, face) > 0) {
                  Matter.Body.rotate(this, 0.08);
                } else {
                  Matter.Body.rotate(this, -0.08);
                }
              }
            }
            //accelerate in direction bullet is facing
            const dir = this.angle; // + (Math.random() - 0.5);
            this.force.x += Math.cos(dir) * thrust;
            this.force.y += Math.sin(dir) * thrust;

            //draw rocket
            ctx.beginPath();
            ctx.arc(this.position.x - Math.cos(this.angle) * 27 + (Math.random() - 0.5) * 4, this.position.y - Math.sin(this.angle) * 27 + (Math.random() - 0.5) * 4, 11, 0, 2 * Math.PI);
            ctx.fillStyle = "rgba(255,155,0,0.5)";
            ctx.fill();
          } else {
            //draw rocket  with time stop
            ctx.beginPath();
            ctx.arc(this.position.x - Math.cos(this.angle) * 27, this.position.y - Math.sin(this.angle) * 27, 11, 0, 2 * Math.PI);
            ctx.fillStyle = "rgba(255,155,0,0.5)";
            ctx.fill();
          }
        }
      }
    }, {
      name: "flak", //7
      description: "fire a cluster of short range projectiles<br><strong class='color-e'>explodes</strong> on contact or after half a second",
      ammo: 0,
      ammoPack: 6,
      have: false,
      isStarterGun: true,
      fire() {
        mech.fireCDcycle = mech.cycle + Math.floor((mech.crouch ? 25 : 10) * b.modFireRate); // cool down
        b.muzzleFlash(30);
        const SPEED = mech.crouch ? 29 : 25
        const END = Math.floor(mech.crouch ? 30 : 18);
        const side1 = 17 * b.modBulletSize
        const side2 = 4 * b.modBulletSize
        const totalBullets = 5
        const angleStep = (mech.crouch ? 0.06 : 0.25) / totalBullets
        let dir = mech.angle - angleStep * totalBullets / 2;

        for (let i = 0; i < totalBullets; i++) { //5 -> 7
          dir += angleStep
          const me = bullet.length;
          bullet[me] = Bodies.rectangle(mech.pos.x + 50 * Math.cos(mech.angle), mech.pos.y + 50 * Math.sin(mech.angle), side1, side2, b.fireAttributes(dir));
          World.add(engine.world, bullet[me]); //add bullet to world
          Matter.Body.setVelocity(bullet[me], {
            x: (SPEED + 15 * Math.random() - 2 * i) * Math.cos(dir),
            y: (SPEED + 15 * Math.random() - 2 * i) * Math.sin(dir)
          });

          bullet[me].endCycle = 2 * i + game.cycle + END
          bullet[me].restitution = 0;
          bullet[me].friction = 1;
          bullet[me].explodeRad = (mech.crouch ? 85 : 60) + (Math.random() - 0.5) * 50;
          bullet[me].onEnd = b.explode;
          bullet[me].onDmg = function () {
            this.endCycle = 0; //bullet ends cycle after hitting a mob and triggers explosion
          };
          bullet[me].do = function () {
            this.force.y += this.mass * 0.0004;
          }
        }
      }
    }, {
      name: "grenades", //8
      description: "lob a single bouncy projectile<br><strong class='color-e'>explodes</strong> on contact or after one second",
      ammo: 0,
      ammoPack: 6,
      have: false,
      isStarterGun: false,
      fire() {
        const me = bullet.length;
        const dir = mech.angle; // + Math.random() * 0.05;
        bullet[me] = Bodies.circle(mech.pos.x + 30 * Math.cos(mech.angle), mech.pos.y + 30 * Math.sin(mech.angle), 20 * b.modBulletSize, b.fireAttributes(dir, true));
        b.fireProps(mech.crouch ? 30 : 20, mech.crouch ? 43 : 32, dir, me); //cd , speed
        Matter.Body.setDensity(bullet[me], 0.0005);
        bullet[me].totalCycles = 100;
        bullet[me].endCycle = game.cycle + Math.floor(mech.crouch ? 120 : 80);
        bullet[me].restitution = 0.2;
        bullet[me].explodeRad = 275;
        bullet[me].onEnd = b.explode; //makes bullet do explosive damage before despawn
        bullet[me].minDmgSpeed = 1;
        bullet[me].onDmg = function () {
          this.endCycle = 0; //bullet ends cycle after doing damage  //this also triggers explosion
        };
        bullet[me].do = function () {
          //extra gravity for harder arcs
          this.force.y += this.mass * 0.0025;
        };
      }
    }, {
      name: "vacuum bomb", //9
      description: "fire a bomb that <strong>sucks</strong> before <strong class='color-e'>exploding</strong><br>click left mouse again to <strong>detonate</strong>",
      ammo: 0,
      ammoPack: 2,
      have: false,
      isStarterGun: false,
      fire() {
        const me = bullet.length;
        const dir = mech.angle;
        bullet[me] = Bodies.circle(mech.pos.x + 30 * Math.cos(mech.angle), mech.pos.y + 30 * Math.sin(mech.angle), 35 * b.modBulletSize, b.fireAttributes(dir, false));
        b.fireProps(10, mech.crouch ? 42 : 26, dir, me); //cd , speed

        Matter.Body.setDensity(bullet[me], 0.0002);
        bullet[me].restitution = 0.2;
        bullet[me].friction = 0.3;
        bullet[me].endCycle = Infinity
        bullet[me].explodeRad = 380 + Math.floor(Math.random() * 60);
        bullet[me].onEnd = b.explode; //makes bullet do explosive damage before despawn
        bullet[me].onDmg = function () {
          // this.endCycle = 0; //bullet ends cycle after doing damage  //this triggers explosion
        };
        bullet[me].radius = 22; //used from drawing timer
        bullet[me].isArmed = false;
        bullet[me].isSucking = false;
        bullet[me].do = function () {
          //extra gravity for harder arcs
          this.force.y += this.mass * 0.0022;
          mech.fireCDcycle = mech.cycle + 10 //can't fire until after the explosion

          //set armed and sucking status
          if (!this.isArmed && !game.mouseDown) {
            this.isArmed = true
          } else if (this.isArmed && game.mouseDown && !this.isSucking) {
            this.isSucking = true;
            this.endCycle = game.cycle + 35;
          }

          if (this.isSucking) {
            if (!mech.isBodiesAsleep) {
              const that = this
              let mag = 0.1

              function suck(who, radius = that.explodeRad * 2) {
                for (i = 0, len = who.length; i < len; i++) {
                  const sub = Vector.sub(that.position, who[i].position);
                  const dist = Vector.magnitude(sub);
                  if (dist < radius && dist > 150) {
                    knock = Vector.mult(Vector.normalise(sub), mag * who[i].mass / Math.sqrt(dist));
                    who[i].force.x += knock.x;
                    who[i].force.y += knock.y;
                  }
                }
              }
              if (game.cycle > this.endCycle - 5) {
                mag = -0.22
                suck(body)
                suck(mob)
                suck(powerUp)
                suck(bullet)
                suck([player])
              } else {
                mag = 0.1
                suck(body)
                suck(mob)
                suck(powerUp)
                suck(bullet)
                suck([player])
              }
              //keep bomb in place
              Matter.Body.setVelocity(this, {
                x: 0,
                y: 0
              });
              //draw suck
              const radius = 2.5 * this.explodeRad * (this.endCycle - game.cycle) / 35
              ctx.fillStyle = "rgba(0,0,0,0.1)";
              ctx.beginPath();
              ctx.arc(this.position.x, this.position.y, radius, 0, 2 * Math.PI);
              ctx.fill();
            }
          } else {
            // flashing lights to show armed
            if (!(game.cycle % 10)) {
              if (this.isFlashOn) {
                this.isFlashOn = false;
              } else {
                this.isFlashOn = true;
              }
            }
            if (this.isFlashOn) {
              ctx.fillStyle = "#000";
              ctx.beginPath();
              ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
              ctx.fill();
              //draw clock on timer
              ctx.fillStyle = "#f04";
              ctx.beginPath();
              ctx.arc(this.position.x, this.position.y, this.radius * 0.7, 0, 2 * Math.PI);
              ctx.fill();
            }
          }
        }
      }
    }, {
      name: "mine", //10
      description: "toss a <strong>proximity</strong> mine that <strong>sticks</strong> to walls<br>fires <strong>nails</strong> at enemies within range",
      ammo: 0,
      ammoPack: 3,
      have: false,
      isStarterGun: false,
      fire() {
        const speed = mech.crouch ? 36 : 22
        b.mine({
          x: mech.pos.x + 30 * Math.cos(mech.angle),
          y: mech.pos.y + 30 * Math.sin(mech.angle)
        }, {
          x: speed * Math.cos(mech.angle),
          y: speed * Math.sin(mech.angle)
        })
        mech.fireCDcycle = mech.cycle + Math.floor((mech.crouch ? 70 : 45) * b.modFireRate); // cool down
      }
    },
    {
      name: "spores", //11
      description: "fire orbs that discharge <strong style='letter-spacing: 2px;'>spores</strong><br><strong style='letter-spacing: 2px;'>spores</strong> seek out enemies",
      ammo: 0,
      ammoPack: 4,
      have: false,
      isStarterGun: false,
      fire() {
        const me = bullet.length;
        const dir = mech.angle;
        bullet[me] = Bodies.polygon(mech.pos.x + 30 * Math.cos(mech.angle), mech.pos.y + 30 * Math.sin(mech.angle), 20, 4.5, b.fireAttributes(dir, false));
        b.fireProps(mech.crouch ? 60 : 40, mech.crouch ? 28 : 14, dir, me); //cd , speed
        Matter.Body.setDensity(bullet[me], 0.000001);
        bullet[me].endCycle = game.cycle + 80;
        bullet[me].frictionAir = 0;
        bullet[me].friction = 0.5;
        bullet[me].restitution = 0.3;
        bullet[me].minDmgSpeed = 0;
        bullet[me].onDmg = function () {};
        bullet[me].do = function () {
          if (!mech.isBodiesAsleep) {
            const SCALE = 1.022
            Matter.Body.scale(this, SCALE, SCALE);
            this.frictionAir += 0.00023;
          }

          this.force.y += this.mass * 0.00045;

          //draw green glow
          ctx.fillStyle = "rgba(0,200,125,0.16)";
          ctx.beginPath();
          ctx.arc(this.position.x, this.position.y, 26, 0, 2 * Math.PI);
          ctx.fill();
        };

        //spawn bullets on end
        bullet[me].onEnd = function () {
          const NUM = 10;
          for (let i = 0; i < NUM; i++) {
            b.spore(this)
          }
        }

      }
    },
    {
      name: "drones", //12
      description: "deploy drones that <strong>crash</strong> into enemies<br>collisions reduce drone <strong>cycles</strong> by 1 second",
      ammo: 0,
      ammoPack: 9,
      have: false,
      isStarterGun: true,
      fire() {
        b.drone(mech.crouch ? 45 : 1)
        mech.fireCDcycle = mech.cycle + Math.floor((mech.crouch ? 25 : 5) * b.modFireRate); // cool down
      }
    },
    {
      name: "foam", //13
      description: "spray bubbly foam that <strong>sticks</strong> to enemies<br>does <strong class='color-d'>damage</strong> over time and <strong>slows</strong> movement",
      ammo: 0,
      ammoPack: 35,
      have: false,
      isStarterGun: true,
      fire() {
        mech.fireCDcycle = mech.cycle + Math.floor((mech.crouch ? 12 : 5) * b.modFireRate); // cool down
        const me = bullet.length;
        const dir = mech.angle + 0.2 * (Math.random() - 0.5)
        const RADIUS = (8 + 16 * Math.random()) * b.modBulletSize
        bullet[me] = Bodies.polygon(mech.pos.x + 30 * Math.cos(mech.angle), mech.pos.y + 30 * Math.sin(mech.angle), 25, RADIUS, {
          angle: dir,
          density: 0.00005, //  0.001 is normal density
          inertia: Infinity,
          frictionAir: 0.003,
          friction: 0.2,
          restitution: 0.2,
          dmg: 0, //damage done in addition to the damage from momentum
          classType: "bullet",
          collisionFilter: {
            category: cat.bullet,
            mask: cat.map | cat.body | cat.mob | cat.mobShield
          },
          minDmgSpeed: 0,
          endCycle: Infinity,
          count: 0,
          radius: RADIUS,
          target: null,
          targetVertex: null,
          onDmg(who) {
            if (!this.target && who.alive && who.dropPowerUp && !who.isShielded) {
              this.target = who;
              this.collisionFilter.category = cat.body;
              this.collisionFilter.mask = null;

              let bestVertexDistance = Infinity
              let bestVertex = null
              for (let i = 0; i < this.target.vertices.length; i++) {
                const dist = Vector.magnitude(Vector.sub(this.position, this.target.vertices[i]));
                if (dist < bestVertexDistance) {
                  bestVertex = i
                  bestVertexDistance = dist
                }
              }
              this.targetVertex = bestVertex
            }
          },
          onEnd() {},
          do() {
            ctx.beginPath() //draw white circle
            ctx.arc(this.position.x, this.position.y, this.radius * 0.97 - 1.6, 0, 2 * Math.PI);
            ctx.fillStyle = "#fff"
            ctx.fill()

            if (!mech.isBodiesAsleep) { //if time dilation isn't active
              this.force.y += this.mass * 0.00006; //gravity

              if (this.count < 17) {
                this.count++
                //grow
                const SCALE = 1.08
                Matter.Body.scale(this, SCALE, SCALE);
                this.radius *= SCALE;
              } else {
                //shrink
                const SCALE = 1 - 0.0035 / b.isModBulletsLastLonger
                Matter.Body.scale(this, SCALE, SCALE);
                this.radius *= SCALE;
                if (this.radius < 14) this.endCycle = 0;
              }

              if (this.target && this.target.alive) { //if stuck to a target
                Matter.Body.setPosition(this, this.target.vertices[this.targetVertex])
                Matter.Body.setVelocity(this.target, Vector.mult(this.target.velocity, 0.9))
                Matter.Body.setAngularVelocity(this.target, this.target.angularVelocity * 0.9)
                this.target.damage(b.dmgScale * 0.005);
              } else if (this.target !== null) { //look for a new target
                this.target = null
                this.collisionFilter.category = cat.bullet;
                this.collisionFilter.mask = cat.map | cat.body | cat.mob | cat.mobBullet | cat.mobShield
              }
            }
          }
        });
        World.add(engine.world, bullet[me]); //add bullet to world
        const SPEED = mech.crouch ? 22 : 12 - RADIUS * 0.25;
        Matter.Body.setVelocity(bullet[me], {
          x: SPEED * Math.cos(dir),
          y: SPEED * Math.sin(dir)
        });
      }
    },
    {
      name: "laser", //14
      description: "emit a beam of collimated coherent <strong>light</strong><br>drains <strong class='color-f'>energy</strong> instead of ammunition",
      ammo: 0,
      ammoPack: Infinity,
      have: false,
      isStarterGun: true,
      fire() {
        const FIELD_DRAIN = 0.002 //laser drains energy as well as bullets
        const damage = 0.05
        if (mech.fieldMeter < FIELD_DRAIN) {
          mech.fireCDcycle = mech.cycle + 100; // cool down if out of energy
        } else {
          mech.fieldMeter -= mech.fieldRegen + FIELD_DRAIN
          let best;
          const color = "#f00";
          const range = 3000;
          const path = [{
              x: mech.pos.x + 20 * Math.cos(mech.angle),
              y: mech.pos.y + 20 * Math.sin(mech.angle)
            },
            {
              x: mech.pos.x + range * Math.cos(mech.angle),
              y: mech.pos.y + range * Math.sin(mech.angle)
            }
          ];
          const vertexCollision = function (v1, v1End, domain) {
            for (let i = 0; i < domain.length; ++i) {
              let vertices = domain[i].vertices;
              const len = vertices.length - 1;
              for (let j = 0; j < len; j++) {
                results = game.checkLineIntersection(v1, v1End, vertices[j], vertices[j + 1]);
                if (results.onLine1 && results.onLine2) {
                  const dx = v1.x - results.x;
                  const dy = v1.y - results.y;
                  const dist2 = dx * dx + dy * dy;
                  if (dist2 < best.dist2 && (!domain[i].mob || domain[i].alive)) {
                    best = {
                      x: results.x,
                      y: results.y,
                      dist2: dist2,
                      who: domain[i],
                      v1: vertices[j],
                      v2: vertices[j + 1]
                    };
                  }
                }
              }
              results = game.checkLineIntersection(v1, v1End, vertices[0], vertices[len]);
              if (results.onLine1 && results.onLine2) {
                const dx = v1.x - results.x;
                const dy = v1.y - results.y;
                const dist2 = dx * dx + dy * dy;
                if (dist2 < best.dist2 && (!domain[i].mob || domain[i].alive)) {
                  best = {
                    x: results.x,
                    y: results.y,
                    dist2: dist2,
                    who: domain[i],
                    v1: vertices[0],
                    v2: vertices[len]
                  };
                }
              }
            }
          };

          const checkForCollisions = function () {
            best = {
              x: null,
              y: null,
              dist2: Infinity,
              who: null,
              v1: null,
              v2: null
            };
            vertexCollision(path[path.length - 2], path[path.length - 1], mob);
            vertexCollision(path[path.length - 2], path[path.length - 1], map);
            vertexCollision(path[path.length - 2], path[path.length - 1], body);
          };
          const laserHitMob = function (dmg) {
            if (best.who.alive) {
              dmg *= b.dmgScale * damage;
              best.who.damage(dmg);
              best.who.locatePlayer();
              //draw mob damage circle
              ctx.fillStyle = color;
              ctx.beginPath();
              ctx.arc(path[path.length - 1].x, path[path.length - 1].y, Math.sqrt(dmg) * 100, 0, 2 * Math.PI);
              ctx.fill();
            }
          };

          const reflection = function () {
            // https://math.stackexchange.com/questions/13261/how-to-get-a-reflection-vector
            const n = Vector.perp(Vector.normalise(Vector.sub(best.v1, best.v2)));
            const d = Vector.sub(path[path.length - 1], path[path.length - 2]);
            const nn = Vector.mult(n, 2 * Vector.dot(d, n));
            const r = Vector.normalise(Vector.sub(d, nn));
            path[path.length] = Vector.add(Vector.mult(r, range), path[path.length - 1]);
          };
          //beam before reflection
          checkForCollisions();
          if (best.dist2 != Infinity) {
            //if hitting something
            path[path.length - 1] = {
              x: best.x,
              y: best.y
            };
            laserHitMob(1);

            //1st reflection beam
            reflection();
            //ugly bug fix: this stops the reflection on a bug where the beam gets trapped inside a body
            let who = best.who;
            checkForCollisions();
            if (best.dist2 != Infinity) {
              //if hitting something
              path[path.length - 1] = {
                x: best.x,
                y: best.y
              };
              laserHitMob(0.8);

              //2nd reflection beam
              //ugly bug fix: this stops the reflection on a bug where the beam gets trapped inside a body
              if (who !== best.who) {
                reflection();
                checkForCollisions();
                if (best.dist2 != Infinity) {
                  //if hitting something
                  path[path.length - 1] = {
                    x: best.x,
                    y: best.y
                  };
                  laserHitMob(0.63);


                  reflection();
                  checkForCollisions();
                  if (best.dist2 != Infinity) {
                    //if hitting something
                    path[path.length - 1] = {
                      x: best.x,
                      y: best.y
                    };
                    laserHitMob(0.5);
                  }
                }
              }
            }
          }
          ctx.fillStyle = color;
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
          ctx.lineDashOffset = 300 * Math.random()
          // ctx.setLineDash([200 * Math.random(), 250 * Math.random()]);

          ctx.setLineDash([50 + 120 * Math.random(), 50 * Math.random()]);
          for (let i = 1, len = path.length; i < len; ++i) {
            ctx.beginPath();
            ctx.moveTo(path[i - 1].x, path[i - 1].y);
            ctx.lineTo(path[i].x, path[i].y);
            ctx.stroke();
            ctx.globalAlpha *= 0.65; //reflections are less intense
            // ctx.globalAlpha -= 0.1; //reflections are less intense
          }
          ctx.setLineDash([0, 0]);
          ctx.globalAlpha = 1;
        }
      }
    },
    {
      name: "pulse", //15
      description: "convert 25% of your <strong class='color-f'>energy</strong> into a pulsed laser<br>instantly initiates a fusion <strong class='color-e'>explosion</strong>",
      ammo: 0,
      ammoPack: Infinity,
      have: false,
      isStarterGun: true,
      fire() {
        //calculate laser collision
        let best;
        let range = 3000
        const path = [{
            x: mech.pos.x + 20 * Math.cos(mech.angle),
            y: mech.pos.y + 20 * Math.sin(mech.angle)
          },
          {
            x: mech.pos.x + range * Math.cos(mech.angle),
            y: mech.pos.y + range * Math.sin(mech.angle)
          }
        ];
        const vertexCollision = function (v1, v1End, domain) {
          for (let i = 0; i < domain.length; ++i) {
            let vertices = domain[i].vertices;
            const len = vertices.length - 1;
            for (let j = 0; j < len; j++) {
              results = game.checkLineIntersection(v1, v1End, vertices[j], vertices[j + 1]);
              if (results.onLine1 && results.onLine2) {
                const dx = v1.x - results.x;
                const dy = v1.y - results.y;
                const dist2 = dx * dx + dy * dy;
                if (dist2 < best.dist2 && (!domain[i].mob || domain[i].alive)) {
                  best = {
                    x: results.x,
                    y: results.y,
                    dist2: dist2,
                    who: domain[i],
                    v1: vertices[j],
                    v2: vertices[j + 1]
                  };
                }
              }
            }
            results = game.checkLineIntersection(v1, v1End, vertices[0], vertices[len]);
            if (results.onLine1 && results.onLine2) {
              const dx = v1.x - results.x;
              const dy = v1.y - results.y;
              const dist2 = dx * dx + dy * dy;
              if (dist2 < best.dist2 && (!domain[i].mob || domain[i].alive)) {
                best = {
                  x: results.x,
                  y: results.y,
                  dist2: dist2,
                  who: domain[i],
                  v1: vertices[0],
                  v2: vertices[len]
                };
              }
            }
          }
        };

        //check for collisions
        best = {
          x: null,
          y: null,
          dist2: Infinity,
          who: null,
          v1: null,
          v2: null
        };
        vertexCollision(path[0], path[1], mob);
        vertexCollision(path[0], path[1], map);
        vertexCollision(path[0], path[1], body);
        if (best.dist2 != Infinity) { //if hitting something
          path[path.length - 1] = {
            x: best.x,
            y: best.y
          };
        }

        //use energy to explode
        const energy = 0.3 * Math.min(mech.fieldMeter, 1.75)
        mech.fieldMeter -= energy
        if (best.who) b.explosion(path[1], 950 * energy)
        mech.fireCDcycle = mech.cycle + Math.floor(60 * b.modFireRate); // cool down

        //draw laser beam
        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);
        ctx.lineTo(path[1].x, path[1].y);
        ctx.strokeStyle = "rgba(255,0,0,0.13)"
        ctx.lineWidth = 60 * energy / 0.2
        ctx.stroke();
        ctx.strokeStyle = "rgba(255,0,0,0.2)"
        ctx.lineWidth = 18
        ctx.stroke();
        ctx.strokeStyle = "#f00";
        ctx.lineWidth = 4
        ctx.stroke();

        //draw little dots along the laser path
        const sub = Vector.sub(path[1], path[0])
        const mag = Vector.magnitude(sub)
        for (let i = 0, len = Math.floor(mag * 0.03 * energy / 0.2); i < len; i++) {
          const dist = Math.random()
          game.drawList.push({
            x: path[0].x + sub.x * dist + 13 * (Math.random() - 0.5),
            y: path[0].y + sub.y * dist + 13 * (Math.random() - 0.5),
            radius: 1 + 4 * Math.random(),
            color: "rgba(255,0,0,0.5)",
            time: Math.floor(2 + 33 * Math.random() * Math.random())
          });
        }
      }
    },
    // {
    //   name: "dwarf star", //14
    //   description: "drop a mine that gravitational pulls in matter",
    //   ammo: 0,
    //   ammoPack: 1000,
    //   have: false,
    //   isStarterGun: false,
    //   fire() {
    //     const me = bullet.length;
    //     const dir = mech.angle
    //     const TOTAL_CYCLES = 1020
    //     bullet[me] = Bodies.circle(mech.pos.x + 30 * Math.cos(dir), mech.pos.y + 30 * Math.sin(dir), 3 * b.modBulletSize, {
    //       density: 0.05,
    //       //frictionAir: 0.01,			
    //       restitution: 0,
    //       angle: 0,
    //       friction: 1,
    //       // frictionAir: 1,
    //       endCycle: game.cycle + TOTAL_CYCLES,
    //       dmg: 0, //damage done in addition to the damage from momentum
    //       classType: "bullet",
    //       collisionFilter: {
    //         category: 0x000100,
    //         mask: 0x010011 //mask: 0x000101,  //for self collision
    //       },
    //       minDmgSpeed: 5,
    //       range: 0,
    //       onDmg() {
    //         this.endCycle = 0;
    //       }, //this.endCycle = 0  //triggers despawn
    //       onEnd() {},
    //       do() {
    //         this.force.y += this.mass * 0.005;
    //         this.range += 0.5

    //         //damage nearby mobs
    //         const dmg = b.dmgScale * 0.02
    //         for (let i = 0, len = mob.length; i < len; ++i) {
    //           if (mob[i].alive) {
    //             sub = Vector.sub(this.position, mob[i].position);
    //             dist = Vector.magnitude(sub) - mob[i].radius;
    //             if (dist < this.range) {
    //               mob[i].damage(dmg);
    //               mob[i].locatePlayer();
    //             }
    //           }
    //         }

    //         //pull in body, and power ups?, and bullets?
    //         for (let i = 0, len = body.length; i < len; ++i) {
    //           sub = Vector.sub(this.position, body[i].position);
    //           dist = Vector.magnitude(sub)
    //           if (dist < this.range) {
    //             this.range += body[i].mass * 2
    //             Matter.World.remove(engine.world, body[i]);
    //             body.splice(i, 1);
    //             break;
    //           }
    //         }

    //         //draw
    //         const opacity = (this.endCycle - game.cycle) / TOTAL_CYCLES
    //         ctx.fillStyle = `rgba(170,220,255,${opacity})`;
    //         ctx.beginPath();
    //         ctx.arc(this.position.x, this.position.y, this.range, 0, 2 * Math.PI);
    //         ctx.fill();
    //       }
    //     });
    //     b.fireProps(60, 0, dir, me); //cd , speed
    //   }
    // },
    // {
    //   name: "kinetic slugs", //1
    //   description: "fire a large <strong>rod</strong> that does excessive physical <strong class='color-d'>damage</strong><br><em>high recoil</em>",
    //   ammo: 0,
    //   ammoPack: 5,
    //   have: false,
    //   isStarterGun: true,
    //   fire() {
    //     b.muzzleFlash(45);
    //     // mobs.alert(800);
    //     const me = bullet.length;
    //     const dir = mech.angle;
    //     bullet[me] = Bodies.rectangle(mech.pos.x + 50 * Math.cos(mech.angle), mech.pos.y + 50 * Math.sin(mech.angle), 70 * b.modBulletSize, 30 * b.modBulletSize, b.fireAttributes(dir));
    //     b.fireProps(mech.crouch ? 55 : 40, 50, dir, me); //cd , speed
    //     bullet[me].endCycle = game.cycle + Math.floor(180 * b.isModBulletsLastLonger);
    //     bullet[me].do = function () {
    //       this.force.y += this.mass * 0.0005;
    //     };

    //     //knock back
    //     const KNOCK = ((mech.crouch) ? 0.025 : 0.25) * b.modBulletSize * b.modBulletSize
    //     player.force.x -= KNOCK * Math.cos(dir)
    //     player.force.y -= KNOCK * Math.sin(dir) * 0.3 //reduce knock back in vertical direction to stop super jumps
    //   },
    // {
    //   name: "triboelectricty", //14
    //   description: "release <strong>particles</strong> that quickly seek out targets",
    //   ammo: 0,
    //   ammoPack: 40,
    //   have: false,
    //   isStarterGun: true,
    //   fire() {
    //     const dir = mech.angle + 0.2 * (Math.random() - 0.5);
    //     const me = bullet.length;
    //     const RADIUS = 6 * b.modBulletSize
    //     bullet[me] = Bodies.circle(mech.pos.x + 30 * Math.cos(mech.angle), mech.pos.y + 30 * Math.sin(mech.angle), RADIUS, {
    //       angle: dir,
    //       inertia: Infinity,
    //       // friction: 0.05,
    //       // frictionAir: 0.05,
    //       restitution: 0.8,
    //       dmg: 0.14, //damage done in addition to the damage from momentum
    //       lookFrequency: 3,
    //       endCycle: game.cycle + Math.floor(120 * b.isModBulletsLastLonger),
    //       classType: "bullet",
    //       collisionFilter: {
    //         category: 0x000100,
    //         mask: 0x010111 //self collide
    //       },
    //       minDmgSpeed: 0,
    //       lockedOn: null,
    //       isFollowMouse: true,
    //       onDmg() {
    //         this.endCycle = 0;
    //       },
    //       onEnd() {},
    //       do() {
    //         if (this.lockedOn) { //accelerate towards mobs
    //           this.force = Vector.mult(Vector.normalise(Vector.sub(this.position, this.lockedOn.position)), -this.mass * 0.01)
    //           Matter.Body.setVelocity(this, {
    //             x: this.velocity.x * 0.93,
    //             y: this.velocity.y * 0.93
    //           });
    //         } else {
    //           this.force.y += this.mass * 0.0004;
    //         }
    //       }
    //     })

    //     b.fireProps(mech.crouch ? 19 : 15, mech.crouch ? 45 : 30, dir, me); //cd , speed

    //     //find mob targets
    //     let closeDist = Infinity;
    //     for (let i = 0, len = mob.length; i < len; ++i) {
    //       if (
    //         Matter.Query.ray(map, bullet[me].position, mob[i].position).length === 0 &&
    //         Matter.Query.ray(body, bullet[me].position, mob[i].position).length === 0
    //       ) {
    //         const TARGET_VECTOR = Vector.sub(bullet[me].position, mob[i].position)
    //         const DIST = Vector.magnitude(TARGET_VECTOR);
    //         if (DIST < closeDist) {
    //           closeDist = DIST;
    //           bullet[me].lockedOn = mob[i]
    //         }
    //       }
    //     }
    //   }
    // },
    // {
  ]
};