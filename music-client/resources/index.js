var session = "";
window.onload = function () {
    document.getElementById("loginButton").onclick = function (event) {
        event.preventDefault();
        login();
    };
    document.getElementById("searchButton").onclick = function (event) {
        event.preventDefault();
        search();
    };
    document.getElementById("logoutButton").onclick = function(event) {
        event.preventDefault();
        logout();
    }
    init();
};

function init(){
    renderNavbar();
    
    if(session){
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
    if(session){
        loginForm.style.display="none";
        searchForm.style.display="block";
        logoutButton.style.display="block";
        bodyAfterLogin.style.display="block";
        bodyBeforeLogin.style.display="none";
    }
    else{
        loginForm.style.display="block";
        searchForm.style.display="none";
        logoutButton.style.display="none";
        bodyAfterLogin.style.display="none";
        bodyBeforeLogin.style.display="block";
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
    let result = await fetch("http://localhost:3000/user/logout", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            session: session,
        }),
    }).then(res => res.json());
    session = "";
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
        button_action.classList = "btn btn-dark";
        button_action.setAttribute("tag", musicList[i].musicId);
        
        i_action = document.createElement("i");
        i_action.classList = "fa fa-plus";
        i_action.setAttribute("tag", musicList[i].musicId);

        tr.appendChild(td_musicId);
        tr.appendChild(td_title);
        tr.appendChild(td_releaseDate);

        button_action.appendChild(i_action);
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
            }).then(res => res.json());
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
    let musicList = await fetch("http://localhost:3000/user/playlist?session="+session, {
        method: 'GET',
    }).then(res => res.json());

    for (let i = 0; i < musicList.length; i++) {
        const tr = document.createElement("tr");

        const td_musicId = document.createElement("td");
        const td_title = document.createElement("td");
        const td_actions = document.createElement("td");

        td_musicId.setAttribute("scope", "row");
        td_musicId.textContent = musicList[i].musicId;

        td_title.textContent = musicList[i].title;

        button_minus = document.createElement("button");
        button_minus.classList = "btn btn-dark";
        button_minus.setAttribute("tag", musicList[i].musicId);
        
        i_minus = document.createElement("i");
        i_minus.classList = "fa fa-minus";
        i_minus.setAttribute("tag", musicList[i].musicId);

        tr.appendChild(td_musicId);
        tr.appendChild(td_title);

        button_minus.appendChild(i_minus);
        td_actions.appendChild(button_minus);
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
            }).then(res => res.json());
            renderPlaylist();
        });
    }
}
