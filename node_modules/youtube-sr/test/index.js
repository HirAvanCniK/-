const yt = require("../build/main").default;
const url = "https://www.youtube.com/watch?v=x8VYWazR5mE&list=PL_A7IF_b8OCR7k9CZovjSoW1Sv99NQYIJ";

// yt.search("starboy remix", { limit: 1, type: "video" }).then(x => console.log(x[0]))
yt.getPlaylist(url).then(playlist => {

let i = 1;
    for (const video of playlist) {
        console.log(`[${i}] ${video.title}`);

        i++;
    }

})