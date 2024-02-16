const send = () => {
    axios({
        method: 'get',
        url: `http://localhost:3000/${document.location.href.match(/\/page\/(.*?)\.html/i)[1]}`,
    })
        .then(function (response) {
            // console.log(response.data);
            const dataArray = response.data.data;

            const table = document.getElementById("sqlTable");

            dataArray.forEach(dataItem => {
                const row = table.insertRow();

                for (const key in dataItem) {
                    const cell = row.insertCell();
                    cell.textContent = dataItem[key];
                    cell.setAttribute("data-cell-name", key);
                }
                row.setAttribute("data-row-id", dataItem.Идентификатор);

                // Создаем ячейку для кнопки удаления
                const deleteCell = row.insertCell();
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Удалить";
                deleteButton.setAttribute("data-cell-name", "Действия");
                deleteButton.addEventListener("click", function () {
                    const rowId = this.parentElement.parentElement.dataset.rowId; // Получаем идентификатор строки
                    // console.log(rowId);
                    deleteRowWithConfirmation(rowId); // Вызываем функцию для удаления строки
                });
                deleteCell.appendChild(deleteButton);
            });

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

            addEventListenersToCells();
        })
        .catch(function (error) {
            console.log(error);
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
        })
        .finally(function () {
            // always executed
        });
}

send();