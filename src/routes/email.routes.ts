import { Router } from 'express';

const router = Router(); // Создаем новый экземпляр маршрутизатора Expres

// Импортируем функции-обработчики из контроллера

import { getEmails, createEmail, updateEmail, deleteEmail } from '../controllers/email.controllers'; 

router.get('/emails', getEmails); // Маршрут для получения всех электронных писем
router.post('/emails', createEmail); // Маршрут для создания нового электронного письма
router.put('/emails/:id', updateEmail); // Маршрут для обновления электронного письма по его идентификатору
router.delete('/emails/:id', deleteEmail); // Маршрут для удаления электронного письма по его идентификатору

export default router; // Экспортируем настроенный маршрутизатор для использования в приложении Express