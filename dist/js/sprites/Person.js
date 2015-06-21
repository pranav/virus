(function() {
  var Person,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Person = (function(_super) {
    __extends(Person, _super);

    function Person(x, y) {
      Person.__super__.constructor.call(this, x, y, 50, 50, '/img/healthy_person.png');
    }

    return Person;

  })(VirusSprite);

}).call(this);
