import { Request, Response } from 'express';
import { pool } from '../database';
import { QueryResult } from 'pg';
import Joi from 'joi';

export const getEmails = async (req: Request, res: Response): Promise<Response> => {
    try {
        // Попытка выполнить запрос к базе данных для получения всех электронных писем
        const response: QueryResult = await pool.query('SELECT * FROM emails ORDER BY id ASC');

        // Возвращаем успешный ответ с данными о электронных письмах в формате JSON
        return res.status(200).json(response.rows);
    } catch (error) {
        // Если произошла ошибка при выполнении запроса к базе данных,
        // логируем ошибку в консоль и возвращаем ответ с кодом 500 и сообщением об ошибке
        console.error(error);
        return res.status(500).json('Internal Server error');
    }
};

export const createEmail = async (req: Request, res: Response) => {
    try {

        // Валидация входных данных
        const emailSchema = Joi.object({
            sender: Joi.string().max(255).email().required(),
            receiver: Joi.string().max(255).email().required(),
            subject: Joi.string().max(255).allow(''), // subject может быть пустым
            content: Joi.string().required(),
        });

        const { error } = emailSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { sender, receiver, subject , content } = req.body;

        const response = await pool.query('INSERT INTO emails (sender, receiver, subject, content) VALUES ($1, $2, $3, $4)', [sender, receiver, subject , content]);

        return res.json({
            message: 'Email Added successfully',
            email: { sender, receiver, subject , content },
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server error');
    }
};

export const updateEmail = async (req: Request, res: Response) => {
    try {

        const id = parseInt(req.params.id);

        const { sender, receiver, subject , content } = req.body;

        const response = await pool.query('UPDATE emails SET sender = $1, receiver = $2, subject = $3, content = $4  WHERE id = $5', [
            sender,
            receiver,
            subject,
            content,
            id
        ]);

        return res.json('Email Updated Successfully');
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server error');
    }
};

export const deleteEmail = async (req: Request, res: Response) => {
    try{

        const id = parseInt(req.params.id);

        await pool.query('DELETE FROM emails where id = $1', [id]);

        return res.json(`Email id: ${id} deleted Successfully`);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server error');
    }
};