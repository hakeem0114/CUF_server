//API imports
const cheerio = require('cheerio'); //handle web scrapping
const axios = require('axios'); //Handle http requests


/*****API RETRIVAL***/

//main arr to return 
const universities = []
const generalData= async()=>{
    try{

            console.log('Api Data')
            //Async GET req from url
            const url = 'https://www.ontariouniversitiesinfo.ca/universities'
            const response = await axios.get(url)

            //Put reponse into cheerio $ object using .load( .data)
            const $ = await cheerio.load(response.data)

            //Get container for all general university info
            $('.university').each((index, element)=>{

                const universityId = index

                const universityName = $(element).find('.university-name').text()

                const universityMainBranch = $(element).find('.university-meta').children('a:first').text()
                const universityMainBranchPrograms = $(element).find('.university-meta').children('a:first').next().text()
                
                const universityAffiliateBranch = $(element).find('.affiliate').children('.university-meta').children('a:first').text()
                const universityAffiliateBranchPrograms  = $(element).find('.affiliate').children('.university-meta').children('a:first').next().text()
                // const universityImage = $(element).find('.university-image img').attr('src');
 
                universities.push({
                    universityId,
                    
                        universityName,
                        universityMainBranch,
                        universityMainBranchPrograms,
                        universityAffiliateBranch,
                        universityAffiliateBranchPrograms,
                    
                })
            })
           return  universities  
    }
    catch(error){
        console.log(error)
    }
}
//generalData()


//Scrape general grade 
const generalGrade = []
async function generalGradeData(){
    try{
            
            console.log('Api Data2')
            //Async GET req from url
            const url = 'https://education.macleans.ca/university-rankings/canadas-best-universities-2023-average-entering-grade/'
            const response = await axios.get(url)

            //Put reponse into cheerio $ object using .load( .data)
            const $ = await cheerio.load(response.data)

            //Get container for all general university info
            $('tr').each((index, element)=>{

                const universityName = $(element).find('th').children('span').text()
                const universityGeneralGrade = $(element).find('td').children('span').text()
 
                generalGrade.push({
                    universityName,
                    universityGeneralGrade
                    
                })
            })
           return generalGrade    
    }
    catch(error){
        console.log(error)
    }
}
//generalGradeData()



//Scrape specific grade 
const majorGrade = []
async function majorGradeData(){
    try{
            
            console.log('Major Grade')
            //Async GET req from url
            const url = 'https://collegesinontario.com/minimum-marks-for-acceptance/'
            const response = await axios.get(url)

            //Put reponse into cheerio $ object using .load( .data)
            const $ = await cheerio.load(response.data)

            //Get container for all general university info
            $('.wp-block-table').children('tbody').children('tr').each((index, element)=>{

                const universityName = $(element).find('td').eq(0).text()
                const artGrade = $(element).find('td').eq(1).text()
                const scienceGrade = $(element).find('td').eq(2).text()
                const commerceGrade = $(element).find('td').eq(3).text()
                const engineeringGrade = $(element).find('td').eq(4).text()
                
 
                majorGrade.push({
                    universityName,
                    artGrade,
                    scienceGrade,
                    commerceGrade,
                    engineeringGrade
                })
            })
           return  majorGrade      
    }
    catch(error){
        console.log(error)
    }
}
//majorGradeData()


//Ranking
const rankings = []
async function universityRanking(){
    try{
            
            console.log('universityRanking')
            //Async GET req from url
            const url = 'https://www.4icu.org/ca/ontario/'
            const response = await axios.get(url)

            //Put reponse into cheerio $ object using .load( .data)
            const $ = await cheerio.load(response.data)

            //Get container for all general university info
            $('tbody').children('tr').each((index, element)=>{

                const universityName = $(element).find('a').text()
                const universityRank = $(element).find('b').text()
 
                rankings.push({
                    universityName,
                    universityRank
                })
            })
           return  rankings     
    }
    catch(error){
        console.log(error)
    }
}
//universityRanking()


//Tuition per semester
const tuition = []
async function universityTuition(){
    try{
            
            console.log('universityRanking')
            //Async GET req from url
            const url = 'https://www.univcan.ca/universities/facts-and-stats/tuition-fees-by-university/'
            const response = await axios.get(url)

            //Put reponse into cheerio $ object using .load( .data)
            const $ = await cheerio.load(response.data)

            //Get container for all general university info
            $('tbody').children('tr').each((index, element)=>{

                const universityName = $(element).find('td').eq(0).text().trim()
                const undergradTuition = $(element).find('td').eq(1).text().trim()
                const undergradTuitionForeign = $(element).find('td').eq(2).text().trim()
 
                tuition.push({
                    universityName,
                    undergradTuition,
                    undergradTuitionForeign 
                })
            })
           return tuition     
    }
    catch(error){
        console.log(error)
    }
}
universityTuition()

module.exports = {
    generalData,
    generalGradeData,
    majorGradeData,
    universityRanking
}