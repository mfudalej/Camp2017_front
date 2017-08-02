$(document).foundation();
$('.container').hide();

$(document).ready(function() {
    $(".container").fadeIn(1000);
});

$('#password')
    .keyboard({
        openOn : null,
        stayOpen : true,
        layout : 'qwerty'
    })
    .addTyping();

$('#password-opener').click(function(){
    var kb = $('#password').getkeyboard();
    // close the keyboard if the keyboard is visible and the button is clicked a second time
    if ( kb.isOpen ) {
        kb.close();
    } else {
        kb.reveal();
    }
});
