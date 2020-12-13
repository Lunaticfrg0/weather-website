const request = require("postman-request");
const apiKeys = require("./constants.js");

const geolocate = (address, callback) =>{
    const urlGeolocation = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${apiKeys.mapbox}&limit=1`;
    request({url: urlGeolocation, json: true}, (error, {body})=>{
        if(error){
        callback("Unable to connect to geolocation service!", undefined)
    }
    else if(body.features.length === 0){
        callback("Unable to find location. Try another search!", undefined)
    }
    else{
        const data = body.features[0];
        callback(undefined, {
            latitude: data.center[1],
            longitude: data.center[0],
            location: data.place_name
        })
    }
    })
}
module.exports = geolocate;