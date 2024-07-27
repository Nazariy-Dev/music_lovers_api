const songModel = require('../models/song-model')
const { moodModel } = require("../models/mood-model")
const youtubeParser = require('../lib/youtubeParser')
const ApiError = require('../exceptions/api-error');
const { genreModel } = require('../models/genre-model');
const userModel = require('../models/user-model');
const { uniq } = require('../lib/functions');

const ITEMS_PER_PAGE = 6;

class SongsService {
    async addSong(link, moods, genres) {
        // debugger
        const songDetails = await youtubeParser.getYouTubeDetails(link)
        const existingSong = await songModel.findOne({ link })

        if (existingSong) {
            throw ApiError.BadRequest("This song already exist")
        }

        const newSong = await songModel.create({ link, moods, genres, songDetails })
        return newSong
    }
    async getSongs(currentPage = 1, moodsId, genresId) {
        const offset = (currentPage - 1) * ITEMS_PER_PAGE;

        const query = {}
        if (genresId) {
            query.genres = { $in: genresId }
        }
        if (moodsId) {
            query.moods = { $in: moodsId }
        }

        const totalSongs = await songModel.find(query)
        const totalPages = Math.ceil(totalSongs.length / ITEMS_PER_PAGE)

        const songs = await songModel
            .find(query)
            .skip(offset)
            .limit(ITEMS_PER_PAGE)
            .sort({ createdAt: -1 })
            .populate("moods", "name")
            .populate("genres", "name")

        return { songs, totalPages }
    }
    async getFavouriteSongsPage(id, currentPage = 1, moodsId, genresId) {
        // debugger
        const offset = (currentPage - 1) * ITEMS_PER_PAGE;
        const query = {}

        if (genresId) {
            query.genres = { $in: genresId }
        }
        if (moodsId) {
            query.moods = { $in: moodsId }
        }

        const user = await userModel.findOne({ _id: id })
        const likedSongsLength = user.songs.length
        const totalPages = Math.ceil(likedSongsLength / ITEMS_PER_PAGE)

        const userWithLikedSongs = await userModel.findOne({ _id: id })
            .populate({
                path: "songs",
                match: query,
                populate: [
                    { path: "moods" },
                    { path: "genres" },
                ],
                options: {
                    skip: offset,
                    limit: ITEMS_PER_PAGE,
                    sort: { createdAt: -1 },
                }
            })

        const songs = userWithLikedSongs.songs
        return { songs, totalPages }
    }
    async discoverSongs(id, currentPage = 1, moodsId, genresId) {
        // debugger
        const offset = (currentPage - 1) * ITEMS_PER_PAGE;

        const user = await userModel.findOne({ _id: id })
        const likedSongs = user.songs

        const usersQuery = {
            songs: { $in: likedSongs },
            _id: { $ne: id }
        }

        const usersWithSameLikedSongs = await userModel.find(usersQuery).select("songs -_id")
        const nestedSongs = usersWithSameLikedSongs.map((obj) => obj.songs)
        const arrayOfsongs = nestedSongs.flat()
        const songsWithoutDoubles = uniq(arrayOfsongs)


        const songsQuery = {
            _id: { $in: songsWithoutDoubles, $nin: likedSongs }
        }

        if (genresId) {
            songsQuery.genres = { $in: genresId }
        }
        if (moodsId) {
            songsQuery.moods = { $in: moodsId }
        }

        // debugger
        const totalSongs = await songModel.find(songsQuery)
        const totalPages = Math.ceil(totalSongs.length / ITEMS_PER_PAGE)

        const songs = await songModel
            .find(songsQuery)
            .skip(offset)
            .limit(ITEMS_PER_PAGE)
            .sort({ createdAt: -1 })
            .populate("moods", "name")
            .populate("genres", "name")

        return { songs, totalPages }
    }
    async getFavouriteSongsIds(id) {
        const userWithLikedSongs = await userModel.findOne({ _id: id })
        const favouriteSongs = userWithLikedSongs.songs
        return favouriteSongs
    }
    async getMoods(query) {
        const moods = await moodModel.find({ name: { $regex: query, $options: 'i' } })
        return moods
    }
    async getGenres(query) {
        const genres = await genreModel.find({ name: { $regex: query, $options: 'i' } })
        return genres
    }
}

module.exports = new SongsService()