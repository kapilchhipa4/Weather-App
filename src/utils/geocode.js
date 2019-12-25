const request = require('request')
const   geocode = (address='purani basti', callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1Ijoia2FwaWxjaGhpcGE0IiwiYSI6ImNrNGptMWsxNzFxbmgza3J2eTJqaWtkZjMifQ.ez-AnF3C5a2rmnsHhw0niA&limit=1";
    request({url:url, json:true} , (error, response)=>{
        if(error){
            callback('unable to connect to location services',undefined)
        }
        else if(response.body.features.length==0){
            callback('try another search', undefined)
        }
        else{
            callback(undefined, { 
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })

}
module.exports = geocode