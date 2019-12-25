const request=require('request');


const forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/2ad121a4ee4b34c4329aea04078bc5af/'+latitude+','+longitude+"?units=ca"

   request({url,json:true},(error,{body})=>{

       if(error){

           callback('No internet',undefined);
       }else if(body.error){

        callback('Unable to find location',undefined);

       }

       else{

           callback(undefined,{
               
            temperature:body.currently.temperature,
            windspeed:body.currently.windSpeed,
            rainchance:body.currently.precipProbability

        });
 
       }
   
   })



}

module.exports=forecast