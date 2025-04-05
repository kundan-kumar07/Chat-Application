const socket = io("https://chat-application-b42k.onrender.com");

const form = document.getElementById("send-container");

const messageInput = document.getElementById("messageInput");
const messageContainer = document.querySelector(".container");

let audio=new Audio('whatsapp.mp3');


const append = (message, positon) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(positon);
  messageContainer.append(messageElement);
  if (positon==='left') {
    audio.play();
  }
  
};


form.addEventListener('submit',(e)=>{
  e.preventDefault();
  const message=messageInput.value;
  append(`you:${message}`,'right');
  socket.emit('send',message);

})

const name = prompt("Enter your name to join");

// Only emit if the name is not empty and not null (in case user presses Cancel)
if (name && name.trim() !== "") {
  socket.emit("new-user-joined", name);
} else {
  alert("Name is required to join the chat!");
}


socket.on("user-joined", name => {
  append(`${name} joined the chat`, "right");
  
});






socket.on('receive',data=>{
  append(`${data.name} : ${data.message}`,'left');
  
})

socket.on('user-left',data=>{
  append(`${name} left the chat`,'right')
  
})


