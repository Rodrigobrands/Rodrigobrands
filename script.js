// Menu mobile toggle
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Fecha menu ao clicar em link
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('active'));
});

// Fade in animado com Intersection Observer para seções
const fadeEls = document.querySelectorAll('.fade-in, .fade-in-up');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.1});

fadeEls.forEach(el => {
  el.style.animationPlayState = 'paused';
  observer.observe(el);
});

// Carrossel de depoimentos
const comments = document.querySelectorAll('.comentario');
let currentComment = 0;

const showComment = index => {
  comments.forEach((c,i) => {
    c.classList.toggle('active', i === index);
  });
};

document.getElementById('prev').addEventListener('click', () => {
  currentComment = (currentComment === 0) ? comments.length - 1 : currentComment - 1;
  showComment(currentComment);
});

document.getElementById('next').addEventListener('click', () => {
  currentComment = (currentComment + 1) % comments.length;
  showComment(currentComment);
});

// Auto slide depoimentos a cada 7s
setInterval(() => {
  currentComment = (currentComment + 1) % comments.length;
  showComment(currentComment);
}, 7000);

// Modal Portfólio
const portfolioItems = document.querySelectorAll('.portfolio .item');
if (portfolioItems.length) {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <button class="modal-close" aria-label="Fechar modal">&times;</button>
      <img src="" alt="" id="modal-img" />
      <p id="modal-desc"></p>
    </div>
  `;
  document.body.appendChild(modal);

  const modalImg = modal.querySelector('#modal-img');
  const modalDesc = modal.querySelector('#modal-desc');
  const modalClose = modal.querySelector('.modal-close');

  portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
      modalImg.src = item.dataset.img;
      modalDesc.textContent = item.dataset.desc;
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
      modalClose.focus();
    });
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });

  modalClose.addEventListener('click', () => {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  });

  modal.addEventListener('click', e => {
    if(e.target === modal){
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }
  });

  // Fechar modal com ESC
  document.addEventListener('keydown', e => {
    if(e.key === 'Escape' && modal.classList.contains('show')){
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }
  });
}

// Botão voltar ao topo
const btnTopo = document.getElementById('btn-topo');
window.addEventListener('scroll', () => {
  if(window.scrollY > 300){
    btnTopo.classList.add('show');
  } else {
    btnTopo.classList.remove('show');
  }
});

btnTopo.addEventListener('click', () => {
  window.scrollTo({top: 0, behavior: 'smooth'});
});

// Validação formulário contato
const form = document.getElementById('contact-form');
if(form){
  const nome = form.nome;
  const email = form.email;
  const mensagem = form.mensagem;
  const successMsg = document.getElementById('form-success');

  function showError(input, message){
    const small = input.nextElementSibling;
    small.textContent = message;
    input.classList.add('error');
  }

  function clearError(input){
    const small = input.nextElementSibling;
    small.textContent = '';
    input.classList.remove('error');
  }

  function isEmailValid(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    if(nome.value.trim().length < 3){
      showError(nome, 'Por favor, insira um nome válido com ao menos 3 caracteres.');
      valid = false;
    } else clearError(nome);

    if(!isEmailValid(email.value.trim())){
      showError(email, 'Por favor, insira um e-mail válido.');
      valid = false;
    } else clearError(email);

    if(mensagem.value.trim().length < 10){
      showError(mensagem, 'A mensagem deve ter ao menos 10 caracteres.');
      valid = false;
    } else clearError(mensagem);

    if(valid){
      // Simular envio (aqui pode implementar backend)
      successMsg.textContent = 'Mensagem enviada com sucesso! Obrigado por entrar em contato.';
      form.reset();
    } else {
      successMsg.textContent = '';
    }
  });
}
