
const socket=io('http://localhost:8000' || 'https://chat-app-lcee.vercel.app/');


var audio=new Audio('new-notification-7-210334.mp3');

const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp')
const messageContainer=document.querySelector(".container");

const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    console.log("Appending message:", messageElement);  // Check if div is created
    messageContainer.append(messageElement);
    if(position=='left')
    {
    audio.play();
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`you:${message}`,'right')
    socket.emit('send',message);
    messageInput.value=""
})

socket.on('connect', () => {
    console.log("Connected to socket server");
    const nameUser = prompt("Enter your name to join");
    if(nameUser=="")
    {
        socket.emit('new-user-joined', "someone");
    }
    else{
    socket.emit('new-user-joined', nameUser);
    }
});
    
socket.on('user-joined',(name)=>{
    if(name=="")
    {
        append(`someone joined chat`,'right' );

    }
    else{
append(`${name} joined chat`,'right' );
    }
});

socket.on('receive',data=>{
    append(`${data.name}:${data.message}`,'left')
})

socket.on('left',name=>{
    append(`${name} left the chat`,'left')
})