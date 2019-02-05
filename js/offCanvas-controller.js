const EMAIL_ME_LINK = 'https://mail.google.com/mail/?view=cm&fs=1&to=simonifergan239@gmail.com&su=SUBJECT&body=BODY';

function toggleCanvas(){
    document.querySelector('.offcanvas-btn').classList.toggle('offcanvas-btn-open');
    document.querySelector('.offcanvas-aside').classList.toggle('offcanvas-aside-open');    
}

function onSubmitMessage(ev) {
    ev.preventDefault();
    let name = $('.send-name').val();
    let email = $('.send-email').val();
    let msg = $('.send-msg').val();
    if (!name || !email || !msg) {
        toggleCanvas();
        return;
    }
    //send msg
    let sendLink = EMAIL_ME_LINK.replace('SUBJECT', name + ' ' + email).replace('BODY', msg);
    window.open(sendLink, '_blank');
    toggleCanvas();
    // reset form
    $('.send-name').val('');
    $('.send-email').val('');
    $('.send-msg').val('');
}