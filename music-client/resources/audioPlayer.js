let state = "pause";
window.onload = function () {
    // variable for the button that will contain both icons
    const playIconContainer = document.getElementById("play-icon");
    // variable that will store the button’s current state (play or pause)

    // adds an event listener to the button so that when it is clicked, the the player toggles between play and pause
    playIconContainer.addEventListener("click", () => {
        if (state === "play") {
            audio.pause();
            playIconContainer.classList = "audio-btn fa fa-play btn-dark";
            // cancelAnimationFrame(rAF);
            state = "pause";
        } else {
            audio.play();
            playIconContainer.classList = "audio-btn fa fa-pause btn-dark";
            // requestAnimationFrame(whilePlaying);
            state = "play";
        }
    });

}