document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  // Alternar menu mobile
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('open');
  });

  // Fechar menu ao clicar em link
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if(navMenu.classList.contains('active')){
        navMenu.classList.remove('active');
        menuToggle.classList.remove('open');
      }
    });
  });

  // Fechar menu ao clicar fora do menu (em área escura)
  document.addEventListener('click', e => {
    if(navMenu.classList.contains('active') &&
      !navMenu.contains(e.target) &&
      e.target !== menuToggle){
      navMenu.classList.remove('active');
      menuToggle.classList.remove('open');
    }
  });

  // Modal portfolio
  const portfolioItems = document.querySelectorAll('.item');
  const modal = document.getElementById('modal-portfolio');
  const modalImg = document.getElementById('modal-img');
  const modalDesc = document.getElementById('modal-desc');
  const modalClose = modal.querySelector('.modal-close');

  portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.getAttribute('data-img');
      const desc = item.getAttribute('data-desc');
      modalImg.src = imgSrc;
      modalImg.alt = item.querySelector('img').alt;
      modalDesc.textContent = desc;
      modal.classList.add('show');
      modal.focus();
    });
    item.addEventListener('keydown', e => {
      if(e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });

  modalClose.addEventListener('click', () => {
    modal.classList.remove('show');
  });

  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.remove('show');
    }
  });

  // Depoimentos controle
  const depoimentos = document.querySelectorAll('.comentario');
  const depoimentosBtns = document.querySelectorAll('.depoimentos-controls button');

  depoimentosBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      depoimentos.forEach(dep => {
        dep.classList.toggle('active', dep.id === targetId);
      });
      depoimentosBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});
