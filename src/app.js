const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res) => {
  res.render('index',{
    title: 'Weather App',
    name: 'Ashish Tripathi'
  })
})


app.get('/about',(req,res) => {
  res.render('about',{
    title: 'About',
    name: 'Ashish Tripathi'
  })
})


app.get('/help',(req,res) => {
  res.render('help',{
    title: 'Help',
    name: 'Ashish Tripathi'
  })
})

app.get('/weather',(req,res) => {
  if(!req.query.address) {
    res.send({
      error: 'You must provide an address'
    })
  }else {
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
  
      if(error){
        return res.send({error})
      }  
      forecast(latitude, longitude, (error, Wdata) => {
        if(error) {
          return res.send({error})
        }
        res.send({
          location,
          forecast: Wdata,
          address: req.query.address
        })
      })
    })
  }
})

app.get('/help/*',(req,res) => {
  res.render('error',{
    title: '404',
    error: 'Help not found',
    name: 'Ashish Tripathi'
  })
})

app.get('*',(req,res) => {
  res.render('error',{
    title: '404',
    error: 'Page not found',
    name: 'Ashish Tripathi'
  })
})


app.listen(port, () => {
  console.log('server is up on port :' + port)
})