/**
 * Created by zes on 2017/7/28.
 */
var mongoose = require('mongoose');
var ArtistsSchema = require('../schemas/artists');
var Artists = mongoose.model('Artists',ArtistsSchema);
module.exports = Artists;