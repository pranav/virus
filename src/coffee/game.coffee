# Environment Setup
WIDTH = 800
HEIGHT = 600
renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT, {backgroundColor : 0x1099bb})
document.body.appendChild(renderer.view);
stage = new PIXI.Container();

# KEYS
LEFT = 37
UP = 40
DOWN = 38
RIGHT = 39

# Sprite definitions
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
    @movementSpeed = 3
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

  autopilot: ->
    r = Math.random()
    if r > 0.75
      @raiseVX()
    if r > 0.5 and r < 0.75
      @lowerVX()
    if r > 0.25 and r < 0.5
      @raiseVY()
    if r < 0.25
      @lowerVY()

  touching: (other_sprite) ->
    (Math.abs(other_sprite.sprite.position.x - @sprite.position.x) < @sprite.width) and
      (Math.abs(other_sprite.sprite.position.y - @sprite.position.y) < @sprite.height)

  tick: ->
    @applyVelocity()
    @applyGravity()
    @autopilot()


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


class Person extends VirusSprite
  constructor: (x, y) ->
    super(x, y, 50, 50, '/img/healthy_person.png')

class Zombie extends VirusSprite
  constructor: (x, y) ->
    super(x, y, 50, 50, '/img/infected_person.png')

# KEY HANDLERS
virusOnKeyDown = (keyEvent) ->
  if keyEvent.keyCode in [LEFT, RIGHT, UP, DOWN]
    Game.keysDown.push(keyEvent.keyCode)


virusOnKeyUp = (keyEvent) ->
  Game.keysDown = Game.keysDown.filter (x) -> x != keyEvent.keyCode


# Setup the Game object
Game =
  hero: new Hero(WIDTH/4, HEIGHT/2, 50, 50)
  people: []
  zombies: [new Zombie(3*WIDTH/4, HEIGHT/2)]
  keysDown: []
  startTime: +new Date()

Game.people = (new Person(i*100, 50) for i in [1..7])
Game.people = Game.people.concat((new Person(i*100, HEIGHT-HEIGHT/7) for i in [1..7]))
Game.people = Game.people.concat((new Person(i*100, HEIGHT-HEIGHT/5) for i in [1..7]))
Game.people = Game.people.concat((new Person(i*100, HEIGHT-HEIGHT/3) for i in [1..7]))

addGameToStage = ->
  (stage.addChild(person.sprite) for person in Game.people)
  (stage.addChild(zombie.sprite) for zombie in Game.zombies)
  stage.addChild(Game.hero.sprite)
addGameToStage()


mainLoop = () ->
  if not zombiesTouchingPerson(Game.hero)
    Game.hero.tick()
    (person.tick() for person in Game.people)
    (zombie.tick() for zombie in Game.zombies)
    # If any people are touching zombies, they get removed from people and converted into a zombie
    peopleTouchingZombies = Game.people.filter (person) -> zombiesTouchingPerson(person)

    if peopleTouchingZombies.length > 0
      Game.zombies = Game.zombies.concat(new Zombie(person.sprite.position.x, person.sprite.position.y) for person in peopleTouchingZombies)
      Game.people = Game.people.filter (person) -> not zombiesTouchingPerson(person)
      stage.removeChildren()
    addGameToStage()
  else
    if not Game.endTime?
      Game.endTime = (+new Date())
    timeLasted = parseInt(Game.endTime/1000 - Game.startTime/1000)
    text = new PIXI.Text("You were infected. You lose. You lasted #{timeLasted} seconds.", {
      font: "24px Impact bold",
      fill: "#FFFFFF",
      stroke: "#000000",
      strokeThickness: 5
    })
    text.x = 10
    text.y = HEIGHT/2
    stage.addChild(text)


zombiesTouchingPerson = (person) ->
  Game.zombies.reduce (touchingany, zombie) ->
    person.touching(zombie) or touchingany
  , false

animate = ->
  mainLoop()
  requestAnimationFrame(animate)
  renderer.render(stage)

animate()


# Set up Key listeners
window.addEventListener("keydown", virusOnKeyDown)
window.addEventListener("keyup", virusOnKeyUp)

@Virus = Game
