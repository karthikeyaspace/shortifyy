const express = require('express')
const mongoClient = require('mongodb').MongoClient
const cors = require('cors')
require('dotenv').config()
const app = express()
const randomString = require('./randomString.js')
const bodyParser = require('body-parser')

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())


mongoClient.connect(process.env.MONGODB_URI).then(client => {
    const db = client.db('shortenDB');
    const urls = db.collection('urls');
    app.set('urls', urls);
    console.log('Connected to Atlas');
})
    .catch(err => {
        console.error('Failed to connect to MongoDB Atlas', err);
    });


app.post('/', async (req, res) => {
    const urls = req.app.get('urls')
    let longUrl = req.body.longUrl

    // console.log(longUrl)
    //verify long url

    const urlParts = longUrl.split('.');
    if (urlParts.length < 2) {
        return res.json({ message: "invalid url" })
    }

    if (!longUrl.startsWith("http://") && !longUrl.startsWith("https://")) {
        longUrl = "https://" + longUrl;
    }

    try{
        //check for existing long url
        const longUrlFromDb = await urls.findOne({ longUrl: longUrl })
        if (longUrlFromDb) {
            return res.json({ message: "url already exists", payload: { shortUrl: longUrlFromDb.shortUrl } })
        }
        
        //create short url
        const alias = randomString().shortUrl
        await urls.insertOne({ longUrl: longUrl, alias: alias, shortUrl: process.env.LongUrl + alias, createdAt: new Date() })
        return res.json({ message: "short url created", payload: { shortUrl: process.env.LongUrl + alias } })
        
    }
    catch(err){
        return res.json({ message: "error"})
    }

})


app.get('/:alias', async (req, res) => {
    const urls = req.app.get('urls');
    const alias = req.params.alias;

    const longUrlFromDb = await urls.findOne({ alias: alias });

    // console.log(longUrlFromDb)
    if (longUrlFromDb) {
        res.send({message: "redirecting", payload: { longUrl: longUrlFromDb.longUrl }});
    } 
    else {
        res.send({message: "url not found"});
    }
    
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`)
})
