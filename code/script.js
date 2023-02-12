// All the DOM selectors stored as short variables
const chat = document.getElementById('chat')
const inputWrapper = document.getElementById('input-wrapper')
const input = document.getElementById('input')
const sendBtn = document.getElementById('send')


//GLOBAL 
let botQuestion = 1

const botArtChoice = [`Black, white and abstract`, `Black, white and photography`, `Black and white illustration`, `Color and abstract`, `Color and `];

////Calling for user and bot reply in the chat bubbles.
const botReply = (msg) => {
   showMessage(msg, 'bot')
};
const userReply = (msg) => {
  showMessage(msg, 'user')
}

// This function will add a chat bubble in the correct place based on who the sender is.
const showMessage = (message, sender) => {
  if (sender === 'user') {
    chat.innerHTML += `
      <section class="user-msg">
        <div class="bubble user-bubble">
          <p>${message}</p>
        </div>
        <img src="assets/shillyshallyuser.png" alt="User" />  
      </section>
    `
  } else if (sender === 'bot') {
    chat.innerHTML += `
      <section class="bot-msg">
        <img src="assets/shillyshallybot.png" alt="Bot" />
        <div class="bubble bot-bubble">
          <p>${message}</p>
        </div>
      </section>
    `
  }
  chat.scrollTop = chat.scrollHeight
}

const nextQuestion = (message) => {
  console.log('questionNumber', botQuestion)

  if (botQuestion === 1) {
    userReply(message)
    input.value = ''
    setTimeout(() => showColorOption(message), 1000)
  } else if (botQuestion === 2) {
    userReply(message)
    setTimeout(() => showDesignMenu(message), 1000)
  } else if (botQuestion === 3) {
    userReply(message)
    setTimeout(() => showPaintingSize(message), 1000)
  } else if (botQuestion === 4) {
    userReply(message)
    setTimeout(() => showPrice(message), 1000)
  } else {
    userReply(message)
    setTimeout(thankYou, 1000)
  }
}

// Starts here
const greeting = () => {
  botQuestion = 1
  botReply(`Welcome! I'm Artsie, what's your name?`)
}

const showColorOption = (msg) => {
  botQuestion++
  botReply(
    `Hello ${msg}! What colors would you prefer on your poster?`
  )

  inputWrapper.innerHTML = `
    <button id="blackWhiteBtn">Black & White</button>
    <button id="colorBtn">Color explosion!</button>
    <button id="beigeBtn">Beige & Nature</button>
  `

  document
    .getElementById('blackWhiteBtn')
    .addEventListener('click', () => nextQuestion('Black and white would suit me!'))
  document
    .getElementById('colorBtn')
    .addEventListener('click', () => nextQuestion('Make my wall pop!'))
  document
    .getElementById('beigeBtn')
    .addEventListener('click', () => nextQuestion('Beige is fierce!'))
}

const showDesignMenu = (type) => {
  botQuestion++
  botReply(`Great choice! Wich kind of style would you like on your poster?`)
  
  inputWrapper.innerHTML = `
  <button id="abstractBtn">Abstract</button>
  <button id="photographyBtn">Photography</button>
  <button id="illustrationBtn">Illustration</button>
  ` 
  
  document
   .getElementById('abstractBtn')
   .addEventListener('click', () => nextQuestion('Abstract please'))
  document
   .getElementById('photographyBtn')
   .addEventListener('click', () => nextQuestion('Photography'))
  document
   .getElementById('illustrationBtn')
   .addEventListener('click', () => nextQuestion('Illustration'))
    
}

const showPaintingSize = () => {
  botQuestion++
  botReply(`Ok great! Just wait a second and I'll see what I can find for you..`)
  setTimeout(() => {
    botReply(`💭`); }, 2000);
  setTimeout(() => {
      botReply(`💡`); }, 4000); 
  setTimeout(() => {
    botReply(`Maybe this poster would be a good choice for you?`);
  }, 6000);

  inputWrapper.innerHTML = `
    <button id="restart">Please start over</button>
    <button id="confirm">Yes, add to cart!</button>
  `

  document.getElementById('restart').addEventListener('click', () => {
    location.reload()
    return false
  })
  document
    .getElementById('confirm')
    .addEventListener('click', () => nextQuestion('Yes!'))
}



const goodBye = () => {
  botReply(`I'm glad you found something you liked! Thank you for your order and
  welcome back!`)
}

sendBtn.addEventListener('click', () => nextQuestion(input.value))
input.addEventListener('keypress', (event) => {
  if (event.key === 'Enter' && input.value) nextQuestion(input.value)
})

// When website loaded, chatbot asks first question.
setTimeout(greeting, 1000)
