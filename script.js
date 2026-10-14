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


  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    const feedback = document.querySelector('#form-feedback');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton ? submitButton.innerHTML : '';

    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!contactForm.reportValidity()) return;

      if (feedback) {
        feedback.textContent = 'Sending your enquiry…';
        feedback.classList.remove('is-success', 'is-error');
      }
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending…';
      }

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        });
        const result = await response.json();

        if (!response.ok || result.success === 'false' || result.success === false) {
          throw new Error(result.message || 'The enquiry could not be sent.');
        }

        contactForm.reset();
        if (feedback) {
          feedback.textContent = 'Thank you — your enquiry has been submitted successfully. I’ll be in touch as soon as I can.';
          feedback.classList.add('is-success');
        }
      } catch (error) {
        if (feedback) {
          feedback.textContent = 'Sorry, your enquiry could not be sent just now. Please try again or email info@gorilla82.co.uk directly.';
          feedback.classList.add('is-error');
        }
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerHTML = originalButtonText;
        }
      }
    });
  }


})();