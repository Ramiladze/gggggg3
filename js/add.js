const tableHeaders = Array.from(document.querySelectorAll('#table th')).map(th => th.textContent);

// Находим контейнеры
const successContainer = document.getElementById('successContainer');
const errorContainer = document.getElementById('errorContainer');

// Создаем форму
const form = document.createElement('form');
form.id = 'addForm';
form.classList.add('mt-5');
form.classList.add('mb-5');

// Исключаем колонки "Действия" и "ID"
const excludedColumns = ['Действия', 'Идентификатор'];

// Создаем поля ввода данных на основе заголовков колонок таблицы
tableHeaders.forEach(header => {
    if (!excludedColumns.includes(header)) {
        const label = document.createElement('label');
        label.textContent = header;

        const input = document.createElement('input');
        if (header === 'Дата_поступления' || header === 'Дата_операции' || header === 'Дата_заказа') {
            input.type = 'date'; // Устанавливаем тип "date" для поля ввода даты
        } else {
            input.type = 'text'; // Или другой тип, если не дата
        }
        input.name = header.toLowerCase(); // Приводим названия колонок к нижнему регистру для удобства

        const div = document.createElement('div');
        div.classList.add('mt-3');
        div.classList.add('mb-3');
        div.appendChild(label);
        div.appendChild(input);

        form.appendChild(div);
    }
});

// Создаем кнопку для отправки формы
const submitButton = document.createElement('button');
submitButton.type = 'submit';
submitButton.textContent = 'Добавить';
submitButton.classList.add('btn', 'btn-primary');
form.appendChild(submitButton);

// Добавляем форму под контейнеры
successContainer.parentNode.insertBefore(form, successContainer.nextSibling);

// Обработчик отправки формы
document.getElementById('addForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Предотвращаем обычное поведение формы (перезагрузку страницы)

    // Собираем данные из полей формы
    const formData = new FormData(this);

    // Проверяем, что все поля не пустые
    let isValid = true;
    formData.forEach(value => {
        if (!value.trim()) { // Удаляем лишние пробелы и проверяем, что значение не пустое
            isValid = false;
        }
    });

    if (!isValid) {
        // Если хотя бы одно поле пустое, выводим сообщение об ошибке
        errorContainer.innerHTML = `
            <div class="alert alert-danger mt-5" role="alert">
                Одно или несколько полей не заполнены. Пожалуйста, заполните все поля.
            </div>
        `;
        errorContainer.style.display = 'block';

        // Скрываем сообщение об ошибке через 3 секунды
        setTimeout(function () {
            errorContainer.style.display = 'none';
        }, 3000);

        return; // Прерываем выполнение функции
    }

    // Преобразуем данные в объект
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Отправляем GET-запрос на сервер
    axios.get('http://localhost:3000/add', {
        params: {
            table: document.location.href.match(/\/page\/(.*?)\.html/i)[1],
            data: data
        }

    })
        .then(response => {
            console.log(response.data);

            const sqlTable = document.getElementById('sqlTable');
            sqlTable.innerHTML = '';

            send();

            // Обработка успешного ответа
            successContainer.innerHTML = `
            <div class="alert alert-success mt-5" role="alert">
            ${response.data.message}
            </div>
        `;
            successContainer.style.display = 'block';
            // Скрываем сообщение об успешном выполнении через 3 секунды
            setTimeout(function () {
                successContainer.style.display = 'none';
            }, 3000);
        })
        .catch(error => {
            console.error('Ошибка при отправке запроса:', error);
            // Обработка ошибки
            errorContainer.innerHTML = `
            <div class="alert alert-danger mt-5" role="alert">
                Ошибка: ${error.response ? error.response.data.error : error.message}
            </div>
        `;
            errorContainer.style.display = 'block';

            // Скрываем сообщение об ошибке через 3 секунды
            setTimeout(function () {
                errorContainer.style.display = 'none';
            }, 3000);
        });
});

errorContainer.parentNode.insertBefore(form, errorContainer.nextSibling);
