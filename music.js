class Music {
    // music details for constructor
    constructor(title, singer, img, file) {
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
    }
    // music title and singer get assigned
    getMusicName() {
        return this.title;
    }
}

// music list for array
const MusicList = [
    new Music("Saian - Ay Şarkısı", "Saian", "https://images.genius.com/0816bf077181e819c8afd4ebbe6b019c.1000x1000x1.jpg", "Saian-Ay Şarkısı.mp3"),
    new Music("Bixi Blake - Obsession ft Kum", "Bixi Blake", "https://images.genius.com/1371547ba5da0b49fcc58b024567cade.1000x1000x1.jpg", "Bixi Blake-Obsession-ft-Kum.mp3"),
    new Music("Kayra - Mesela Yani", "Kayra", "https://c-cl.cdn.smule.com/rs-s33/arr/10/a1/406528c5-1a97-45be-ae82-059c78dc0c3c_1024.jpg", "Kayra-Mesela Yani.mp3"),
];