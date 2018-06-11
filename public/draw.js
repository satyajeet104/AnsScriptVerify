
// The faster the user moves their mouse
// the larger the circle will be
// We dont want it to be larger than this

// Connect to the nodeJs Server
//io = io.connect('/');
tool.maxDistance = 10;




// every time the user drags their mouse
// this function will be executed
function onMouseDrag(event) {

  // Take the click/touch position as the centre of our circle
  var x = event.middlePoint.x;
  var y = event.middlePoint.y;
  
  // The faster the movement, the bigger the circle
  //var radius = event.delta.length / 2;
  var radius=5;
  // Generate our random color
  var color = {red:1};

  // Draw the circle 
  drawCircle( x, y, radius, color );
  
   // Pass the data for this circle
  // to a special function for later
  emitCircle( x, y, radius, color );

}


function drawCircle( x, y, radius, color ) {

  // Render the circle with Paper.js
  var circle = new Path.Circle( new Point( x, y ), radius );
  circle.fillColor = new RgbColor( color.red, color.green, color.blue, color.alpha );

  // Refresh the view, so we always get an update, even if the tab is not in focus
  view.draw();
} 
  

// This function sends the data for a circle to the server
// so that the server can broadcast it to every other user
function emitCircle( x, y, radius, color ) {

  // Each Socket.IO connection has a unique session id
  var sessionId = io.id;
  var touser=$('#teacher').text();
  
  // An object to describe the circle's draw data
  var data = {
    x: x,
    y: y,
    radius: radius,
    color: color,
    touser:touser
  };
  
  // send a 'drawCircle' event with data and sessionId to the server
  io.emit( 'drawCircle', data, sessionId)

  // Lets have a look at the data we're sending
  console.log( data )

}


// Listen for 'drawCircle' events
// created by other users
io.on( 'drawCircle', function( data ) {

  console.log( 'drawCircle event recieved:', data );

  // Draw the circle using the data sent
  // from another user
  drawCircle( data.x, data.y, data.radius, data.color );
  
})


