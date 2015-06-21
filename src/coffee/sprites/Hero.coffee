class Hero extends VirusSprite
  constructor: (x, y, w, h) ->
    super(x, y, w, h, '/img/hero.png')

  applyKeysDown: ->
    if LEFT in Game.keysDown
      Game.hero.lowerVX()
    if RIGHT in Game.keysDown
      Game.hero.raiseVX()
    if UP in Game.keysDown
      Game.hero.raiseVY()
    if DOWN in Game.keysDown
      Game.hero.lowerVY()

  tick: ->
    @applyVelocity()
    @applyGravity()
    @applyKeysDown()
