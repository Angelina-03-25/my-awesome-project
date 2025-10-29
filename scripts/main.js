// Функция для переключения темы
function toggleTheme() {
  // Проверяем, есть ли у body класс 'theme-dark'
  if (document.body.classList.contains('theme-dark')) {
    // Если есть, удаляем его (возвращаемся к светлой теме)
    document.body.classList.remove('theme-dark');
    // Сохраняем выбор в localStorage
    localStorage.setItem('theme', 'light');
    // Меняем текст кнопки
    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) themeToggleBtn.textContent = 'Переключить тему';
  } else {
    // Если нет, добавляем его (переходим к темной теме)
    document.body.classList.add('theme-dark');
    // Сохраняем выбор в localStorage
    localStorage.setItem('theme', 'dark');
    // Меняем текст кнопки
    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) themeToggleBtn.textContent = 'Светлая тема';
  }
}

// Проверяем сохранённую тему в localStorage при загрузке страницы
function applySavedTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('theme-dark');
    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) themeToggleBtn.textContent = 'Светлая тема';
  } else {
    // Если тема не сохранена или 'light', оставляем светлую (ничего не делаем)
    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) themeToggleBtn.textContent = 'Переключить тему';
  }
}

// Применяем сохранённую тему при загрузке
applySavedTheme();

// Добавляем обработчик события клика к кнопке (если она существует на странице)
document.addEventListener('DOMContentLoaded', function() {
    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', toggleTheme);
    }
    // --- Твоя существующая логика для модального окна и маски телефона ---
    // Получаем элементы модального окна и формы
    const dlg = document.getElementById('contactDialog');
    const openBtn = document.getElementById('openDialog');
    const closeBtn = document.getElementById('closeDialog');
    const form = document.getElementById('contactForm');
    let lastActive = null;

    // Открытие модального окна
    if (openBtn && dlg) {
        openBtn.addEventListener('click', () => {
            lastActive = document.activeElement;
            dlg.showModal();
            // Фокус на первое поле формы
            dlg.querySelector('.form__control')?.focus();
        });
    }

    // Закрытие модального окна по кнопке
    if (closeBtn && dlg) {
        closeBtn.addEventListener('click', () => dlg.close('cancel'));
    }

    // Обработчик отправки формы (исправленная версия)
    if (form && dlg) {
        form.addEventListener('submit', (e) => {
            // Очищаем кастомные сообщения об ошибках
            [...form.elements].forEach(el => el.setCustomValidity?.(''));

            // Если форма не валидна
            if (!form.checkValidity()) {
                e.preventDefault();

                // Кастомное сообщение для email
                const email = form.elements.email;
                if (email?.validity.typeMismatch) {
                    email.setCustomValidity('Введите корректный e-mail, например name@example.com');
                }

                // Показываем стандартные сообщения браузера
                form.reportValidity();

                // Устанавливаем aria-invalid для невалидных полей
                [...form.elements].forEach(el => {
                    if (el.willValidate) el.toggleAttribute('aria-invalid', !el.checkValidity());
                });
                return;
            }

            // Если форма валидна — закрываем диалог и сбрасываем форму
            e.preventDefault();
            dlg.close('success');
            form.reset();
        });
    }

    // Возвращаем фокус на кнопку открытия после закрытия модалки
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

