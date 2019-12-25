const request=require('request');

const geocoding=(address,callback)=>{

    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1Ijoibm9kZWhpbWFuc2h1IiwiYSI6ImNrNDYycTBvcDBlcHIza3FtZmVmdTdzMTEifQ.zDNz61vwPQVyxEkCVLDomg&limit=1"
     request({url,json:true},(error,{body})=>{
    
        if(error){
    
            callback('No internet',undefined)
            
        }else if(body.features.length==0){
            
            callback('Try to search invalid location',undefined)        
        }else{
            
            const data=body.features;
                
            data.forEach((aData)=>{
    
               
                callback(undefined,{
                    latitude:aData.center[1],
                    longitude:aData.center[0],
                    location:aData.place_name
    
    
                })
                
                
                
            })
            
        }
    
    
    })
    
    }

    module.exports=geocoding