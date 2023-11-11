const express = require('express')
const bodyparser = require('body-parser')
const request = require('request')

const app = express()

const apikey = "52581958cde9cac7a20477b06e2352dd";
//app.use(express.static("public"))

app.use(bodyparser.urlencoded({ extended:true}));
app.set('view engine', 'ejs');

app.get('/', (req , res) =>{
  res.render('index.ejs',{weather:null,error:null});
})

app.post('/',(req, res)=>{
  let city = req.body.city;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`
  request[url, (err,response,body) => {
    if(err){
      res.render('index',{weather:null,error:"Error"});
    }else{
      let weather = JSON.parse(body);
      console.log(weather)
      if(weather.main == undefined){
        res.render('index',{weather:null,error:"Error..Please Try again"});
      }else{
        let w = `Degrees: ${weather.main.temp} ${weather.weather[0].main} in ${weather.name} `
        res.render('index',{weather:w,error:null});
      }
    }
  }]
})
app.listen(3000,() =>{
  console.log("listening on port 3000")
})