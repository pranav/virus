(function() {
  var Game, HEIGHT, Hero, Sprite, WIDTH, animate, mainLoop, renderer, setupStage, stage,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  WIDTH = 800;

  HEIGHT = 600;

  stage = new PIXI.Stage(0xFFFFFF, true);

  renderer = new PIXI.autoDetectRenderer(WIDTH, HEIGHT, null, false, true);

  document.body.appendChild(renderer.view);

  Sprite = (function() {
    function Sprite(x, y, width, height) {
      this.sprite.x = x;
      this.sprite.y = y;
      this.sprite.anchor.x = 0.5;
      this.sprite.anchor.y = 0.5;
    }

    return Sprite;

  })();

  Hero = (function(_super) {
    __extends(Hero, _super);

    function Hero(x, y, w, h) {
      this.sprite = new PIXI.Sprite.fromImage('/img/hero.png');
      Hero.__super__.constructor.call(this, x, y, w, h);
    }

    return Hero;

  })(Sprite);

  Game = {
    entities: {
      hero: new Hero(WIDTH / 3, HEIGHT / 2, 100, 100)
    }
  };

  setupStage = function() {
    return stage.addChild(Game.hero);
  };

  mainLoop = function() {
    return console.log("LOOOPING");
  };

  animate = function() {
    mainLoop();
    requestAnimationFrame(animate);
    return renderer.render(stage);
  };

  setupStage();

  requestAnimationFrame(animate);

}).call(this);
