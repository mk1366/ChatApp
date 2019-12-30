const express = require('express')
const app = express()

// A template engine is a tool that enables frontend/ full stack developers write HTML markup, peppered with its(the template engine’s) defined tags or syntax that will either insert variables into the final output of the template or run some programming logic at run-time before sending the final HTML to the browser for display.

// EJS simply stands for Embedded Javascript. It is a simple templating language/engine that lets its user generate HTML with plain javascript. It offers an easier way to interpolate (concatenate) strings effectively.

//set the template engine ejs
app.set('view engine', 'ejs')

//middlewares
app.use(express.static('public'))


//routes
app.get('/', (req, res) => {
	res.render('index')
})

//Listen on port 3000
server = app.listen(3000)



//socket.io instantiation
const io = require("socket.io")(server)


//listen on every connection
io.on('connection', (socket) => {
	console.log('New user connected')

	//default username
	socket.username = "Anonymous"

    //listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
        io.sockets.emit('new_message', {message : data.message, username : socket.username});
    })

    //listen on typing
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })
})
