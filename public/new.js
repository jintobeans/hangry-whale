var values = {
	paths: 27,
	minPoints: 3,
	maxPoints: 7,
	minRadius: 30,
	maxRadius: 50
};

var hitOptions = {
	stroke: true,
	fill: true,
	tolerance: 5
};

function createShape(center, maxRadius, points) {
	var shape = new Path();
	shape.closed = true;
	for (var i = 0; i < points; i++) {
		var delta = new Point({
			length: (maxRadius * 0.5),
			angle: (360 / points) * i
		});
    shape.add(center + delta);
  }
	return shape;
}

function createPaths() {
  var radiusDelta = values.maxRadius - values.minRadius;
	var pointsDelta = values.maxPoints - values.minPoints;
	for (var i = 0; i < values.paths; i++) {
    var radius = values.minRadius + Math.random() * radiusDelta;
		var points = values.minPoints + Math.floor(Math.random() * pointsDelta);
		var path = createShape(view.size * Point.random(), radius, points);
		var lightness = (Math.random() - 0.45) * 0.4 + 0.5;
		var hue = 185 + Math.random()* 30;
		path.fillColor = { hue: hue, saturation: 0.9, lightness: lightness };
		path.strokeColor = path.fillColor;
	}
}

createPaths();

var shrimpCount = 0;
var shrimps = [];
var segment, path, shrimp;
var movePath = false;
function onMouseDown(event) {
	// segment = path = null;
	var hitResult = project.hitTest(event.point, hitOptions);
	if (!hitResult) return;
	if (event.modifiers.shift) {
		if (hitResult.type == 'fill') {
      path = hitResult.item;
      shrimp = new Raster('./png/003-shrimp.png')
      var placeshrimp = hitResult.item.position
      hitResult.item.replaceWith(shrimp)
      shrimp.position = placeshrimp
      shrimps.push(shrimp)
		}
		return;
	}
	if (hitResult.type === 'fill' || hitResult.type === 'pixel') {
    path = hitResult.item;
  }
	movePath = hitResult.type == 'fill';
  if (movePath)
  project.activeLayer.addChild(hitResult.item);
}

function onMouseMove(event) {
  project.activeLayer.selected = false;
	// if (event.item) event.item.selected = true;
}

function onMouseDrag(event) {
  if (path) path.position += event.delta;
}


//WHALE
var goop = new Path();

//put the whale
var whale = new Raster('./png/whale-right.png');
whale.position = new Point(100,100)

// The starting position of the line
var position = whale.position;

// The amount we will move when one of the keys is pressed:
var step = 6;

goop.strokeColor = new Color(1, 1, 1, 0.3);
goop.strokeCap = 'round';
goop.strokeJoin = 'round';
goop.strokeWidth = 15;
goop.add(position);

function onKeyDown(event) {
  if (event.key === 's') {
    whale.source = './png/whale-left.png'
    position.x -= step;
    whale.position.x = position.x
	}

	if (event.key === 'f') {
    whale.source = './png/whale-right.png'
    position.x += step;
    whale.position.x = position.x
	}

	if (event.key === 'e') {
    whale.source = './png/whale-up.png'
    position.y -= step;
    whale.position.y = position.y
	}

	if (event.key === 'd') {
    whale.source = './png/whale-down.png'
    position.y += step;
    whale.position.y = position.y
  }
  goop.add(position);
  if (whale.intersects(shrimp)){
    shrimp.remove()
  }
}


//text
var text = new PointText({
  point: [1080, 400],
  content: 'You are a hangry whale and your enemy whale has eaten all the krill!\n Use your magical powers to turn random shapes into food so you can survive!',
  fillColor: 'black',
  fontFamily: 'Fredoka One',
  fontWeight: 'bold',
  fontSize: 25,
  justification: 'right'
});

var title = new PointText({
  point: [380, 500],
  content: 'Hangry Whale - Paper.js',
  fillColor: 'light pink',
  fontFamily: 'Fredoka One',
  fontWeight: 'bold',
  fontSize: 60,
});

title.insertBelow(path)

// function onFrame(event){
//   date.content = new Date()
// }

// The onFrame function is called up to 60 times a second:
function onFrame(event) {
  // text.content = 'Shrimp eaten: ' + shrimpCount + '/' + values.paths
	// Run through the active layer's children list and change
	// the position of the placed symbols:
	for (var i = 0; i < values.paths; i++) {
		var item = project.activeLayer.children[i];

		// Move the item 1/20th of its width to the right. This way
		// larger circles move faster than smaller circles:
		item.position.x += item.bounds.width / 200;

		// If the item has left the view on the right, move it back
		// to the left:
		if (item.bounds.left > view.size.width) {
			item.position.x = -item.bounds.width;
		}
	}
}
