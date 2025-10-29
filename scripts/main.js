// Функция для переключения темы
function toggleTheme() {

  if (document.body.classList.contains('theme-dark')) {

    document.body.classList.remove('theme-dark');

    localStorage.setItem('theme', 'light');

    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) themeToggleBtn.textContent = 'Переключить тему';
  } else {

    document.body.classList.add('theme-dark');

    localStorage.setItem('theme', 'dark');

    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) themeToggleBtn.textContent = 'Светлая тема';
  }
}


function applySavedTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('theme-dark');
    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) themeToggleBtn.textContent = 'Светлая тема';
  } else {

    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) themeToggleBtn.textContent = 'Переключить тему';
  }
}


applySavedTheme();


document.addEventListener('DOMContentLoaded', function() {
    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', toggleTheme);
    }
    const dlg = document.getElementById('contactDialog');
    const openBtn = document.getElementById('openDialog');
    const closeBtn = document.getElementById('closeDialog');
    const form = document.getElementById('contactForm');
    let lastActive = null;


    if (openBtn && dlg) {
        openBtn.addEventListener('click', () => {
            lastActive = document.activeElement;
            dlg.showModal();

            dlg.querySelector('.form__control')?.focus();
        });
    }


    if (closeBtn && dlg) {
        closeBtn.addEventListener('click', () => dlg.close('cancel'));
    }


    if (form && dlg) {
        form.addEventListener('submit', (e) => {

            [...form.elements].forEach(el => el.setCustomValidity?.(''));


            if (!form.checkValidity()) {
                e.preventDefault();

                const email = form.elements.email;
                if (email?.validity.typeMismatch) {
                    email.setCustomValidity('Введите корректный e-mail, например name@example.com');
                }


                form.reportValidity();

                [...form.elements].forEach(el => {
                    if (el.willValidate) el.toggleAttribute('aria-invalid', !el.checkValidity());
                });
                return;
            }


            e.preventDefault();
            dlg.close('success');
            form.reset();
        });
    }

    if (dlg) {
        dlg.addEventListener('close', () => {
            lastActive?.focus();
        });
    }

    // Маска для телефона
    const phone = document.getElementById('phone');
    if (phone) {
        phone.addEventListener('input', () => {
            const digits = phone.value.replace(/\D/g,'').slice(0,11); // до 11 цифр
            const d = digits.replace(/^8/, '7');
            const parts = [];
            if (d.length > 0) parts.push('+7');
            if (d.length > 1) parts.push(' (' + d.slice(1,4));
            if (d.length >= 4) parts[parts.length - 1] += ')';
            if (d.length >= 5) parts.push(' ' + d.slice(4,7));
            if (d.length >= 8) parts.push('-' + d.slice(7,9));
            if (d.length >= 10) parts.push('-' + d.slice(9,11));
            phone.value = parts.join('');
        });
    }
});

