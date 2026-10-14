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

  const form = document.querySelector('#contact-form');
  const feedback = document.querySelector('#form-feedback');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const business = String(data.get('business') || '').trim();
      const email = String(data.get('email') || '').trim();
      const project = String(data.get('project') || '').trim();
      const message = String(data.get('message') || '').trim();
      const recipient = 'info@gorilla82.co.uk'; // Replace with your real email address.
      const subject = encodeURIComponent(`Website enquiry from ${business}`);
      const body = encodeURIComponent(
        `Hi Gorilla 82,\n\nMy name is ${name} and my business is ${business}.\nEmail: ${email}\nProject: ${project}\n\n${message || 'I would like to discuss a website project.'}\n\nThanks,\n${name}`
      );
      if (feedback) feedback.textContent = 'Opening your email app with the enquiry prepared…';
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    });
  }
})();