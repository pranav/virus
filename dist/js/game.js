(function() {
  var DOWN, Game, GameSettings, HEIGHT, Hero, LEFT, Person, RIGHT, UP, VirusSprite, WIDTH, Zombie, addGameToStage, animate, grabAndSetVars, i, mainLoop, renderer, stage, virusOnKeyDown, virusOnKeyUp, zombiesTouchingPerson,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  WIDTH = 800;

  HEIGHT = 600;

  renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT, {
    backgroundColor: 0x1099bb
  });

  document.getElementById("gamecontainer").appendChild(renderer.view);

  stage = new PIXI.Container();

  LEFT = 37;

  UP = 40;

  DOWN = 38;

  RIGHT = 39;

  GameSettings = {
    zombieSpeed: 3
  };

  VirusSprite = (function() {
    function VirusSprite(x, y, w, h, image) {
      this.sprite = new PIXI.Sprite(PIXI.Texture.fromImage(image));
      this.sprite.position.x = x;
      this.sprite.position.y = y;
      this.sprite.anchor.x = 0.5;
      this.sprite.anchor.y = 0.5;
      this.sprite.width = w;
      this.sprite.height = h;
      this.vx = 0;
      this.vy = 0;
      this.movementSpeed = 3;
      this.MAX_VELOCITY = 6;
      this.GRAVITY = 1;
    }

    VirusSprite.prototype.lowerVX = function() {
      if (this.vx > -this.MAX_VELOCITY) {
        return this.vx -= this.movementSpeed;
      }
    };

    VirusSprite.prototype.raiseVX = function() {
      if (this.vx < this.MAX_VELOCITY) {
        return this.vx += this.movementSpeed;
      }
    };

    VirusSprite.prototype.lowerVY = function() {
      if (this.vy > -this.MAX_VELOCITY) {
        return this.vy -= this.movementSpeed;
      }
    };

    VirusSprite.prototype.raiseVY = function() {
      if (this.vy < this.MAX_VELOCITY) {
        return this.vy += this.movementSpeed;
      }
    };

    VirusSprite.prototype.applyVelocity = function() {
      if (this.sprite.position.x < WIDTH - this.sprite.width / 2 && this.sprite.position.x > this.sprite.width / 2) {
        this.sprite.position.x += this.vx;
      } else if (this.sprite.position.x > WIDTH - this.sprite.width) {
        this.sprite.position.x = WIDTH - this.sprite.width / 2 - 1;
        this.vx = 0;
      } else if (this.sprite.position.x <= this.sprite.width / 2) {
        this.sprite.position.x = this.sprite.width / 2 + 1;
        this.vx = 0;
      }
      if (this.sprite.position.y < HEIGHT - this.sprite.height / 2 && this.sprite.position.y > this.sprite.height / 2) {
        return this.sprite.position.y += this.vy;
      } else if (this.sprite.position.y > HEIGHT - this.sprite.height) {
        this.sprite.position.y = HEIGHT - this.sprite.height / 2 - 1;
        return this.vy = 0;
      } else if (this.sprite.position.y <= this.sprite.height / 2) {
        this.sprite.position.y = this.sprite.height / 2 + 1;
        return this.vy = 0;
      }
    };

    VirusSprite.prototype.applyGravity = function() {
      if (this.vx > 0) {
        this.vx -= this.GRAVITY;
      } else if (this.vx < 0) {
        this.vx += this.GRAVITY;
      }
      if (this.vy > 0) {
        return this.vy -= this.GRAVITY;
      } else if (this.vy < 0) {
        return this.vy += this.GRAVITY;
      }
    };

    VirusSprite.prototype.autopilot = function() {
      var r;
      r = Math.random();
      if (r > 0.75) {
        this.raiseVX();
      }
      if (r > 0.5 && r < 0.75) {
        this.lowerVX();
      }
      if (r > 0.25 && r < 0.5) {
        this.raiseVY();
      }
      if (r < 0.25) {
        return this.lowerVY();
      }
    };

    VirusSprite.prototype.touching = function(other_sprite) {
      var magicNumber;
      magicNumber = 7;
      return (Math.abs(other_sprite.sprite.position.x - this.sprite.position.x) < this.sprite.width - magicNumber) && (Math.abs(other_sprite.sprite.position.y - this.sprite.position.y) < this.sprite.height - magicNumber);
    };

    VirusSprite.prototype.tick = function() {
      this.applyVelocity();
      this.applyGravity();
      return this.autopilot();
    };

    return VirusSprite;

  })();

  Hero = (function(_super) {
    __extends(Hero, _super);

    function Hero(x, y, w, h) {
      Hero.__super__.constructor.call(this, x, y, w, h, '/virus/dist/img/hero.png');
    }

    Hero.prototype.applyKeysDown = function() {
      if (__indexOf.call(Game.keysDown, LEFT) >= 0) {
        Game.hero.lowerVX();
      }
      if (__indexOf.call(Game.keysDown, RIGHT) >= 0) {
        Game.hero.raiseVX();
      }
      if (__indexOf.call(Game.keysDown, UP) >= 0) {
        Game.hero.raiseVY();
      }
      if (__indexOf.call(Game.keysDown, DOWN) >= 0) {
        return Game.hero.lowerVY();
      }
    };

    Hero.prototype.tick = function() {
      this.applyVelocity();
      this.applyGravity();
      return this.applyKeysDown();
    };

    return Hero;

  })(VirusSprite);

  Person = (function(_super) {
    __extends(Person, _super);

    function Person(x, y) {
      Person.__super__.constructor.call(this, x, y, 50, 50, '/virus/dist/img/healthy_person.png');
    }

    return Person;

  })(VirusSprite);

  Zombie = (function(_super) {
    __extends(Zombie, _super);

    function Zombie(x, y, speed) {
      Zombie.__super__.constructor.call(this, x, y, 50, 50, '/virus/dist/img/infected_person.png');
      this.movementSpeed = speed;
    }

    return Zombie;

  })(VirusSprite);

  virusOnKeyDown = function(keyEvent) {
    var _ref;
    if ((_ref = keyEvent.keyCode) === LEFT || _ref === RIGHT || _ref === UP || _ref === DOWN) {
      Game.keysDown.push(keyEvent.keyCode);
    }
    if (keyEvent.keyCode === 80) {
      return Game.paused = !Game.paused;
    }
  };

  virusOnKeyUp = function(keyEvent) {
    return Game.keysDown = Game.keysDown.filter(function(x) {
      return x !== keyEvent.keyCode;
    });
  };

  Game = {
    settings: GameSettings,
    hero: new Hero(WIDTH / 4, HEIGHT / 2, 50, 50),
    people: [],
    zombies: [new Zombie(3 * WIDTH / 4, HEIGHT / 2, GameSettings.zombieSpeed)],
    keysDown: [],
    startTime: +new Date(),
    paused: false,
    gameover: false
  };

  Game.people = (function() {
    var _i, _results;
    _results = [];
    for (i = _i = 1; _i <= 7; i = ++_i) {
      _results.push(new Person(i * 100, 50));
    }
    return _results;
  })();

  Game.people = Game.people.concat((function() {
    var _i, _results;
    _results = [];
    for (i = _i = 1; _i <= 7; i = ++_i) {
      _results.push(new Person(i * 100, HEIGHT - HEIGHT / 7));
    }
    return _results;
  })());

  Game.people = Game.people.concat((function() {
    var _i, _results;
    _results = [];
    for (i = _i = 1; _i <= 7; i = ++_i) {
      _results.push(new Person(i * 100, HEIGHT - HEIGHT / 5));
    }
    return _results;
  })());

  Game.people = Game.people.concat((function() {
    var _i, _results;
    _results = [];
    for (i = _i = 1; _i <= 7; i = ++_i) {
      _results.push(new Person(i * 100, HEIGHT - HEIGHT / 3));
    }
    return _results;
  })());

  addGameToStage = function() {
    var person, zombie, _i, _j, _len, _len1, _ref, _ref1;
    _ref = Game.people;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      person = _ref[_i];
      stage.addChild(person.sprite);
    }
    _ref1 = Game.zombies;
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      zombie = _ref1[_j];
      stage.addChild(zombie.sprite);
    }
    return stage.addChild(Game.hero.sprite);
  };

  addGameToStage();

  mainLoop = function() {
    var peopleTouchingZombies, person, text, timeLasted, zombie, _i, _j, _len, _len1, _ref, _ref1;
    grabAndSetVars();
    if (Game.paused || Game.gameover) {
      return true;
    }
    if (!zombiesTouchingPerson(Game.hero)) {
      Game.hero.tick();
      _ref = Game.people;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        person = _ref[_i];
        person.tick();
      }
      _ref1 = Game.zombies;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        zombie = _ref1[_j];
        zombie.tick();
      }
      peopleTouchingZombies = Game.people.filter(function(person) {
        return zombiesTouchingPerson(person);
      });
      if (peopleTouchingZombies.length > 0) {
        Game.zombies = Game.zombies.concat((function() {
          var _k, _len2, _results;
          _results = [];
          for (_k = 0, _len2 = peopleTouchingZombies.length; _k < _len2; _k++) {
            person = peopleTouchingZombies[_k];
            _results.push(new Zombie(person.sprite.position.x, person.sprite.position.y, Game.settings.zombieSpeed));
          }
          return _results;
        })());
        Game.people = Game.people.filter(function(person) {
          return !zombiesTouchingPerson(person);
        });
        stage.removeChildren();
      }
      return addGameToStage();
    } else {
      if (Game.endTime == null) {
        Game.endTime = +new Date();
      }
      timeLasted = parseInt(Game.endTime / 1000 - Game.startTime / 1000);
      text = new PIXI.Text("You were infected. You lose. You lasted " + timeLasted + " seconds.", {
        font: "36px Impact",
        fill: "#FFFFFF",
        stroke: "#000000",
        strokeThickness: 5
      });
      text.x = 10;
      text.y = HEIGHT / 2;
      stage.addChild(text);
      return Game.gameover = true;
    }
  };

  grabAndSetVars = function() {
    return Game.settings.zombieSpeed = parseInt(document.getElementById("speed").value);
  };

  zombiesTouchingPerson = function(person) {
    return Game.zombies.reduce(function(touchingany, zombie) {
      return person.touching(zombie) || touchingany;
    }, false);
  };

  animate = function() {
    mainLoop();
    requestAnimationFrame(animate);
    return renderer.render(stage);
  };

  animate();

  window.addEventListener("keydown", virusOnKeyDown);

  window.addEventListener("keyup", virusOnKeyUp);

  this.Virus = Game;

}).call(this);
