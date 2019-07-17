const path = require('path')

const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '/../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Kokouvi Hounkanli'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Kokouvi Hounkanli'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        msg: "Help in on its way! Don't give up!",
        name: 'Kokouvi Hounkanli'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude,longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
            
        })
    })

    // res.send({
    //     location: 'St-Hubert',
    //     forecast: 'It is 50 degres, mostly sunny!',
    //     address: req.query.address
    //     })

})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kokouvi Hounkanli',
        errorMessage: 'Help article not found.' 
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kokouvi Hounkanli',
        errorMessage: 'Page not found.'
    })
})


app.listen(port, () => {
    console.log('Server is up on port '+port)
})
