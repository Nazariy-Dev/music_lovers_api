
const songService = require("../service/songs-service")
const genreModel = require("../models/genre-model")
const moodModel = require("../models/mood-model");
const UserModel = require("../models/user-model");
const songsService = require("../service/songs-service");

class SongsController {
    async getSongs(req, res, next) {
        const { currentPage, moods, genres } = req.query
        const moodsId = moods ? moods.split("|") : undefined
        const genresId = genres ? genres.split("|") : undefined
        try {
            const songsPages = await songService.getSongs(currentPage, moodsId, genresId)
            return res.json(songsPages);
        } catch (e) {
            next(e);
        }
    }

    async discoverSongs(req, res, next){
        // debugger
        const { userId, currentPage, moods, genres } = req.query
        const moodsId = moods ? moods.split("|") : undefined
        const genresId = genres ? genres.split("|") : undefined

        try {
            const discoveredSongsPage = await songsService.discoverSongs(userId, currentPage, moodsId, genresId)
            return res.json(discoveredSongsPage)
        } catch (e) {
            next(e);
        }
    }
    async getFavouriteSongsPage(req, res, next) {
        const { userId, currentPage, moods, genres } = req.query
        const moodsId = moods ? moods.split("|") : undefined
        const genresId = genres ? genres.split("|") : undefined

        try {
            const favouriteSongsPage = await songsService.getFavouriteSongsPage(userId, currentPage, moodsId, genresId)
            return res.json(favouriteSongsPage)
        } catch (e) {
            next(e);
        }
    }
    async getFavouriteSongsIds(req, res, next) {
        const { userId } = req.query
        // debugger
        try {
            const favouriteSongsIds = await songsService.getFavouriteSongsIds(userId)
            return res.json(favouriteSongsIds)
        } catch (e) {
            next(e);
        }
    }
    async getMoods(req, res) {
        const { query } = req.query
        try {
            const moods = await songService.getMoods(query)
            return res.json(moods);
        } catch (e) {
            next(e);
        }
    }
    async getGenres(req, res) {
        const { query } = req.query
        try {
            const moods = await songService.getGenres(query)
            return res.json(moods);
        } catch (e) {
            next(e);
        }
    }

    async addSong(req, res, next) {
        try {
            // , description, genre, mood,
            const { link, moodsIds, genresIds } = req.body
            const newSong = await songService.addSong(link, moodsIds, genresIds)

            return res.json(newSong);
        } catch (e) {
            next(e);

        }

    }

}


module.exports = new SongsController();
