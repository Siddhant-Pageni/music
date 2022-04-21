let musics = [
    {
        musicId: 1,
        title: "Live It",
        src: "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3",
        releaseDate: "2022-2-2"
    },
    {
        musicId: 2,
        title: "Trendsetter",
        src: "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/FaceBangSonic.mp3",
        releaseDate: "2022-2-3"
    },
    {
        musicId: 3,
        title: "Tropicana",
        src: "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/BloodCity.mp3",
        releaseDate: "2022-2-4"
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
    static findById(musicId) {
        const index = musics.findIndex(m=>m.musicId == musicId);
        if (index > -1){
            return musics[index];
        }
        else {
            throw new Error('Music Not Found');
        }
    }
}
