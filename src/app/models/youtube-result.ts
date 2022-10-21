export class YoutubeResult {
    kind: string;
    etag: string;
    nextPageToken: string;
    regionCode: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
    items: [{
        kind: string;
        etag: string;
        id: {
            kind: string;
            videoId: string;
        }
    }]
}