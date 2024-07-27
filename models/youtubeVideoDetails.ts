



export interface YoutubeVideoResponse {
    categoryId: string
    channelId: string
    channelTitle: string
    description: string
    liveBroadcastContent: string
    localized:
    {
        title: string,
        description: string
    },
    publishedAt: string
    tags: string[],
    thumbnails: {
        default: thumbnail,
        medium: thumbnail,
        high: thumbnail,
        standard: thumbnail,
        maxres: thumbnail
    }

    title: string
}

interface thumbnail {
    height: string
    url: string
    width: number
}


