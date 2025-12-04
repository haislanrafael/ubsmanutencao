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
  setupCuriosidadePage();
  setupPromocaoPage();
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

function setupCuriosidadePage() {
  const page = document.getElementById('curiosidade-page');
  if (!page) return;
  const wrap = page.querySelector('.curio-button-wrap');
  const btn = document.getElementById('curio-button');
  const reveal = document.getElementById('curio-reveal');
  const phraseEl = document.getElementById('curio-phrase');
  const whats = document.getElementById('curio-whats');
  if (!wrap || !btn || !reveal || !phraseEl) return;
  let hoverX = 0;
  let hoverY = 0;
  const max = 14;
  wrap.addEventListener('mousemove', e => {
    const rect = wrap.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    hoverX = Math.max(Math.min((e.clientX - cx) * 0.08, max), -max);
    hoverY = Math.max(Math.min((e.clientY - cy) * 0.08, max), -max);
    btn.style.transform = `translate(${hoverX}px, ${hoverY}px)`;
  });
  wrap.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0)';
  });
  const phrases = [
    'Visita técnica gratuita para diagnóstico inicial.',
    'Propostas claras, prazos objetivos e segurança em primeiro lugar.',
    'Solda MIG/MAG, TIG e eletrodo com qualidade.',
    'Fabricação e reparos em estruturas metálicas sob medida.'
  ];
  let idx = 0;
  let typing = false;
  function typeText(el, text) {
    typing = true;
    el.textContent = '';
    let i = 0;
    function step() {
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        i++;
        setTimeout(step, 18);
      } else {
        typing = false;
      }
    }
    step();
  }
  function nextPhrase() {
    const text = phrases[idx % phrases.length];
    typeText(phraseEl, text);
    idx++;
  }
  btn.addEventListener('click', () => {
    window.location.href = 'promocao.html';
  });
  if (whats) {
    whats.addEventListener('click', () => {
      openWhatsApp('Olá! Quero entender como a UBS pode me ajudar.');
    });
  }
}

function setupPromocaoPage() {
  const page = document.getElementById('promocao-page');
  if (!page) return;
  const codeEl = document.getElementById('promo-code');
  const copyBtn = document.getElementById('btn-copy-code');
  const whatsBtn = document.getElementById('btn-whats-promo');
  function genCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let s = 'UBS-';
    for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
    return s;
  }
  const code = genCode();
  if (codeEl) codeEl.textContent = code;
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code);
        copyBtn.textContent = 'Código copiado';
        setTimeout(() => copyBtn.textContent = 'Copiar código', 1500);
      } catch { }
    });
  }
  if (whatsBtn) {
    whatsBtn.addEventListener('click', () => {
      const extra = `\n\nCódigo de desconto: ${code}\nOrigem: site`;
      openWhatsApp(`${window.DEFAULT_CONTACT_MESSAGE}${extra}`);
    });
  }
}
