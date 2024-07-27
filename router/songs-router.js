const Router = require('express').Router;
const songsController = require('../controllers/songs-controller')
const router = new Router();
// const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

router.get('/songs', authMiddleware, songsController.getSongs)
router.get('/favouriteSongs', authMiddleware, songsController.getFavouriteSongsPage)
router.get('/discoverSongs', authMiddleware, songsController.discoverSongs)
router.get('/favouriteSongsIds', authMiddleware, songsController.getFavouriteSongsIds)
router.get('/moods', authMiddleware, songsController.getMoods)
router.get('/genres', authMiddleware, songsController.getGenres)
router.post('/songs', authMiddleware, songsController.addSong)

module.exports = router
