const express = require('express')
const path  = require('path')
const app = express()
const publicDir = path.join(__dirname,'../public')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
app.use(express.static(publicDir))

app.set('view engine','ejs')
app.set('views','./templates/views')
app.get('',(req, res)=>{
    res.render('index',{
        title: "Weather app",
        name: 'kapil'
    })
})
app.get('/index',(req, res)=>{
    res.render('index',{
        title: "Weather app",
        name: 'kapil'
    })
})

app.get('/help', (req, res) =>{
    res.render('help',{
        helpText:'Help Page',
        title: "help",
        name: "kapil"
    })
})
app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About me',
        name: 'Kapil'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:" you must provide an address"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude,location} = {}) =>{
        if(error)
            return res.send({ error})
        forecast(latitude, longitude, (error, forecastData) => {
            if(error)
                return res.send({error})
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address   
            })
        })
        
    })
})

app.get('/help/*',(req, res)=>{
    res.render('404.ejs',{
        title: "help article not found",
        name: "kapil"
    })
})
app.get('*', (req, res)=>{
    res.render('404',{
        title: "page not found",
        name: "kapil"
        
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})