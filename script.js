(function () {
  'use strict';

  // Só esconde o menu no celular se este script estiver carregado
  document.documentElement.classList.add('js');

  // Menu para celular
  var btn = document.querySelector('.menu-toggle');
  var nav = document.getElementById('menu');
  if (btn && nav) {
    var setOpen = function (open) {
      nav.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    btn.addEventListener('click', function () {
      setOpen(btn.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        btn.focus();
      }
    });
    var wide = window.matchMedia('(min-width: 761px)');
    var onWide = function (e) { if (e.matches) setOpen(false); };
    if (wide.addEventListener) wide.addEventListener('change', onWide);
    else if (wide.addListener) wide.addListener(onWide);
  }

  // Formulário de orçamento: monta a mensagem e abre o WhatsApp
  var form = document.getElementById('form-orcamento');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var d = new FormData(form);
      var tipo = d.get('tipo');
      var tamanho = String(d.get('tamanho') || '').trim();
      var obs = String(d.get('mensagem') || '').trim();
      var linhas = [
        'Olá! Meu nome é ' + String(d.get('nome')).trim() + '.',
        'Quero um orçamento de guarderia.',
        'Embarcação: ' + tipo + (tamanho ? ', cerca de ' + tamanho + ' pés' : '') + '.',
        'Vaga: ' + d.get('vaga') + '.'
      ];
      if (obs) linhas.push('Observações: ' + obs);
      var url = 'https://wa.me/5548988478538?text=' + encodeURIComponent(linhas.join('\n'));
      var a = document.createElement('a');
      a.href = url; a.target = '_blank'; a.rel = 'noopener';
      document.body.appendChild(a); a.click(); a.remove();
    });
  }
})();
