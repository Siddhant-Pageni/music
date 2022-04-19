let musics = [
    {
        musicId: 1,
        title: "Live It",
        src: "../sample-music/live-it-infraction-main-version-01-42-4118.mp3"
    },
    {
        musicId: 2,
        title: "Trendsetter",
        src: "../sample-music/trendsetter-mood-maze-main-version-02-53-1004.mp3"
    },
    {
        musicId: 3,
        title: "Tropicana",
        src: "../sample-music/tropicana-soundroll-main-version-02-15-1725.mp3"
    },
];

module.exports = class Music {
    constructor (musicId, title, src) {
        this.musicId = musicId;
        this.title = title;
        this.src = src;
    }
    static fetchAll() {
        return musics;
    }
    static findById(id) {
        const index = musics.findIndex(m=>m.id === id);
        if (index > -1){
            return musics[index];
        }
        else {
            throw new Error('Music Not Found');
        }
    }
}
