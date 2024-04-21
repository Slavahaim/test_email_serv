import { Router } from 'express';

const router = Router(); // Создаем новый экземпляр маршрутизатора Express

import { register, login } from '../controllers/user.controllers'; // Импортируем функции-обработчики из контроллера пользователей

router.post('/user/register', register); // Маршрут для регистрации нового пользователя
router.post('/user/login', login); // Маршрут для входа авторизации в системе

export default router; // Экспортируем настроенный маршрутизатор для использования в приложении Express