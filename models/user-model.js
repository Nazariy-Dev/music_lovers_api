const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String },
    songs: [{ type: Schema.Types.ObjectId, ref: "Song", unique: false }]
})

module.exports = model('User', UserSchema);
