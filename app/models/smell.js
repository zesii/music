
/**
 * Created by zes on 2017/8/6.
 */
var mongoose = require('mongoose');
var SmellSchema = require('../schemas/smell');
var Smell = mongoose.model('Smell',SmellSchema);
module.exports = Smell;