/**
 * Created by zes on 2017/7/28.
 */
var mongoose = require('mongoose');
var MusicStorySchema = require('../schemas/musicStory');
var MusicStory = mongoose.model('MusicStory',MusicStorySchema);
module.exports = MusicStory;