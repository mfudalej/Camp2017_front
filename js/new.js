(function() {

    const button = document.getElementsByClassName("button-go")[0];
    const input = document.getElementsByClassName("password-input")[0];

    console.log(button, input);

    button.addEventListener( "click", function(event) {
        console.log( input.value );
    });

})();