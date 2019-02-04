const EMAIL_ME = 'https://mail.google.com/mail/?view=cm&fs=1&to=simonifergan239@gmail.com&su=SUBJECT&body=BODY';

function toggleCanvas(){
    document.querySelector('.offcanvas-btn').classList.toggle('offcanvas-btn-open');
    document.querySelector('.offcanvas-aside').classList.toggle('offcanvas-aside-open');    
}

function onSubmitMessage(ev) {
    ev.preventDefault();
    console.log('here I am once again');
    let name = $('.send-name').val();
    let email = $('.send-email').val();
    let msg = $('.send-msg').val();
    msg += `\n\nSender: ${name} -- ${email}`;
    //send msg
    let sendLink = EMAIL_ME.replace('BODY', msg);
    window.open(sendLink, '_blank');
    toggleCanvas();
    // reset form
    $('.send-name').val('');
    $('.send-email').val('');
    $('.send-msg').val('');
}