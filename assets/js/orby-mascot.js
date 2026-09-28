// Controla as expressões/animações do mascote Orby.
// Funciona em qualquer tela que tenha um ".orby-mascot" dentro de um <form>,
// reagindo automaticamente aos campos de texto/email e senha daquele form.
(function () {
  function anyFieldFocused(form) {
    return form.contains(document.activeElement) &&
      (document.activeElement.tagName === 'INPUT');
  }

  function initMascot(mascot) {
    var form = mascot.closest('form');
    if (!form) return;

    var pupils = mascot.querySelectorAll('.orby-pupil');
    var textInputs = form.querySelectorAll('input[type="text"], input[type="email"]');
    var passwordInputs = form.querySelectorAll('input[type="password"]');

    function setState(state) {
      mascot.setAttribute('data-state', state);
    }

    // Move os olhos levemente de acordo com o quanto o usuário já digitou,
    // dando a impressão de que o Orby está "acompanhando" o texto.
    function trackEyes(input) {
      var value = input.value || '';
      var ratio = Math.min(value.length / 24, 1); // 0 -> 1
      var offsetX = (ratio - 0.5) * 6; // -3px .. 3px
      pupils.forEach(function (pupil) {
        pupil.style.transform = 'translateX(' + offsetX.toFixed(1) + 'px)';
      });
    }

    function resetEyes() {
      pupils.forEach(function (pupil) { pupil.style.transform = ''; });
    }

    // Quando ninguém interage com o form, o Orby dá uma olhadinha para o
    // lado de vez em quando, sozinho, para não ficar "estático demais".
    function scheduleIdleGlance() {
      var delay = 5000 + Math.random() * 4000;
      setTimeout(function () {
        if (mascot.getAttribute('data-state') === 'default') {
          var dir = (Math.random() > 0.5 ? 1 : -1) * (2 + Math.random() * 2);
          pupils.forEach(function (pupil) {
            pupil.style.transform = 'translateX(' + dir.toFixed(1) + 'px)';
          });
          setTimeout(function () {
            if (mascot.getAttribute('data-state') === 'default') resetEyes();
          }, 500);
        }
        scheduleIdleGlance();
      }, delay);
    }
    scheduleIdleGlance();

    textInputs.forEach(function (input) {
      input.addEventListener('focus', function () {
        setState('typing-email');
        trackEyes(input);
      });
      input.addEventListener('input', function () {
        trackEyes(input);
      });
      input.addEventListener('blur', function () {
        resetEyes();
        if (!anyFieldFocused(form)) setState('default');
      });
    });

    passwordInputs.forEach(function (input) {
      input.addEventListener('focus', function () {
        setState('password');
      });
      input.addEventListener('blur', function () {
        if (!anyFieldFocused(form)) setState('default');
      });
    });

    form.addEventListener('submit', function () {
      setState('loading');
    });

    // API por instância, útil quando há mais de um mascote na página.
    mascot.orby = {
      setState: setState,
      success: function () {
        setState('success');
        setTimeout(function () { setState('default'); }, 1600);
      },
      error: function () {
        setState('error');
        setTimeout(function () { setState('default'); }, 1200);
      }
    };
  }

  var mascots = document.querySelectorAll('.orby-mascot');
  mascots.forEach(initMascot);

  // API global: aciona o(s) mascote(s) da página atual.
  //   window.OrbyMascot.success();
  //   window.OrbyMascot.error();
  window.OrbyMascot = {
    success: function () { mascots.forEach(function (m) { m.orby.success(); }); },
    error: function () { mascots.forEach(function (m) { m.orby.error(); }); },
    setState: function (state) { mascots.forEach(function (m) { m.orby.setState(state); }); }
  };
})();
