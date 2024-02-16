-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Фев 16 2024 г., 01:49
-- Версия сервера: 8.0.19
-- Версия PHP: 7.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `toys_db`
--

-- --------------------------------------------------------

--
-- Структура таблицы `игрушки`
--

CREATE TABLE `игрушки` (
  `Идентификатор` int NOT NULL,
  `Название` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Описание` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Категория` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Цена` decimal(10,2) NOT NULL,
  `Количество` int NOT NULL,
  `Поставщик` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Дата_поступления` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `игрушки`
--

INSERT INTO `игрушки` (`Идентификатор`, `Название`, `Описание`, `Категория`, `Цена`, `Количество`, `Поставщик`, `Дата_поступления`) VALUES
(1, 'Мягкая игрушка \"Мишка\"', 'Милый мишка для детей всех возрастов', 'Мягкие игрушки', '59.23', 31, 'ООО \"ИгрушкиЛэнд\"', '2024-02-15'),
(2, 'Конструктор \"Строительный мир\"', 'Конструктор для творчества и развития', 'Конструкторы', '29.99', 51, 'ИП Петров', '2024-02-10'),
(3, 'Настольная игра \"Монополия\"', 'Классическая настольная игра для всей семьи', 'Настольные игры', '24.99', 36, 'ООО \"Игровой мир\"', '2024-02-08');

-- --------------------------------------------------------

--
-- Структура таблицы `клиенты`
--

CREATE TABLE `клиенты` (
  `Идентификатор` int NOT NULL,
  `ФИО` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Адрес` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Контактная_информация` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `клиенты`
--

INSERT INTO `клиенты` (`Идентификатор`, `ФИО`, `Адрес`, `Контактная_информация`) VALUES
(1, 'Иванов Иван Иванович', 'г. Москва, ул. Ленина, д. 12.', '+7 (999) 123-45-67'),
(2, 'Петрова Ольга Николаевна', 'г. Санкт-Петербург, ул. Невская, д. 20', '+7 (999) 987-65-43'),
(3, 'Сидоров Василий Петрович', 'г. Новосибирск, ул. Гагарина, д. 30', '+7 (999) 456-78-90'),
(23, '', '', '');

-- --------------------------------------------------------

--
-- Структура таблицы `заказы`
--

CREATE TABLE `заказы` (
  `Идентификатор` int NOT NULL,
  `Идентификатор_клиента` int NOT NULL,
  `Дата_заказа` date NOT NULL,
  `Статус_заказа` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `заказы`
--

INSERT INTO `заказы` (`Идентификатор`, `Идентификатор_клиента`, `Дата_заказа`, `Статус_заказа`) VALUES
(1, 1, '2024-02-15', 'В обработке!'),
(2, 2, '2024-02-14', 'Доставлено'),
(3, 3, '2024-02-13', 'Отменен');

-- --------------------------------------------------------

--
-- Структура таблицы `операции_на_складе`
--

CREATE TABLE `операции_на_складе` (
  `Идентификатор` int NOT NULL,
  `Тип_операции` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Идентификатор_игрушки` int NOT NULL,
  `Количество_изменения` int NOT NULL,
  `Дата_операции` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `операции_на_складе`
--

INSERT INTO `операции_на_складе` (`Идентификатор`, `Тип_операции`, `Идентификатор_игрушки`, `Количество_изменения`, `Дата_операции`) VALUES
(1, 'Поступление', 1, 100, '2024-02-15'),
(2, 'Отгрузка', 2, -50, '2024-02-14'),
(3, 'Инвентаризация', 3, 10, '2024-02-13');

-- --------------------------------------------------------

--
-- Структура таблицы `сотрудники`
--

CREATE TABLE `сотрудники` (
  `Идентификатор` int NOT NULL,
  `ФИО` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Должность` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Контактная_информация` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Логин` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Пароль` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `сотрудники`
--

INSERT INTO `сотрудники` (`Идентификатор`, `ФИО`, `Должность`, `Контактная_информация`, `Логин`, `Пароль`) VALUES
(1, 'Иванов Иван Иванович', 'Менеджер', '+7 (999) 123-45-67', 'ivanov', 'password1'),
(2, 'Петров Петр Петрович', 'Кладовщик', '+7 (999) 987-65-43', 'petrov', 'password2'),
(3, 'Сидорова Мария Ивановна', 'Администратор', '+7 (999) 456-78-90', 'sidorova', 'password3');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `игрушки`
--
ALTER TABLE `игрушки`
  ADD PRIMARY KEY (`Идентификатор`);

--
-- Индексы таблицы `клиенты`
--
ALTER TABLE `клиенты`
  ADD PRIMARY KEY (`Идентификатор`);

--
-- Индексы таблицы `заказы`
--
ALTER TABLE `заказы`
  ADD PRIMARY KEY (`Идентификатор`),
  ADD KEY `Идентификатор_клиента` (`Идентификатор_клиента`);

--
-- Индексы таблицы `операции_на_складе`
--
ALTER TABLE `операции_на_складе`
  ADD PRIMARY KEY (`Идентификатор`),
  ADD KEY `Идентификатор_игрушки` (`Идентификатор_игрушки`);

--
-- Индексы таблицы `сотрудники`
--
ALTER TABLE `сотрудники`
  ADD PRIMARY KEY (`Идентификатор`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `игрушки`
--
ALTER TABLE `игрушки`
  MODIFY `Идентификатор` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `клиенты`
--
ALTER TABLE `клиенты`
  MODIFY `Идентификатор` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT для таблицы `заказы`
--
ALTER TABLE `заказы`
  MODIFY `Идентификатор` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT для таблицы `операции_на_складе`
--
ALTER TABLE `операции_на_складе`
  MODIFY `Идентификатор` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `сотрудники`
--
ALTER TABLE `сотрудники`
  MODIFY `Идентификатор` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `заказы`
--
ALTER TABLE `заказы`
  ADD CONSTRAINT `заказы_ibfk_1` FOREIGN KEY (`Идентификатор_клиента`) REFERENCES `клиенты` (`Идентификатор`);

--
-- Ограничения внешнего ключа таблицы `операции_на_складе`
--
ALTER TABLE `операции_на_складе`
  ADD CONSTRAINT `операции_на_складе_ibfk_1` FOREIGN KEY (`Идентификатор_игрушки`) REFERENCES `игрушки` (`Идентификатор`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
