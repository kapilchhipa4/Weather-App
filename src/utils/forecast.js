const request = require('request')
const   forecast = (latitude, longitude, callback)=>{

    const url = `https://api.darksky.net/forecast/e62b0167d2f4aca718294d79204dc37f/${latitude},${longitude}`;
    request({url:url, json: true}, (error, response) =>{
    if(error){
       callback('unable to connect to weather service')
    }
    else if(response.body.error){
        console.log('enable to find location')
    }
    else{
        const body = response.body
        console.log(body)
        const temp = Number(body.currently.temperature);
        const temp1 = Math.floor((temp - 32) * 5/9 )
        callback(undefined, body.daily.data[0].summary + ' It is currently ' + temp1 + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
    }
});
}
module.exports = forecast