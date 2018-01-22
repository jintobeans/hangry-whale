var x = 0;
var y = 0;
var size = new Size(20,20);
var rect;
for (var i = 0; i<5000;i++){
  pt = new Point(x,y)
  rect = new Path.Rectangle(pt, size)
  rect.fillColor = 'tomato'
  x+= 20
  y+= 20
}
var myPath;

function onMouseDown(event) {
  var myCircle = new Path.Circle({
    center: event.point,
    radius: 2
  });
  myCircle.strokeColor = 'black';
  myCircle.fillColor = 'white';
}

var circlePath = new Path.Circle(new Point(0, 0), 10);
circlePath.strokeColor = 'red';

function onKeyDown(event) {
  // When a key is pressed, set the content of the text item:
  console.log('The ' + event.key + ' key was pressed!');
  if(event.key === 'l'){
    circlePath.position.x += 20
  }
  if(event.key === 'j'){
    circlePath.position.x += -20
  }
  if(event.key === 'i'){
    circlePath.position.y += -20
  }
  if(event.key === 'k'){
    circlePath.position.y += 20
  }
}

// Create a raster item using the image tag with id='mona'
var raster = new Raster('https://sep.yimg.com/ay/artsheaven/mona-lisa-la-gioconda-61.jpg');

// Create a raster item using the image tag with id='mona'
// Move the raster to the center of the view
raster.position = view.center;

// As the web is asynchronous, we need to wait for the raster to load
// before we can perform any operation on its pixels.
raster.on('load', function() {
// Downsize the pixel content to 80 pixels wide and 60 pixels high:
raster.size = new Size(80, 60);
});
function onMouseDrag(e){
  var hitResult = project.hitTest(event.point);
  console.log('hitResult', hitResult)
  raster.position += e.delta
}
