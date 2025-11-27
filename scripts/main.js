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

// --- Функции для модального окна добавления записи в дневник (pages/diary.html) ---
let addEntryModalInstance = null; // Глобальная переменная для хранения ссылки на модалку

document.addEventListener('DOMContentLoaded', function () {
    // Пытаемся найти модальное окно добавления записи на странице
    const modalElement = document.getElementById('addEntryModal');
    if (modalElement) {
        // Если нашли, сохраняем ссылку
        addEntryModalInstance = modalElement;

        // Добавляем обработчик клика на backdrop для закрытия
        addEntryModalInstance.addEventListener('click', (event) => {
            if (event.target === addEntryModalInstance) {
                closeAddEntryModal();
            }
        });
    }
    // Если не нашли - ничего не делаем, видимо, это не та страница
});

function openAddEntryModal() {
    if (addEntryModalInstance) {
        // Очищаем форму перед открытием
        const form = document.getElementById('addEntryForm');
        if (form) {
            form.reset();
        }
        // Открываем модальное окно
        addEntryModalInstance.showModal();
    } else {
        console.error("Модальное окно 'addEntryModal' не найдено на этой странице.");
        // alert("Ошибка: Модальное окно не найдено!"); // Опционально, для отладки
    }
}

function closeAddEntryModal() {
    if (addEntryModalInstance) {
        addEntryModalInstance.close();
    }
}

// --- Функция для обработки отправки формы новой записи (pages/diary.html) ---
function submitNewEntry() {
    if (!addEntryModalInstance) {
         console.error("Модальное окно 'addEntryModal' не найдено.");
         return;
    }
    const form = document.getElementById('addEntryForm');
    if (!form) {
         console.error("Форма 'addEntryForm' не найдена.");
         return;
    }
    const formData = new FormData(form);

    // Простая валидация
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Собираем данные формы
    const data = {
        date: formData.get('entryDate'),
        topic: formData.get('entryTopic'),
        content: formData.get('entryContent'),
        tags: formData.get('entryTags').split(',').map(tag => tag.trim()).filter(tag => tag),
        status: formData.get('entryStatus')
    };

    // В реальном приложении здесь был бы AJAX-запрос или добавление в localStorage/IndexedDB
    console.log('Новая запись в дневник (из main.js):', data);
    alert(`Запись "${data.topic}" добавлена! (Это демо, данные не сохранены на сервере)`);

    // Закрываем модальное окно
    closeAddEntryModal();
    // Здесь можно добавить логику для обновления DOM (добавления новой записи на страницу)
    // Пока просто перезагрузим страницу, чтобы увидеть эффект (не лучший способ, но для демо сойдёт)
    // location.reload();
}