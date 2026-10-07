/* ===== Configuração (edite aqui) ===== */
const CONFIG = {
  whatsapp: '5598991252339',
  // O Maps usa só as informações confirmadas (CEP + bairro + cidade); não há número de rua.
  place: 'CEP 65061-560, Bequimão, São Luís - MA'
};
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const q = encodeURIComponent(CONFIG.place);

/* WhatsApp: cada botão usa a mensagem do seu data-msg */
$$('.js-wa').forEach(a => {
  a.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(a.dataset.msg)}`;
});
/* Google Maps: pesquisa e rota */
$$('.js-map').forEach(a => a.href = `https://www.google.com/maps/search/?api=1&query=${q}`);
$$('.js-route').forEach(a => a.href = `https://www.google.com/maps/dir/?api=1&destination=${q}`);
$('#mapFrame').src = `https://maps.google.com/maps?q=${q}&output=embed`;

/* Header muda ao rolar */
const header = $('#header');
const onScroll = () => header.classList.toggle('scrolled', scrollY > 30);
addEventListener('scroll', onScroll, { passive: true }); onScroll();

/* Menu hambúrguer */
const burger = $('#burger'), nav = $('#nav');
burger.addEventListener('click', () => {
  burger.setAttribute('aria-expanded', nav.classList.toggle('open'));
});
$$('#nav a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open'); burger.setAttribute('aria-expanded', false);
}));

/* Reveal on scroll (também dispara a conversa da seção Tecnologia) */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .2 });
$$('.reveal').forEach((el, i) => { el.style.transitionDelay = (i % 3) * 90 + 'ms'; io.observe(el); });

/* Parallax leve com o mouse, só no hero e só em telas com mouse */
if (!reduced && matchMedia('(hover:hover)').matches) {
  const hero = $('.hero'), layers = $$('[data-depth]', hero);
  hero.addEventListener('pointermove', e => {
    const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
    layers.forEach(l => {
      const d = +l.dataset.depth;
      l.style.transform = `translate(${-x * d}px, ${-y * d}px)`;
    });
  });
}
