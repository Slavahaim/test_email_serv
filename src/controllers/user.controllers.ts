import { Request, Response } from 'express';
import { pool } from '../database';
import bcryptjs from 'bcryptjs';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import secret from './config';

// Определение интерфейса для пользователя
interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

// Определение интерфейса для тела запроса регистрации
interface RegisterRequestBody {
    name: string;
    email: string;
    password: string;
}

// Определение интерфейса для тела запроса логина
interface LoginRequestBody {
    email: string;
    password: string;
}

// Функция для генерации JWT токена
const generateAccessToken = (id: number): string => {
    return jwt.sign({ id }, secret, { expiresIn: '24h' });
};

// Типизированная функция регистрации
export const register = async (req: Request<{}, {}, RegisterRequestBody>, res: Response): Promise<Response> => {
    try {

        const { name, email, password } = req.body;

        // Валидация данных
        const schema = Joi.object({
            name: Joi.string().min(2).max(40).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required()
        });

        const { error } = schema.validate({ name, email, password });
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        // Проверяем существует ли пользователь с таким email
        const userExists = await pool.query<User>('SELECT * FROM users WHERE email = $1', [email]);

        // Если пользователь с таким email уже существует, возвращаем ошибку
        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // Шифруем пароль
        const hashedPassword = await bcryptjs.hash(password, 10); // 10 - это количество хеширований (salt rounds)

        // Вставляем пользователя в базу данных
        const response = await pool.query<User>('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email', [name, email, hashedPassword]);

        // Возвращаем успешный ответ
        return res.status(200).json({
            message: 'User created successfully',
            user: { name, email }
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server error');
    }
};

export const login = async (req: Request<{}, {}, LoginRequestBody>, res: Response): Promise<Response> => {
    try {

        const { email, password } = req.body;

        // Поиск пользователя по email
        const response = await pool.query<User>('SELECT * FROM users WHERE email = $1', [email]);

        if (response.rows.length === 0) {
            return res.status(401).json('Invalid email');
        }

        const user = response.rows[0];

        // Сравнение хешированных паролей
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json('Invalid password');
        }

        // Генерация токена
        const token = generateAccessToken(user.id);

        return res.status(200).json({
            message: 'User logined successfully',
            token,
            user: { id: user.id, name: user.name, email: user.email }
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server error');
    }
};