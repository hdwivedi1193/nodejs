// Express servers
var bodyParser = require('body-parser');

const path=require('path') // core module of node js
const express=require('express')
const hbs=require('hbs') // To setup Partials for our views
const geocoding=require('./utils/geocode');
const forecast=require('./utils/forecast');

const app=express();


 const htmlPath=path.join(__dirname,'../public');
 const partialPath=path.join(__dirname,'../views/partials')
 app.use(express.static(htmlPath))  // This is to setup static directory to serve
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended: true}));


// app.get('',(req,res)=>{

//     res.send('<h1>Welcome</h1>')

// }) 




//console.log(__dirname) // Will give directory of current file
//console.log(__filename)  //Will give directory along with file name

// Rendering Dynamic pages with handlebars(In express we use npm package known as hbs for view engine)

// to set hbs


app.set('views', '../views'); // To customise views directory.Express default look for views directory. You can change path according to your views
app.set('view engine','hbs');// Setting up handle bars
hbs.registerPartials(partialPath) // THis is to register partials path
app.get('/',(req,res)=>{

    if(!req.query.address){
        return res.render('index',{
            
           error: 'Please provide address'
        
        });
    
    }

})


app.post('/',(req,res)=>{

    var search=req.body.search;

    geocoding(search,(error,{latitude,longitude,location}={})=>{
        if(error){
    
            return res.render('index',{
            
                error: error
             
             });
        }
    
        forecast(latitude, longitude, (error, {temperature,windspeed,rainchance}) => {
            if(error){
    
                return res.render('index',{
                
                    error: error
                 
                 });
            }

            var date = new Date();
            
            var currentDay=(date.toLocaleString('en-US', {
                weekday: 'long'
            }));

            var currentDate=(date.toLocaleString('en-US', {
                month: 'long',
                day: 'numeric'
            }));



            return res.render('index',{
                temperature,
                windspeed,
                rainchance,
                location,
                currentDay,
                currentDate,
                address:req.query.address

             
             });
          })
    
    })
   

})


app.get('/about',(req,res)=>{

    res.render('index',{

        title:"About me",
        position:"Developer"
    })

})

app.get('/about/*',(req,res)=>{

    res.render('404',{
        title:'No about us article found'
    })

})

// This * is wild card character which will match anything doesnt matched yet
// Remember we have to put this at last as express run top to bottom for match route

app.get('*',(req,res)=>{

    res.render('404',{
        title:'No url found'
    })

})

app.listen(3000,()=>{

    console.log('Server is running');
})




