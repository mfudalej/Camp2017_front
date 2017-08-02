$(document).foundation();
$('.container').hide();

$(document).ready(function() {
    $(".container").fadeIn(1000);
});

// virtual keyboard
$('#keyboard')
    .keyboard({
        language: 'pl',
        openOn : null,
        layout: 'polish-qwerty',
        // stayOpen : true,
        // usePreview: false
    });

$('#open-keyboard').click(function () {
    var kb = $('#keyboard').getkeyboard();
    if ( kb.isOpen ) {
        kb.close();
    } else {
        kb.reveal();
    }
});