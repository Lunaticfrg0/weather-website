const path = require('path')
const express = require("express")
const hbs = require("hbs")


const app = express()

//Define paths for express config
const publicDirectory = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set("views",viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectory))

//Pages configuration
app.get('', (req, res) =>{
    res.render('index', {
        title: "Weather App",
        name: "Emilio"
    })
})
app.get('/about', (req, res) =>{
    res.render('about', {
        title: "About me",
        name: "Emilio"
    })
})
app.get('/help', (req, res) =>{
    res.render('help', {
        title: "Help",
        greet: "Hi",
        name: "Emilio"
    })
})

app.get('/weather', (req, res) =>{
    res.send({
        weather: 'Heavy rain',
        forecast: 20,
        location: [ 18.90, 59.90]
    })
})
app.get('/help/*', (req, res) =>{
    res.render('404',{
        title: "404 Page",
        name: "Emilio", 
        errorMessage: "Help article not found"
    })
})
app.get('*', (req, res) =>{
    res.render('404',{
        title: "404 Page",
        name: "Emilio", 
        errorMessage: "This page cannot be found"
    })
})

app.listen(3000, ()=>{
    console.log("Server is up on port 3000")
})