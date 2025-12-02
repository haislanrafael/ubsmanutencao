// Número do WhatsApp oficial da UBS Manutenções
window.WHATSAPP_PHONE = '554184224262';
// Mensagem padrão ao iniciar contato pelo WhatsApp
window.DEFAULT_CONTACT_MESSAGE = `Olá, tudo bem?

Gostaria de obter mais informações sobre o serviço que vocês oferecem. Poderiam, por favor, me enviar detalhes sobre como funciona o processo, prazos e quais opções estão disponíveis?
Aproveito também para solicitar um orçamento e esclarecer algumas dúvidas que tenho para avaliar a melhor forma de avançar.

Desde já, agradeço pela atenção e fico no aguardo do retorno.

Atenciosamente.`;

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
    openWhatsApp(window.DEFAULT_CONTACT_MESSAGE);
  });
}

function setupFormContato() {
  const form = document.getElementById('form-contato');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const nome = (document.getElementById('nome')?.value || '').trim();
    const email = (document.getElementById('email')?.value || '').trim();
    const telefone = (document.getElementById('telefone')?.value || '').trim();
    const mensagem = (document.getElementById('mensagem')?.value || '').trim();

    const texto = `${window.DEFAULT_CONTACT_MESSAGE}\n\n` +
      `Nome: ${nome || 'N/A'}\n` +
      `Email: ${email || 'N/A'}\n` +
      `Telefone: ${telefone || 'N/A'}\n` +
      `Mensagem: ${mensagem || 'N/A'}`;

    openWhatsApp(texto);
  });
}

function setupWhatsAppFloat() {
  const floatBtn = document.getElementById('whatsapp-float');
  if (!floatBtn) return;
  floatBtn.addEventListener('click', e => {
    e.preventDefault();
    openWhatsApp(window.DEFAULT_CONTACT_MESSAGE);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  smoothScroll();
  setupMenuToggle();
  setupCTA();
  setupFormContato();
  setupWhatsAppFloat();
  setupGaleriaFallback();
});

function setupGaleriaFallback() {
  const imgs = document.querySelectorAll('.galeria-grid img');
  if (!imgs.length) return;
  imgs.forEach((img, idx) => {
    // Garantir carregamento preguiçoso para otimizar renderização
    try { img.loading = 'lazy'; } catch { }
    // Se a imagem falhar, usar um placeholder para não ficar vazio
    img.addEventListener('error', () => {
      const seed = `ubs_${idx + 1}`;
      img.src = `https://picsum.photos/seed/${seed}/800/600`;
    });
  });
}
