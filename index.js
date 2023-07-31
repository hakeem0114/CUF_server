//Package Imports
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
require("dotenv").config();

//Compiled object Imports
const {getUniversityData} = require('./data/compiledData')
const {backup} = require('./data/backup')


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

  try{
    console.log('test')

    const request = req.body
    //console.log(request)
     
     const universityData  = await getUniversityData()
    
     res.status(200).json(
        backup ||
        {
          message:'University list retrieved',
          universityData
        }
     ) 

  }
  catch(error){
    console.log(error)
  }
})

//console.log(backup)
/**********************START SERVER**************************/
//Run server
const port = process.env.PORT || 3030
console.log(port)
app.listen(port, ()=>{
    console.log(`Server is runnin on PORT =${port}`)
})



