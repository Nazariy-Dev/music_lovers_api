const { Schema, model } = require('mongoose');

const MoodModel = new Schema({
   name: String
})

module.exports = {
   moodModel: model('Mood', MoodModel),
   MoodSchema: MoodModel
};
