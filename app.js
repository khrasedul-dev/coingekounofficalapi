const express = require('express')
const app = express()


app.get('/',(req,res)=>{
  
    const axios = require('axios')
    const cheerio = require('cheerio')


    const coinArray = []

    axios.get('https://www.coingecko.com/').then((data)=>{

        const $ = cheerio.load(data.data)
        const selector = 'table > tbody > tr'

        $(selector).each((index,element)=>{

              if(index <=99 ){

                let keys = [
                  'empty',
                  'Rank',
                  'Coin Name',
                  'empty',
                  'Price',
                  '1h',
                  '1d',
                  '7d',
                  '24h Volume',
                  'Market Cap',
                  'empty'
                ]


                const coinObj = {}

                  $(element).children().each((indexChild, elemChild)=>{
                        let tdata = $(elemChild).text()

                        let f = tdata.trim()

                        if(indexChild === 2){
                            f = $('a:first-child',$(elemChild).html()).text().trim()
                        }

                        coinObj[keys[indexChild]] = f
                        
                        delete coinObj.empty
                  })

                coinArray.push(coinObj)


              }


        })

      res.json(coinArray)


    }).catch((e)=>console.log(e))


  
  
})

const port = process.env.PORT || 8080

app.listen(port,(e)=>{
  console.log('Server is running on ' + port)
})

