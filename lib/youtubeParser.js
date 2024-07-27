const axios = require("axios")

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
const YOUTUBE_API_URL = process.env.YOUTUBE_API_URL

class YoutubeParser {
     isYouTubeMusicURL(url) {
        const regex = /^(?:https?:\/\/)?(?:www\.)?music\.youtube\.com\/watch\?v=([^&]+)|youtu\.be\/([^?&]+)/;
        return regex.test(url);
    }

     extractVideoID(url) {
        const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)|youtu\.be\/([^?&]+)/;
        const match = url.match(regex);
        return match ? (match[1] || match[2]) : null;
    }

    async getYouTubeDetails(url) {
        if (!this.isYouTubeMusicURL(url)) {
            throw new Error("The video does not belong to YouTube Music");
        }

        const videoID = this.extractVideoID(url);
        if (!videoID) {
            throw new Error("Invalid YouTube URL")
        }

        try {
            const response = await axios.get(YOUTUBE_API_URL, {
                params: {
                    id: videoID,
                    key: YOUTUBE_API_KEY,
                    part: "snippet"
                }
            })
            const videoDetails = response.data.items[0].snippet
            
            return {
                title: videoDetails.title.split("-")[1] || videoDetails.title.split("|")[1] || videoDetails.title,
                channelTitle: videoDetails.channelTitle,
                thumbnail: videoDetails.thumbnails.standard,
            }

        } catch (error) {
            throw new Error(`Error fetching video details: ${error}`)
        }
    }
}

module.exports = new YoutubeParser()

