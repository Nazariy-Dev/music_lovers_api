const { Schema, model } = require('mongoose');

const GenreModel = new Schema({
   name: String
})

module.exports = {
   genreModel: model('Genre', GenreModel),
   GenreSchema: GenreModel
};
