/***************COMPILED INTO 1 OBJECT & ADDED COMPLETE DATA*****************/


const cheerio = require('cheerio');
const axios = require('axios');

async function getUniversityData() {
  try {
    // General university data
    const generalDataUrl = 'https://www.ontariouniversitiesinfo.ca/universities';
    const generalDataResponse = await axios.get(generalDataUrl);
    const generalData$ = cheerio.load(generalDataResponse.data);
    const universities = [];

    generalData$('.university').each((index, element) => {
      const universityId = index;
      const universityName = generalData$(element).find('.university-name').text();
      const universityMainBranch = generalData$(element).find('.university-meta').children('a:first').text();
      const universityMainBranchPrograms = generalData$(element).find('.university-meta').children('a:first').next().text();
      const universityAffiliateBranch = generalData$(element).find('.affiliate').children('.university-meta').children('a:first').text();
      const universityAffiliateBranchPrograms = generalData$(element).find('.affiliate').children('.university-meta').children('a:first').next().text();

      universities.push({
        universityId,
        universityName,
        universityMainBranch,
        universityMainBranchPrograms,
        universityAffiliateBranch,
        universityAffiliateBranchPrograms,
      });
    });

    // General grade data
    const generalGradeUrl = 'https://education.macleans.ca/university-rankings/canadas-best-universities-2023-average-entering-grade/';
    const generalGradeResponse = await axios.get(generalGradeUrl);
    const generalGrade$ = cheerio.load(generalGradeResponse.data);
    const generalGrade = [];

    generalGrade$('tr').each((index, element) => {
      const universityName = generalGrade$(element).find('th').children('span').text();
      const universityGeneralGrade = generalGrade$(element).find('td').children('span').text();

      generalGrade.push({
        universityName,
        universityGeneralGrade,
      });
    });

    // Major grade data
    const majorGradeUrl = 'https://collegesinontario.com/minimum-marks-for-acceptance/';
    const majorGradeResponse = await axios.get(majorGradeUrl);
    const majorGrade$ = cheerio.load(majorGradeResponse.data);
    const majorGrade = [];

    majorGrade$('.wp-block-table').children('tbody').children('tr').each((index, element) => {
      const universityName = majorGrade$(element).find('td').eq(0).text();
      const artGrade = majorGrade$(element).find('td').eq(1).text();
      const scienceGrade = majorGrade$(element).find('td').eq(2).text();
      const commerceGrade = majorGrade$(element).find('td').eq(3).text();
      const engineeringGrade = majorGrade$(element).find('td').eq(4).text();

      majorGrade.push({
        universityName,
        artGrade,
        scienceGrade,
        commerceGrade,
        engineeringGrade,
      });
    });

    // University ranking data
    const rankingUrl = 'https://www.4icu.org/ca/ontario/';
    const rankingResponse = await axios.get(rankingUrl);
    const ranking$ = cheerio.load(rankingResponse.data);
    const rankings = [];

    ranking$('tbody').children('tr').each((index, element) => {
      const universityName = ranking$(element).find('a').text();
      const universityRank = ranking$(element).find('b').text();

      rankings.push({
        universityName,
        universityRank,
      });
    });

    // Tuition data
    const tuitionUrl = 'https://www.univcan.ca/universities/facts-and-stats/tuition-fees-by-university/';
    const tuitionResponse = await axios.get(tuitionUrl);
    const tuition$ = cheerio.load(tuitionResponse.data);
    const tuition = [];

    tuition$('tbody').children('tr').each((index, element) => {
      const universityName = tuition$(element).find('td').eq(0).text().trim();
      const undergradTuition = tuition$(element).find('td').eq(1).text().trim().replace(/\*/g, '');
      const undergradTuitionForeign = tuition$(element).find('td').eq(2).text().trim().replace(/\*/g, '');

      tuition.push({
        universityName,
        undergradTuition,
        undergradTuitionForeign,
      });
    });

    const universityData = universities.map(university => {
      let matchingGeneralGrade = generalGrade.find(g => university.universityName.toLowerCase().includes(g.universityName.toLowerCase()));
      let matchingMajorGrade = majorGrade.find(m => university.universityName.toLowerCase().includes(m.universityName.toLowerCase()));
      let matchingRanking = rankings.find(r => university.universityName.includes(r.universityName));
      let matchingTuition = tuition.find(t => university.universityName.includes(t.universityName));

      
      /****Special Check for missed items***/
      // U of T
      if (university.universityName.toLowerCase().includes('university of toronto')) {
        matchingGeneralGrade = generalGrade.find(g => g.universityName.includes('Toronto'));
        matchingMajorGrade = majorGrade.find(m => m.universityName.includes('Toronto'));
      }

      //Nipissing
      if (university.universityName.includes('Nipissing University')) {
        matchingGeneralGrade = generalGrade.find(g => g.universityName.includes('Nipissing'));
        matchingMajorGrade = majorGrade.find(m => m.universityName.includes('Nipissing'));
      } 

      //OCAD
      if (university.universityName.includes('OCAD University')) {
        matchingGeneralGrade = generalGrade.find(g =>g.universityName.includes('Nipissing'));
        matchingMajorGrade = majorGrade.find(m => m.universityName.includes('OCAD U'));
      } 

      //UOIT
      if (university.universityName.includes('Ontario Tech')) {
        matchingTuition = generalGrade.find(g =>g.universityName.includes('Ontario Tech'));
        matchingMajorGrade = majorGrade.find(m => m.universityName.includes('UOIT'));
        matchingTuition = tuition.find(t => university.universityName.includes('Ontario Tech'));
      } 

      //Trent
      if (university.universityName.includes('Trent')) {
        matchingGeneralGrade = generalGrade.find(g =>g.universityName.includes('Trent'));
        matchingMajorGrade = majorGrade.find(m => m.universityName.includes('Trent'));
      } 

      //Western 
      if (university.universityName.includes('Western')) {
        matchingTuition = tuition.find(t => t.universityName.includes('Western University (excludes colleges)'));
        matchingTuition = tuition.find(tf => tf.universityName.includes('Western University (excludes colleges)'))
      } 

      //Wilfrid Laurier
      if (university.universityName.includes('Wilfrid Laurier')) {
        matchingGeneralGrade = generalGrade.find(g =>g.universityName.includes('Wilfrid Laurier'));
        matchingMajorGrade = majorGrade.find(m => m.universityName.includes('Wilfrid Laurier'));
      } 

      //Queens 
        if (university.universityName.includes('Q')) {
          //matchingGeneralGrade = generalGrade.find(g =>g.universityName.includes('W'));
          matchingMajorGrade = majorGrade.find(m => m.universityName.includes('Q'));
        } 

      return {
        name: university.universityName,
        universityMainBranch: university.universityMainBranch,
        universityMainBranchPrograms: university.universityMainBranchPrograms,
        universityAffiliateBranch: university.universityAffiliateBranch,
        universityAffiliateBranchPrograms: university.universityAffiliateBranchPrograms,
        universityGeneralGrade: matchingGeneralGrade ? matchingGeneralGrade.universityGeneralGrade : '',
        artGrade: matchingMajorGrade ? matchingMajorGrade.artGrade : '',
        scienceGrade: matchingMajorGrade ? matchingMajorGrade.scienceGrade : '',
        commerceGrade: matchingMajorGrade ? matchingMajorGrade.commerceGrade : '',
        engineeringGrade: matchingMajorGrade ? matchingMajorGrade.engineeringGrade : '',
        universityRank: matchingRanking ? matchingRanking.universityRank : '',
        undergradTuition: matchingTuition ? matchingTuition.undergradTuition : '',
        undergradTuitionForeign: matchingTuition ? matchingTuition.undergradTuitionForeign : '',
      };
    });

    return universityData;
  } catch (error) {
    console.log(error);
  }
}

module.exports ={
    getUniversityData
} 
