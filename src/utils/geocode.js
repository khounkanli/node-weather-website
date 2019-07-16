
const request = require('request')

const geocode =(address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoia2hvdW5rYW5saSIsImEiOiJjanhwMGE5cWYwY24yM2RwOXlhamZnd25rIn0.a7PMj0asYavbg5AqRGICpQ&limit=1'

    request({ url, json: true }, (error, {body}) => { 
        if (error) { 
            callback('Unable to connect to location services!', undefined) 
        } else if (body.features[0]===undefined) { 
            callback('Unable to find location. Try another search.', undefined) 
        } else { 
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    }) 

}

module.exports = geocode



// const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoia2hvdW5rYW5saSIsImEiOiJjanhwMGE5cWYwY24yM2RwOXlhamZnd25rIn0.a7PMj0asYavbg5AqRGICpQ&limit=1'

// request( { url: geocodeURL, json: true}, (error, res) => {
//     if (error){
//         console.log('Unable to connect to localisation services!')
//     } else if(res.body.message){
//         console.log(res.body.message)
//     } else {
//         const latitude = res.body.features[0].center[0]
//         const longitude = res.body.features[0].center[1]
//         console.log(chalk.blue('Latitude: ' + latitude))
//         console.log(chalk.green('Longitude: ' + longitude))
//     }
// })