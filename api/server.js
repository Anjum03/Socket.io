// const { Socket } = require('socket.io');


const app = require('express')();



const server = require('http').createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: "*",
    },
});

io.on("connection",(socket)=>{
    console.log("what is socket: ", socket)
    console.log(`Socket is active to be connected: ${socket.id} `);
    

    socket.on("chat", (payload)=>{
        console.log("What is Payload ", payload);
        io.emit("chat", payload);
    });


    socket.on("disconnect", ()=>{
        console.log("User disconnected", socket.id);
    })
});

server.listen(5000,()=>{
    console.log(`Server is running........`)
})