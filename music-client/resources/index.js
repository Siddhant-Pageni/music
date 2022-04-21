let session = "";
let currentPlaylist = [];
let currentlyPlaying = "";
let playPattern = "order"; // "repeatOne" "shuffle"
let currentPlaylistWithPattern = [];


window.onload = function () {
    document.getElementById("loginButton").onclick = function (event) {
        event.preventDefault();
        login();
    };
    document.getElementById("searchButton").onclick = function (event) {
        event.preventDefault();
        search();
    };
    document.getElementById("logoutButton").onclick = function (event) {
        event.preventDefault();
        logout();
    };
    init();
};
function clearVariables(){
    session = "";
    currentPlaylist = [];
    currentlyPlaying = "";
    playPattern = "order"; // "repeatOne" "shuffle"
    currentPlaylistWithPattern = [];
    playbar = document.getElementById("playbar");
    if(playbar){
        removeAllChildNodes(playbar);
    }
}
function init() {
    renderNavbar();

    if (session) {
        search(); // Renders music with empty parameter for search keyword
        renderPlaylist();
    }
}

function renderNavbar() {
    // check the cookie object to see if the user is loggedin or not
    let searchForm = document.getElementById("searchForm");
    let loginForm = document.getElementById("loginForm");
    let logoutButton = document.getElementById("logoutButton");

    let bodyAfterLogin = document.getElementById("afterLogin");
    let bodyBeforeLogin = document.getElementById("beforeLogin");
    if (session) {
        loginForm.style.display = "none";
        searchForm.style.display = "block";
        logoutButton.style.display = "block";
        bodyAfterLogin.style.display = "block";
        bodyBeforeLogin.style.display = "none";
    } else {
        loginForm.style.display = "block";
        searchForm.style.display = "none";
        logoutButton.style.display = "none";
        bodyAfterLogin.style.display = "none";
        bodyBeforeLogin.style.display = "block";
    }
}

async function login() {
    let result = await fetch("http://localhost:3000/user/auth", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
        }),
    }).then((res) => res.json());
    session = result.session;
    init();
}

async function logout() {
    console.log(session);
    clearVariables();
    let result = await fetch("http://localhost:3000/user/logout", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            session: session,
        }),
    }).then((res) => res.json());
    console.log(session);
    init();
}

async function search() {
    let result = await fetch(
        "http://localhost:3000/music?title=" +
            document.getElementById("search").value
    ).then((res) => res.json());
    console.log(result);
    renderMusic(result);
}

function renderMusic(musicList) {
    const tableBody = document.getElementById("allMusicTableBody");
    removeAllChildNodes(tableBody);

    for (let i = 0; i < musicList.length; i++) {
        const tr = document.createElement("tr");

        const td_musicId = document.createElement("td");
        const td_title = document.createElement("td");
        const td_releaseDate = document.createElement("td");
        const td_actions = document.createElement("td");

        td_musicId.setAttribute("scope", "row");
        td_musicId.textContent = musicList[i].musicId;

        td_title.textContent = musicList[i].title;

        td_releaseDate.textContent = musicList[i].releaseDate;

        button_action = document.createElement("button");
        button_action.classList = "btn btn-dark fa fa-plus";
        button_action.setAttribute("tag", musicList[i].musicId);

        tr.appendChild(td_musicId);
        tr.appendChild(td_title);
        tr.appendChild(td_releaseDate);

        td_actions.appendChild(button_action);
        tr.appendChild(td_actions);

        tableBody.appendChild(tr);
        button_action.addEventListener("click", async function (event) {
            event.preventDefault();
            let musicId = event.target.getAttribute("tag");
            console.log(`Music ID -> ${musicId}`);
            let res = await fetch("http://localhost:3000/user/playlist", {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    musicId: musicId,
                    session: session,
                }),
            }).then((res) => res.json());
            renderPlaylist();
        });
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

