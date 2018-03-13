window.onload = function() {
  document.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
      case 8:
      case 116:
      case 82:
      case 123:
      //case 13:
        event.preventDefault();
        break;
    }
  });
  var n = 0, w = 0, c = 0, optSelected = null;
  var secPerQst = 30;

  var questions = [
    '¿Cual es el planeta mas alejado del sol?',
    '¿Planeta mas grande del sistema solar?',
    '¿Luna mayor de saturno?',
    '¿Tercer planeta mayor del sistema solar?',
    '¿Cuantos satelites tiene el planeta marte?'
  ];

  var options = [
    ['Sol', 'Neptuno', 'Mercurio', 'Pluton'],
    ['Saturno', 'Venus', 'Jupiter', 'Marte'],
    ['Fobos', 'Luna', 'Mercurio', 'Titan'],
    ['Neptuno', 'Saturno', 'Urano', 'Tierra'],
    ['3', '4', '5', '2']
  ];

  var answers = [];
  var correctAnswers = [options[0][1], options[1][2], options[2][3],
                       options[3][2], options[4][3]];

  var question = document.getElementById('question');
  var opt = document.getElementById('options');
  var timer = document.getElementById('timer');

  var btnNext = document.getElementById('next');
  btnNext.addEventListener('click', function() {
    var theOpt = document.getElementsByName('q' + (n + 1));
    for (var i = 0; i < theOpt.length; i++) {
      if (theOpt[i].checked) {
        answers.push(theOpt[i].value);
        optSelected = true;
      }
    }

    if (answers.length == questions.length) {
        clearInterval(clock);
        for (var i = 0; i < answers.length; i++) {
          if (answers[i] == correctAnswers[i].toLowerCase()) {
            c++;
          } else {
            w++;
          }
        }
        document.title = 'Proceso terminado';
        question.innerText = 'La evaluacion ha finalizado satisfactoriamente ...';
        opt.innerHTML = 'Resultado: <br> ' + c + ' respuesta(s) corecta(s)';
        opt.innerHTML += ' y ' + w + ' incorrecta(s).<br>';
        opt.innerHTML += 'Calificacion: ' + (10 / answers.length) * c;
        timer.parentNode.removeChild(timer);
        btnNext.parentNode.removeChild(btnNext);
    } else {
      if (optSelected) {
        secPerQst = 31;
        if (n < questions.length - 1) {
          n++;
        }
        if (n == questions.length - 1) {
          btnNext.innerHTML = 'Terminar';
        }

        if (n < questions.length) {
          opt.innerHTML = '';
          question.innerHTML = 'Pregunta ' + (n + 1) + ' - ' + questions[n];

          for (var i = 0; i < options[n].length; i++) {
            opt.innerHTML += '<input type="radio" name="q' + (n + 1) + '" value="' + options[n][i].toLowerCase() + '"> ' + options[n][i] + '<br>';
          }
        }
        optSelected = null;
      } else {
        alert("¡Debes seleccionar una opcion!");
      }
    }
  });

  timer.innerHTML = 'Tienes <b>' + secPerQst + '</b> segundo(s) para responder';

  var clock = setInterval(function() {
    if (secPerQst != 0) {
      secPerQst--;
      timer.innerHTML = 'Tienes <b>' + secPerQst + '</b> segundo(s) para responder';
    } else {
      optSelected = false;
      var theOpt = document.getElementsByName('q' + (n + 1));
      for (var i = 0; i < theOpt.length; i++) {
        if (theOpt[i].checked) {
          answers.push(theOpt[i].value);
          optSelected = true;
        }
      }

      if (!optSelected) {
        answers.push('nothing');
      }
      //console.log(answers);
      //console.log(optSelected);

      if (answers.length == questions.length) {
        clearInterval(clock);
        for (var i = 0; i < answers.length; i++) {
          if (answers[i] == correctAnswers[i].toLowerCase()) {
            c++;
          } else {
            w++;
          }
        }
        document.title = 'Proceso terminado';
        question.innerText = 'La evaluacion ha finalizado satisfactoriamente ...';
        opt.innerHTML = 'Resultado: <br> <b>' + c + '</b> respuesta(s) corecta(s)';

        opt.innerHTML += ' y <b>' + w + '</b> incorrecta(s).<br>';
        opt.innerHTML += 'Calificacion: <b>' + (10 / answers.length) * c + '</b>';
        timer.parentNode.removeChild(timer);
        btnNext.parentNode.removeChild(btnNext);
      } else {
        secPerQst = 31;
        if (n < questions.length - 1) {
          n++;
        }
        if (n == questions.length - 1) {
          btnNext.innerHTML = 'Terminar';
        }

        if (n < questions.length) {
          opt.innerHTML = '';
          question.innerHTML = 'Pregunta ' + (n + 1) + ' - ' + questions[n];

          for (var i = 0; i < options[n].length; i++) {
            opt.innerHTML += '<input type="radio" name="q' + (n + 1) + '" value="' + options[n][i].toLowerCase() + '"> ' + options[n][i] + '<br>';
          }
        }
      }
    }
  }, 1000);

  question.innerHTML = 'Pregunta ' + (n + 1) + ' - ' + questions[n];

  for (var i = 0; i < options[n].length; i++) {
    opt.innerHTML += '<input type="radio" name="q' + (n + 1) + '" value="' + options[n][i].toLowerCase() + '"> ' + options[n][i] + '<br>';
  }

  document.oncontextmenu = function() {
    return false;
  };

  if (document.cookie == '') {
    document.cookie = 1;
  } else {
    document.cookie++;
  }
}

window.history.pushState(null, document.title, location.href);

window.addEventListener('popstate', function() {
  history.pushState(null, document.title, location.href);
});
