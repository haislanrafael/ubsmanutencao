// Número do WhatsApp (alterar para o número oficial)
window.WHATSAPP_PHONE = window.WHATSAPP_PHONE || '5541998278767';

function smoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');
      if (targetId.length > 1) {
        e.preventDefault();
        const el = document.querySelector(targetId);
        if (el) {
          const header = document.querySelector('.header');
          const offset = header ? header.offsetHeight : 0;
          const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });
}

function setupMenuToggle() {
  const toggle = document.getElementById('menu-toggle');
  const navList = document.querySelector('.nav-list');
  if (!toggle || !navList) return;
  toggle.addEventListener('click', () => {
    const isOpen = getComputedStyle(navList).display !== 'none';
    navList.style.display = isOpen ? 'none' : 'flex';
  });
}

function openWhatsApp(message) {
  const url = `https://wa.me/${window.WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

function setupCTA() {
  const btnOrc = document.getElementById('btn-orcamento');
  if (!btnOrc) return;
  btnOrc.addEventListener('click', () => {
    const msg = 'Olá! Gostaria de solicitar um orçamento para serviços de solda/manutenção.';
    openWhatsApp(msg);
  });
}

function setupFormContato() {
  const form = document.getElementById('form-contato');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();
    const texto = `Olá! Meu nome é ${nome}.\nEmail: ${email}\nTelefone: ${telefone}\nMensagem: ${mensagem}`;
    openWhatsApp(texto);
  });
}

function setupWhatsAppFloat() {
  const floatBtn = document.getElementById('whatsapp-float');
  if (!floatBtn) return;
  floatBtn.addEventListener('click', e => {
    e.preventDefault();
    const msg = 'Olá! Preciso de ajuda com serviços de solda/manutenção.';
    openWhatsApp(msg);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  smoothScroll();
  setupMenuToggle();
  setupCTA();
  setupFormContato();
  setupWhatsAppFloat();
});

