import { iTuneFileType } from './iTune-file-type.enum';
export class ITuneResponse {
    trackId: number
    wrapperType: string;
    kind: iTuneFileType;
    trackName: string;
    artistName: string;
    collectionName: string;
    trackViewUrl: string;
    primaryGenreName: string;
    artworkUrl100: string;
    isFavourite: boolean;

    constructor(json: any) {
        this.trackId = json.trackId;
        this.wrapperType = json.wrapperType;
        this.kind = json.kind;
        this.trackName = json.trackName;
        this.artistName = json.artistName;
        this.collectionName = json.collectionName;
        this.trackViewUrl = json.trackViewUrl;
        this.primaryGenreName = json.primaryGenreName;
        this.artworkUrl100 = json.artworkUrl100;
        this.isFavourite = false;
    }
}