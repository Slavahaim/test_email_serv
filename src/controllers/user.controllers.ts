import { Request, Response } from 'express';
import { pool } from '../database';
import bcryptjs from 'bcryptjs';
import Joi from 'joi';

export const register = async (req: Request, res: Response) => {
    try {

        const { name, email, password } = req.body;

        // Валидация данных
        const schema = Joi.object({
            name: Joi.string().min(2).max(40).required(),
            email: Joi.string().email().required()
        });

        const validation = schema.validate({ name, email });
        if (validation.error) {
            return res.status(400).json({ error: validation.error.details[0].message });
        }

        // Проверяем существует ли пользователь с таким email
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        // Если пользователь с таким email уже существует, возвращаем ошибку
        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // Шифруем пароль
        const hashedPassword = await bcryptjs.hash(password, 10); // 10 - это количество хеширований (salt rounds)

        // Вставляем пользователя в базу данных
        const response = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, hashedPassword]);

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

export const login = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body;

        // Поиск пользователя по email
        const response = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (response.rows.length === 0) {
            return res.status(401).json('Invalid email');
        }

        const user = response.rows[0];

        // Сравнение хешированных паролей
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json('Invalid password');
        }

        return res.status(200).json({
            message: 'User logined successfully',
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server error');
    }
};