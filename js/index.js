/************ Nav Section ***********/
(function() {
  const hamburgerButton = document.querySelector('.hamburger-btn');
  const menu = document.querySelector('.nav-menu');
  
  hamburgerButton.addEventListener('click', (event) => {
    const target = event.target.getAttribute('data-target');

    if(target === '.show' && menu.classList.contains('hide')){
      menu.classList.remove('hide');
      menu.classList.add('show');
    }
  });
})();

(function() {
  const closeMenuButton = document.querySelector('.close-nav-menu');
  const menu = document.querySelector('.nav-menu');
  
  closeMenuButton.addEventListener('click', (event) => {
    const target = event.target.getAttribute('data-target');

    if(target === '.hide' && menu.classList.contains('show')){
      menu.classList.remove('show');
      menu.classList.add('hide');
    }
  });
})();