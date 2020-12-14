const weatherForm = document.querySelector('form')
const seacrhTearm = document.querySelector('input')
const firstMessage = document.querySelector("#message-1")
const secondMessage = document.querySelector("#message-2")

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = seacrhTearm.value;

    firstMessage.textContent = "Loading response..."
    secondMessage.textContent = ""
    
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) =>{
    response.json().then((data)=>{
        if(data.error){
            firstMessage.textContent = data.error
        }
        else{
            firstMessage.textContent = data.location
            secondMessage.textContent = data.forecast
        }
        })
    })
})