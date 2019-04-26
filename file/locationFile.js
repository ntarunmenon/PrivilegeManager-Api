const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
var _ = require('lodash');

async function getLocations() {
    return JSON.parse(await readFile('json/locations.json'))
}

async function updateLocation(newLocation) {
    var allLocations = await getLocations()
    var index = _.findIndex(allLocations, {'locationId': newLocation.locationId})
    if (index === -1) {
        allLocations.push(newLocation)
    } else {
        allLocations.splice(index,1,newLocation)
    }
    return writeFile('json/locations.json',JSON.stringify(allLocations,null,2))      
}

async function deleteLocation(locationId) {
    var allLocations = await getLocations()
    _.remove(allLocations, (location) => location.locationId === locationId)
    return writeFile('json/locations.json',JSON.stringify(allLocations,null,2))
}

exports.getLocations = getLocations;
exports.updateLocation = updateLocation;
exports.deleteLocation = deleteLocation