(function() {                                            // Funkcja IIFE (smowywołująca się).
    const idInput        = document.getElementsByClassName('id-input')[0],              // Deklaracja zmiennych.
          idKeyboard     = document.getElementById('id-keyboard'),
          idParagraph    = document.getElementsByClassName('id-paragraph')[0],
          idResetButton  = document.getElementsByClassName('id-reset')[0],
          goButton       = document.getElementsByClassName('button-go')[0],
          passInput      = document.getElementsByClassName('password-input')[0],
          errorMsg       = document.getElementsByClassName('password-error-msg')[0],
          resetButton    = document.getElementsByClassName('button-select-other')[0],
          buttonsRow     = document.getElementsByClassName('button-row')[0];

    function resetId() {
        idParagraph.innerHTML = "";
        idInput.value = "";
        idParagraph.classList.add('hide');
        idResetButton.classList.add('hide');
        idInput.classList.remove('hide');
        idKeyboard.classList.remove('hide');
    }

    function passwordErrorReset() {
        passInput.classList.remove('error');             // Usunięcie klasy 'error'.
        errorMsg.classList.add('hide');                  // Ukrycie komunikatu błędu.
        buttonsRow.style.marginTop = '45px';
    }

    function showPasswordError() {
        passInput.classList.add('error');                // Dodanie klasy error.
        errorMsg.classList.remove('hide');               // Pokdazanie komunikatu błędu.
        buttonsRow.style.marginTop = '2px';              // Aktualizacja położenia przycisków formularza.
    }

    idInput.addEventListener('blur', function() {         // Obserwator zdarzenia dla przycisku zatwierdzającego Id.
        if (idInput.value) {                              // Jeżeli pole Id jest wypełnione.
            idInput.classList.add('hide');
            idParagraph.innerHTML = idInput.value;
            idParagraph.classList.remove('hide');
            idResetButton.classList.remove('hide');
            idKeyboard.classList.add('hide');
        }
    });

    idResetButton.addEventListener('click', resetId);    // Obserwator zdarzenia dla przycisku usuwającego wprowadzone Id.

    goButton.addEventListener('click', function(e) {     // Obserwator zdarzenia dla przycisku Go.
        var login = idInput.value,                       // Zadeklarowanie wartości wprowadzonch do formularza jako zmienne.
            password = passInput.value;

        e.preventDefault();                              // Zablokowanie przejścia do index.html.

        $.ajax ({                                        // Żądanie Ajax, obsługa sprawdzenia loginu i hasła.
            type: "post",
            data: {
                login: login,
                password: password
            },
            url: "https://efigence-camp.herokuapp.com/api/login",
            error: function(response) {                 // Jeśli hasło lub login są błędne
                var msg = response.responseJSON.message;// Przygotowanie komunikatu o błędzie.
                errorMsg.innerHTML = msg;               // Uaktualnienie zawartości elementu html.
                showPasswordError();                    // Wyświetlenie komunikatu.
            },
            success: function(response) {               // Jeśli hasło i login są poprawne.
                window.location.href = 'index.html'     // Przejście na kolejną stronę.
            }
        });
    });

    passInput.addEventListener('focus', function() {     // Obserwator zdarzenia blur dla formularza hasła.
        passwordErrorReset();                            // Usunięcie komunikatu o nieprawidłowym haśle.
    });

    idInput.addEventListener('keyup', function(e) {
        if (e.which === 13 || e.keyCode === 13) {
            passInput.focus();
        }
    });

    passInput.addEventListener('keyup', function(e) {
        if ( e.which === 13 || e.keyCode === 13 ) {
            goButton.click();
        }
    });

    resetButton.addEventListener('click', function () {  // Obserwator zdarzenia dla przycisku 'Select other'.
        resetId();                                       // Reset formularza Id.
        passwordErrorReset();                            // Usunięcie komunikatu.
        passInput.value = "";                            // Reset formularza hasła.
    });
}());