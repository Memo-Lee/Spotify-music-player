class MusicPlayer {
    // music list constructor
    constructor(MusicList) {
        this.MusicList = MusicList;
        this.index = 0;
    }
    // get index music 
    getMusic() {
        return this.MusicList[this.index];
    }

    next() {
        if (this.index + 1 < this.MusicList.length) {
            this.index++;
        } else {
            this.index = 0;
        }
    }

    previous() {
        if (this.index == 0) {
            this.index = this.MusicList.length - 1;
        } else {
            this.index--;
        }
    }
}