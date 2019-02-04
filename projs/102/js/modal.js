// Use escape to close modals 
window.addEventListener('keydown', onKeyDown);

function onKeyDown(e) {
    if (e.code === 'Escape') {
        if (document.querySelector('.bg-modal').style.display === 'flex') closeLeaderboards();
        else if (document.querySelector('.bg-modal2').style.display === 'flex') closeInstructions();
    }
    return;
}

// Modal open and close functions
function openLeaderboards() {
    let elModal = document.querySelector('.bg-modal');
    elModal.style.display = 'flex';
}

function closeLeaderboards() {
    let elModal = document.querySelector('.bg-modal');
    elModal.style.display = 'none';
}

function openInstructions() {
    let elModal = document.querySelector('.bg-modal2');
    elModal.style.display = 'flex';
}

function closeInstructions() {
    let elModal = document.querySelector('.bg-modal2');
    elModal.style.display = 'none';
}