async function renderPlaylist() {
    const tableBody = document.getElementById("playlistTableBody");
    removeAllChildNodes(tableBody);

    // Get the playlist from the server
    let musicList = await fetch(
        "http://localhost:3000/user/playlist?session=" + session,
        {
            method: "GET",
        }
    ).then((res) => res.json());
    currentPlaylist = musicList;

    for (let i = 0; i < musicList.length; i++) {
        const tr = document.createElement("tr");

        const td_musicId = document.createElement("td");
        const td_title = document.createElement("td");
        const td_actions = document.createElement("td");

        td_musicId.setAttribute("scope", "row");
        td_musicId.textContent = musicList[i].musicId;

        td_title.textContent = musicList[i].title;

        button_minus = document.createElement("button");
        button_minus.classList = "btn btn-dark fa fa-minus";
        button_minus.setAttribute("tag", musicList[i].musicId);

        button_play = document.createElement("button");
        button_play.classList = "btn btn-dark fa fa-play playlistPlayButton";
        button_play.setAttribute("tag", musicList[i].musicId);

        tr.appendChild(td_musicId);
        tr.appendChild(td_title);

        td_actions.appendChild(button_minus);
        td_actions.appendChild(button_play);
        tr.appendChild(td_actions);

        tableBody.appendChild(tr);
        button_minus.addEventListener("click", async function (event) {
            event.preventDefault();
            let musicId = event.target.getAttribute("tag");
            console.log(musicId);
            let playlist = await fetch("http://localhost:3000/user/playlist", {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    musicId: musicId,
                    session: session,
                }),
            }).then((res) => res.json());
            renderPlaylist();
        });
        button_play.addEventListener("click", function (event) {
            event.preventDefault();
            renderPlayBar(event.target.getAttribute("tag"));
        });
    }
}

function renderPlayBar(playThisMusic) {
    let playbarContent = document.getElementById("playbar");
    currentlyPlaying = playThisMusic;
    
    let index = currentPlaylist.findIndex(
        (m) => m.musicId.toString() == playThisMusic.toString()
    );
    let m = currentPlaylist[index];
    console.log(`Music that we are trying to play ${m.title}`);
    let htmlContent = `<div class="row">
    <div class="col-md-4">
        <Button class="btn btn-dark fa fa-angle-left" onclick=songEnded(false)></Button>
        <Button class="btn btn-dark fa fa-angle-right" onclick=songEnded(true)></Button>
    </div>
    <div class="col-md-4">
        ${m.title}
        <audio controls onended=songEnded(true) id="musicAudio">
            <source src="${m.src}" type="audio/mpeg">
            Your browser does not support the audio tag.
          </audio>
    </div>
    <div class="col-md-4">
        <Button class="btn btn-dark fa fa-retweet" onclick=updatePlayPattern("repeatOne") id="order"></Button>
        <Button class="btn btn-dark fa fa-repeat" onclick=updatePlayPattern("shuffle") id="repeatOne"></Button>
        <Button class="btn btn-dark fa fa-random" onclick=updatePlayPattern("order") id="shuffle"></Button>
    </div>
</div>`;

    removeAllChildNodes(playbarContent);
    playbarContent.innerHTML = htmlContent;
    let audio = document.getElementById("musicAudio");
    audio.play();
    updatePatternButton();
}

function updatePatternButton(){
    let patternButtons = [document.getElementById("order"), document.getElementById("repeatOne"), document.getElementById("shuffle")];
    for(let i = 0; i<patternButtons.length; i++){
        if(patternButtons[i].id == playPattern){
            patternButtons[i].style.display ="block";
        }
        else {
            patternButtons[i].style.display ="none";
        }
    }
}
function updatePlayPattern(pattern) {
    playPattern = pattern;
    updatePatternButton();
}

function songEnded(forward){
    console.log("Song Ended!");
    let playNext;
    if(playPattern === "order"){
        currentPlaylistWithPattern = currentPlaylist;
        indexOfCurrentlyPlaying = currentPlaylistWithPattern.findIndex(m => m.musicId == currentlyPlaying);
        console.log(`Index of current in the array -> ${indexOfCurrentlyPlaying}`);
        if(forward){
            if(indexOfCurrentlyPlaying == currentPlaylistWithPattern.length -1){
                playNext = currentPlaylistWithPattern[0].musicId;
            }
            else {
                console.log(`Current Playlist `)
                playNext = currentPlaylistWithPattern[indexOfCurrentlyPlaying + 1].musicId;
            }
        } else {
            if(indexOfCurrentlyPlaying == 0){
                playNext = currentPlaylistWithPattern[currentPlaylistWithPattern.length -1].musicId;
            }
            else {
                playNext = currentPlaylistWithPattern[indexOfCurrentlyPlaying - 1].musicId;
            } 
        }
    }
    else if(playPattern === "repeatOne") {
        playNext = currentlyPlaying;
    }
    else if(playPattern === "shuffle") { // shuffle
        currentPlaylistWithPattern = shuffleArray(currentPlaylist);
        playNext = currentPlaylistWithPattern[0].musicId;
    }
    console.log(`Play Next -> ${playNext}`);
    renderPlayBar(playNext);
}

const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }