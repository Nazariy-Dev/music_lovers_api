const { Schema, model } = require('mongoose');

const Thumbnail = new Schema({
    height: String,
    url: String,
    width: Number
}, { _id: false })

const SongDetailsSchema = new Schema({
    title: { type: String, required: true },
    channelTitle: { type: String, required: true },
    thumbnail: { type: Thumbnail, required: true },
})

const SongModel = new Schema({
    link: { type: String, required: true, unique: true },
    genres: [{ type: Schema.Types.ObjectId, required: false, ref: 'Genre' }],
    moods: [{ type: Schema.Types.ObjectId, required: false, ref: 'Mood' }],
    songDetails: { type: SongDetailsSchema, required: true },
    createdAt: {
        type: Date,
        default: () => Date.now()
    }
})

module.exports = model('Song', SongModel);
