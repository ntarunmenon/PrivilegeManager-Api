'use strict';
var express = require('express')
const uuidv1 = require('uuid/v1');
const moment = require('moment')
var router = express.Router()
const { getLocations,updateLocation, deleteLocation } = require("./../file/locationFile");

router.get('/', (req, res) => {
    getLocations()
    .then(location => res.json(JSON.parse(location)))
})

router.post('/', (req, res) => {
    var newLocation = req.body;
    if(!'locationId' in newLocation) {
        newLocation.locationId = uuidv1()
        newLocation.createDate = moment().format('YYYY-MM-DD')
    }
    newLocation.modifiedDate = moment().format('YYYY-MM-DD')
    updateLocation(newLocation)
   .then(res.send(newLocation.locationId))
})

router.delete('/', (req, res) => {
    var locationId = req.query.q;
    deleteLocation(locationId)
   .then(res.send(locationId))
})

module.exports = router