//Package Imports
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
require("dotenv").config();

//Scrape Data Imports
const {
    generalData,
    generalGradeData,
    majorGradeData,
    universityRanking
} = require('./scraper.js')

//console.log(majorGradeData())
//Starting express routing
const app = express()
app.use(express.json())

//cors
app.use(cors())

//body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//handle http response header errors since this project might have errors due to scraping
app.use(helmet());


//Process GET req from UI
app.get('/get', async(req, res)=>{

  const request = req.body
  console.log(request)
   
//    res.status(200).json(
//     generalData,
//     generalGradeData,
//     majorGradeData,
//     universityRanking
//    )

   //console.log(res)
   const ranking  = await universityRanking()
   res.status(200).send(ranking)
})


//Run server
const port = process.env.PORT || 3030
console.log(port)
app.listen(port, ()=>{
    console.log(`Server is runnin on PORT =${port}`)
})



