(function() {
  var Hero,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Hero = (function(_super) {
    __extends(Hero, _super);

    function Hero(x, y, w, h) {
      Hero.__super__.constructor.call(this, x, y, w, h, '/img/hero.png');
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

}).call(this);
