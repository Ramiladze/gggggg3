// Функция для удаления строки с подтверждением
function deleteRowWithConfirmation(rowId) {
    // Отображаем модальное окно для подтверждения удаления
    var myModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'), {
        keyboard: false
    });
    myModal.show();

    // Устанавливаем обработчик события для кнопки подтверждения удаления
    document.getElementById("confirmDeleteButton").onclick = function () {
        // Выполняем удаление строки
        deleteRow(rowId);
        // Закрываем модальное окно
        myModal.hide();
    };
}

function deleteRow(rowId) {
    console.log(rowId + " deleted");
    axios({
        method: 'post',
        url: 'http://localhost:3000/delete',
        params: {
            table: document.location.href.match(/\/page\/(.*?)\.html/i)[1],
            rowId: rowId
        }
    })
        .then(function (response) {
            console.log(response.data);
            // Можно выполнить дополнительные действия после успешного удаления
            // После успешного удаления вызываем функцию для обновления таблицы

            const successContainer = document.getElementById('successContainer');
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

            updateTable();
        })
        .catch(function (error) {
            console.error('Ошибка при отправке запроса:', error);
            // Обработка ошибок
            const errorContainer = document.getElementById('errorContainer');
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
}

// Функция для обновления таблицы
function updateTable() {
    axios.get(`http://localhost:3000/${document.location.href.match(/\/page\/(.*?)\.html/i)[1]}`)
        .then(function (response) {
            const dataArray = response.data.data;
            const table = document.getElementById("sqlTable");
            // Очищаем содержимое таблицы перед обновлением
            table.innerHTML = '';
            dataArray.forEach(dataItem => {
                const row = table.insertRow();
                for (const key in dataItem) {
                    const cell = row.insertCell();
                    cell.textContent = dataItem[key];
                    cell.setAttribute("data-cell-name", key);
                    cell.setAttribute("data-cell-id", dataItem.Идентификатор);
                }
                // Добавляем ячейку для кнопки удаления
                const deleteCell = row.insertCell();
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Удалить";
                deleteButton.addEventListener("click", function () {
                    deleteRowWithConfirmation(dataItem.Идентификатор); // Вызываем функцию для удаления строки с подтверждением
                });


                deleteCell.appendChild(deleteButton);
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}
