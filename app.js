const port = 3000
const expressLayouts = require('express-ejs-layouts')
const express = require('express')
const app = express()




require('./utils/db')
const song = require('./model/song')


//setup ejs
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.static('public'))


app.get('/', (req,res) => {
    res.render('home', {title : 'main', layout: 'layout/main-layout'})
})

app.get('/submit', (req,res) => {
    res.render('submit', {title: 'Submit', layout: 'layout/main-layout'})
})


app.listen(port,(req,res) => {
    console.log(`server running on port${port}`)
})





