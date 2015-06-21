# Setup
WIDTH = 800
HEIGHT = 600
stage = new PIXI.Stage(0xFFFFFF, true)
renderer = new PIXI.autoDetectRenderer(WIDTH, HEIGHT, null, false, true)
document.body.appendChild(renderer.view)




class Sprite
  constructor: (x, y, width, height) ->
    @sprite.x = x
    @sprite.y = y
    @sprite.anchor.x = 0.5
    @sprite.anchor.y = 0.5


class Hero extends Sprite

  constructor: (x, y, w, h) ->
    @sprite = new PIXI.Sprite.fromImage('/img/hero.png')
    super(x, y, w, h)


Game =
  entities:
    hero: new Hero(WIDTH/3, HEIGHT/2, 100, 100)


setupStage = ->
  stage.addChild(Game.hero)

mainLoop = ->
  console.log("LOOOPING")

animate = ->
  mainLoop()
  requestAnimationFrame(animate)
  renderer.render(stage)

setupStage()
requestAnimationFrame(animate)
