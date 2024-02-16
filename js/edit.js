const editModal = new bootstrap.Modal(document.getElementById('editModal'));

function addEventListenersToCells() {
    const cells = document.querySelectorAll('td');

    cells.forEach(cell => {
        cell.addEventListener('click', function () {
            const cellName = this.dataset.cellName;
            const oldValue = this.textContent;
            const rowId = this.parentElement.dataset.rowId;
            if (cellName != "Идентификатор" && cellName != undefined) {
                const newValueInput = document.getElementById('newValueInput');
                newValueInput.value = oldValue;
                const saveChangesButton = document.getElementById('saveChangesButton');

                // Удаляем предыдущий обработчик события перед добавлением нового
                saveChangesButton.onclick = null;

                saveChangesButton.onclick = function () {
                    const newValue = newValueInput.value;
                    if (newValue !== null && newValue !== oldValue) {
                        // Отправить запрос на сервер для обновления данных
                        axios({
                            method: 'get',
                            url: 'http://localhost:3000/update',
                            params: {
                                rowId: rowId,
                                oldValue: oldValue,
                                table: document.location.href.match(/\/page\/(.*?)\.html/i)[1],
                                dataToUpdate: {
                                    columnName: cellName,
                                    newValue: newValue
                                }
                            }
                        })
                            .then(response => {
                                console.log(response.data);
                                // Обновить значение ячейки
                                cell.textContent = newValue;
                                // Закрыть модальное окно

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

                                editModal.hide();
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
                };

                // Показать модальное окно
                editModal.show();
            }
        });
    });
}
