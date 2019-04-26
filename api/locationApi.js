'use strict';
var express = require('express')
const uuidv1 = require('uuid/v1');
const moment = require('moment')
var router = express.Router()
const { getLocations,updateLocation, deleteLocation } = require("./../file/locationFile");

router.get('/', async (req, res) => {
    res.json(await getLocations())
})

router.post('/', async (req, res) => {
    var newLocation = req.body;
    if(!'locationId' in newLocation) {
        newLocation.locationId = uuidv1()
        newLocation.createDate = moment().format('YYYY-MM-DD')
    }
    newLocation.modifiedDate = moment().format('YYYY-MM-DD')
    await updateLocation(newLocation)
    res.send(newLocation.locationId)
})

router.delete('/', async (req, res) => {
    var locationId = req.query.q;
    await eleteLocation(locationId)
    res.send(locationId)
})

module.exports = router