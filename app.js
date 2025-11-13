const port = 3000
const expressLayouts = require('express-ejs-layouts')
const express = require('express')
const app = express()
const {body, validationResult, check} = require('express-validator')
const clientId = 'a8e6562fbad34ad6be4644a6f9e627f1'
const secretId = '30bc2bb233644050af248b76ca5a7a56'
const credential = Buffer.from(`${clientId}:${secretId}`).toString('base64')
let time = 55 * 60 *1000
let access_token = ''



require('./utils/db')
const song = require('./model/song')
const { default: mongoose } = require('mongoose')


//setup ejs
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({extended : true}))
app.use(express.json())


app.get('/', (req,res) => {
    res.render('home', {title : 'main', layout: 'layout/main-layout'})
})

app.get('/submit', (req,res) => {
    res.render('submit_name', {title: 'Submit', layout: 'layout/main-layout'})
})


app.get('/browse/:id', async(req,res) => {
    const valid = mongoose.Types.ObjectId.isValid(req.params.id)
    if(!valid){
        res.status(404).send('Data tidak ditemukan')
        return
    }
    const songs = await song.findOne({_id : req.params.id})
    res.render('detail', {title : 'Detail', layout:'layout/main-layout', songs}) 
})

app.get('/browse', async(req,res) => {
    const songs = await song.find()
    res.render('browse', {title: 'Browse', songs ,layout: 'layout/main-layout'})
})

app.get('/api/songs', async (req,res) => {
    const data = await song.find()
    res.json(data)
})



app.post('/submit',async (req,res) => {
    try{
        const newSubmit = {
            nama_pengirim : req.body.nama_pengirim,
            nama_penerima : req.body.nama_penerima,
            message :req.body.message,
            song : req.body.song,
            data : [{
                url : String(req.body.url), 
                penyanyi : String(req.body.penyanyi),
                cover : String(req.body.cover)
            }]
        }
        await song.insertMany([newSubmit]) 
        res.redirect('/')
    }catch(err) {
        console.log(err)
    }
})


app.post('/api/search',async  (req,res) => {
    const query = req.body.song
    const data = await getApi(query)
    res.json(data)
})


app.listen(port,(req,res) => {
    console.log(`server running on port${port}`)
})


setInterval(() => {
    getToken()
}, time)


async function getToken() {
    try {
        const url = await fetch('https://accounts.spotify.com/api/token', {
            method : 'POST',
            headers : {
                Authorization : `Basic ${credential}`,
                'Content-Type' : 'application/x-www-form-urlencoded',
            },
            body : 'grant_type=client_credentials'
        })
        const data = await url.json()
        access_token = data.access_token
        getApi()
        return

    }catch(err) {
        console.log(err)
    }
}

getToken()

async function getApi(query) {
    try {
        const url = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=5`, {
            method : 'GET',
            headers : {
                Authorization : `Bearer ${access_token}`
            },
        })
        const data = await url.json()
        return data.tracks?.items || []

    }catch(err) {
        console.log(err)
    }
} 




