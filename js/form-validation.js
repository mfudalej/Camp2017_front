(function() {
   var goButton  = document.getElementsByClassName('button-go')[0];         // Deklaracja zmiennych.
   var passInput = document.getElementsByClassName('password-input')[0];
   var errorMsg  = document.getElementsByClassName('error-message')[0];

   goButton.addEventListener('click', function(e) {                         // Obserwator zdarzenia dla przycisku Go.

       if (!passInput.value) {                  // Jeśli pole hasła jest puste.
           e.preventDefault();                  // Zablokowanie przeładowania strony.
           passInput.classList.add('error');    // Dodanie klasy 'error'.
           errorMsg.classList.remove('hide');   // Wyświetenie komunikatu o błędzie.
       }
   });

   passInput.addEventListener('blur', function() {      // Obserwator zdarzenia dla formularza hasła.
       if (passInput.value) {                   // Gdy hasło jest wpisane.
           passInput.classList.remove('error'); // Usunięcie klasy 'error'.
           errorMsg.classList.add('hide');      // Ukrycie komunikatu.
       }
   });
}());