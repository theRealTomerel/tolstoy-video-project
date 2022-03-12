const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const pipeline = promisify(require('stream').pipeline)
const express = require('express')
const low = require('lowdb')
const multer = require('multer')
const FileSync = require('lowdb/adapters/FileSync')
const cors = require('cors')
const bodyParser = require('body-parser')

const adapter = new FileSync(path.join(__dirname,'.','/db/db.json'))
const db = low(adapter)
db.defaults({videosData:[]}).write()

const app = express()
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'videos')
    },
    filename: (req, file, cb) => {
        const { originalname,body } = file;
        const fileExtention = '.'+originalname.split('.').pop()
        // console.log(req.body)
        // or 
        // uuid, or fieldname
        cb(null,req.body.name+fileExtention);
    }
})
const upload = multer({ storage });
const port = 5000


app.use(cors())
app.use('/video',express.static(path.join(__dirname, 'videos')))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.post('/upload-video',upload.single('video'),async (req,res)=>{
    try {
        const { originalname, body } = req.file
        const fileExtention = '.'+originalname.split('.').pop()
        res.status(200).send('http://localhost:5000/video/'+req.file.filename)
    } catch (error) {
        console.log(error)
        res.status(420).send(error)
    }
})

app.post('/upload-video-details',(req,res)=>{
    try {
        const { name, description, date, url } = req.body
        db.get('videosData').push(req.body).write()
    } catch (error) {
        console.log(error)
        res.status(420).send(error)
    }
})

app.get('/get-videos',(req,res)=>{
    try {
        const videosData = db.get('videosData').value()
        res.status(200).send(videosData)
    } catch (error) {
        res.status(420).send(error)
    }
})

app.listen(port,()=>{
    console.log(`app is listening on port-${port}`)
})
