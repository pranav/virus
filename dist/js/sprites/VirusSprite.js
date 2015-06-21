(function() {
  var VirusSprite;

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
      this.movementSpeed = 2;
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

    VirusSprite.prototype.tick = function() {
      this.applyVelocity();
      return this.applyGravity();
    };

    return VirusSprite;

  })();

}).call(this);
