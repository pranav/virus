class VirusSprite
  constructor: (x, y, w, h, image) ->
    @sprite = new PIXI.Sprite(PIXI.Texture.fromImage(image))
    @sprite.position.x = x
    @sprite.position.y = y
    @sprite.anchor.x = 0.5
    @sprite.anchor.y = 0.5
    @sprite.width = w
    @sprite.height = h
    @vx = 0
    @vy = 0
    @movementSpeed = 2
    @MAX_VELOCITY = 6
    @GRAVITY = 1

  lowerVX: ->
    if @vx > -@MAX_VELOCITY
      @vx -= @movementSpeed

  raiseVX: ->
    if @vx < @MAX_VELOCITY
      @vx += @movementSpeed

  lowerVY: ->
    if @vy > -@MAX_VELOCITY
      @vy -= @movementSpeed

  raiseVY: ->
    if @vy < @MAX_VELOCITY
      @vy += @movementSpeed

  applyVelocity: ->
    if @sprite.position.x < WIDTH-@sprite.width/2 and @sprite.position.x > @sprite.width/2
      @sprite.position.x += @vx
    else if @sprite.position.x > WIDTH-@sprite.width
      @sprite.position.x = WIDTH-@sprite.width/2 - 1
      @vx = 0
    else if @sprite.position.x <= @sprite.width/2
      @sprite.position.x = @sprite.width/2 + 1
      @vx = 0

    if @sprite.position.y < HEIGHT-@sprite.height/2 and @sprite.position.y > @sprite.height/2
      @sprite.position.y += @vy
    else if @sprite.position.y > HEIGHT-@sprite.height
      @sprite.position.y = HEIGHT-@sprite.height/2 - 1
      @vy = 0
    else if @sprite.position.y <= @sprite.height/2
      @sprite.position.y = @sprite.height/2 + 1
      @vy = 0

  applyGravity: ->
    if @vx > 0
      @vx -= @GRAVITY
    else if @vx < 0
      @vx += @GRAVITY

    if @vy > 0
      @vy -= @GRAVITY
    else if @vy < 0
      @vy += @GRAVITY

  tick: ->
    @applyVelocity()
    @applyGravity()
