$(document).foundation();
$('.container').hide();

$(document).ready(function() {
    $(".container").fadeIn(1000);
});

// virtual keyboard
$('#password-input').keyboard({
        language: 'pl',
        openOn : null,
        layout: 'polish-qwerty',
    });

$('#password-keyboard').click(function () {
    var kb = $('#password-input').getkeyboard();
    if ( kb.isOpen ) {
        kb.close();
    } else {
        kb.reveal();
    }
});

$('#id-input').keyboard({
        language: 'pl',
        openOn : null,
        layout: 'polish-qwerty',
        accepted : function () {
            $('#id-input').focus();
        }
    });

$('#id-keyboard').click(function () {
    var kb = $('#id-input').getkeyboard();
    if ( kb.isOpen ) {
        kb.close();
    } else {
        kb.reveal();
    }
});