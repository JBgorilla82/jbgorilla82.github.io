(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-nav');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    }));
  }

  const filterButtons = document.querySelectorAll('[data-filter]');
  const projects = document.querySelectorAll('.project-card');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      projects.forEach(project => {
        project.hidden = filter !== 'all' && project.dataset.category !== filter;
      });
    });
  });

  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  const packageLinks = document.querySelectorAll('[data-package]');
  const projectSelect = document.querySelector('#project');
  packageLinks.forEach(link => link.addEventListener('click', () => {
    if (projectSelect) {
      const packageName = link.dataset.package || '';
      projectSelect.value = packageName.toLowerCase().includes('refresh')
        ? "I'd like to refresh my existing website"
        : packageName.toLowerCase().includes('portfolio')
          ? "I'd like to discuss a portfolio website"
          : "I'm looking for a new website";
    }
  }));


})();