var gScores = {
    beginner: null,
    medium: null,
    expert: null,
};

function getBestScore() {
    let htmlStr;
    if (localStorage.getItem('scores') === null) {
        htmlStr = 'No best score, yet!';
    } else {
        gScores = JSON.parse(localStorage.getItem('scores'));
        htmlStr = printObject(gScores);
    }
    let elLeaderboard = document.querySelector('.leaderboard-content');
    elLeaderboard.innerHTML = `${htmlStr}`;
}

function saveScoresToStorage() {
    let scoreObjStr = JSON.stringify(gScores);
    localStorage.setItem('scores', scoreObjStr);
}

function updateScores(score) {
    let difficulty = gGame.prevDifficulty;
    if (gScores[difficulty]) {
        if (gScores[difficulty] > score) setScore(score, difficulty);
    } else setScore(score, difficulty);
    return;
}

function setScore(score, difficulty) {

    gScores[difficulty] = score;
    saveScoresToStorage();
    updateLeaderboard();
}

function updateLeaderboard() {
    htmlStr = printObject(gScores);
    let elLeaderboard = document.querySelector('.leaderboard-content');
    elLeaderboard.innerHTML = `${htmlStr}`;
}
