//node server which will handle socket.io
const io = require('socket.io')(8000,{
    cors: {
        origin: "http://127.0.0.1:5500", // Replace with your frontend's origin
        methods: ["GET", "POST"]
    }
})


const users={};


io.on('connection',socket=>{
    console.log("hh")
    socket.on('new-user-joined',name=>{
        console.log("user",name)
        users[socket.id]=name;
        socket.emit('user-joined', name); // Emit to the client that triggered the event
        socket.broadcast.emit('user-joined',name);
        console.log(`${name} event broadcasted`);
    });


    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    });

    socket.io('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    })
    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });

    
})