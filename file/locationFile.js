const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
var _ = require('lodash');

async function getLocations() {
    return await readFile('json/locations.json');
}

async function updateLocation(newLocation) {
    getLocations()
        .then (allLocations => {
            allLocationJSON = JSON.parse(allLocations)
            var index = _.findIndex(allLocationJSON, {'locationId': newLocation.locationId})
            if (index === -1) {
                allLocationJSON.push(newLocation)
            } else {
                allLocationJSON.splice(index,1,newLocation)
            }
            return writeFile('json/locations.json',JSON.stringify(allLocationJSON,null,2))
        })    
}

async function deleteLocation(locationId) {
    getLocations()
        .then (allLocations => {
            allLocationsJSON = JSON.parse(allLocations)
            _.remove(allLocationsJSON, (location) => location.locationId === locationId)
            return writeFile('json/locations.json',JSON.stringify(allLocationsJSON,null,2))
        })    
}

exports.getLocations = getLocations;
exports.updateLocation = updateLocation;
exports.deleteLocation = deleteLocation