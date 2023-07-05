//Package Imports
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
require("dotenv").config();

//Compiled object Imports
const {getUniversityData} = require('./data/compiledData')


/**********************EXPRESS**************************/
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


/**********************HTTP REQUESTS**************************/
//Process GET req from UI 
app.get('/universityData', async(req, res)=>{

  const request = req.body
  //console.log(request)
   
   const universityData  = await getUniversityData()
   res.status(200).send(JSON.stringify(universityData)) //Send as JSON(string) & receive on client as object (convert)
   //console.log(ranking)
})


/**********************START SERVER**************************/
//Run server
const port = process.env.PORT || 3030
console.log(port)
app.listen(port, ()=>{
    console.log(`Server is runnin on PORT =${port}`)
})



