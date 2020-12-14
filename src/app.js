const path = require('path')
const express = require("express")
const hbs = require("hbs")
const geolocate = require("./utils/geolocate.js");
const forecast = require("./utils/forecast.js")

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
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }
    geolocate(req.query.address, (error,{latitude, longitude, location } = {}) =>{
        if(error){
            return res.send({error});
        }
        forecast(latitude, longitude, (error, forcastData) => {
            if(error){
                return res.send({error});
            }
            res.send({
                forecast: forcastData,
                location,
                address:req.query.address

            })
        })
    })
})
app.get('/products', (req, res) =>{
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term "
        })
    }
    console.log(req.query)
    res.send({
        products: []
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