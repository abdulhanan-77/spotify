console.log("Welcome to spotify");

let songIndex = 0;
let audioElement = new Audio('songs/song1.mp3');
let masterPlays = document.getElementById('masterPlay');
let masterSongName = document.getElementById('masterSongName');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItem = Array.from(document.getElementsByClassName('songItem'));

//audioElement.play();
let songs = [
    {songName: "Zindagi", filePath: "songs/song1.mp3", coverPath: "covers/cover1.jpg"},
    {songName: "kahani suno 2.0", filePath: "songs/song2.mp3", coverPath: "covers/cover2.jpg"},
    {songName: "kuch to bata", filePath: "songs/song3.mp3", coverPath: "covers/cover3.webp"},
    {songName: "heeriye", filePath: "songs/song4.mp3", coverPath: "covers/cover1.jpg"},
    {songName: "daku", filePath: "songs/song5.mp3", coverPath: "covers/cover2.jpg"},
    {songName: "we rollin", filePath: "songs/song6.mp3", coverPath: "covers/cover3.webp"}
]

songItem.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
});

masterPlays.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlays.classList.remove('fa-play-circle');
        masterPlays.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlays.classList.remove('fa-pause-circle');
        masterPlays.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

audioElement.addEventListener('timeupdate', ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
});

let makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/song${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlays.classList.remove('fa-play-circle');
        masterPlays.classList.add('fa-pause-circle');
    })
})

document.getElementById('previous').addEventListener('click', ()=> {
    if(songIndex<=0){
        songIndex=5;
    }else{
        songIndex--;
    }
    audioElement.src = `songs/song${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlays.classList.remove('fa-play-circle');
        masterPlays.classList.add('fa-pause-circle');
})

document.getElementById('next').addEventListener('click', ()=> {
    if(songIndex>=5){
        songIndex=0;
    }else{
        songIndex++;
    }
    audioElement.src = `songs/song${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlays.classList.remove('fa-play-circle');
        masterPlays.classList.add('fa-pause-circle');
})
