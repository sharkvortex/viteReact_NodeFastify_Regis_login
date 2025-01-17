import pool from '../lib/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();
// Register
export const Register = async (request, reply) => {
    const { firstname, lastname, email, password, agreeToTerms } = request.body;
    
    if (!firstname || !lastname || !email || !password || agreeToTerms === undefined) {
        return reply.code(400).send({ message: 'All fields are required, including agreeing to the terms.' });
    }

    if (agreeToTerms !== true) {
        return reply.code(400).send({ message: 'You must agree to the terms and conditions.' });
    }
    try {
        
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length > 0) {
            return reply.code(400).send({ message: 'Email is already registered.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query('INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)', [firstname, lastname, email, hashedPassword]);

        return reply.code(201).send({ message: 'Registration successful' });

    } catch (error) {
        console.error(error);
        reply.code(500).send({ error: 'Internal Server Error.' });
    }
};

// Login
export const Login = async (request, reply) => {
    const { username, password, rememberMe } = request.body;

    try {
        
        const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [username]);

        if (rows.length === 0) {
            return reply.status(401).send({ message: 'Invalid username or password' });
        }

        const user = rows[0];

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return reply.status(401).send({ message: 'Invalid username or password' });
        }

        
        const expiresIn = rememberMe ? '1d' : '30m'; 

        const token = jwt.sign(
            { username: user.email, id: user.id ,role: user.role},
            process.env.JWT_SECRET_KEY,  
            { expiresIn }
        );

        
        reply.setCookie('auth_token', token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'Lax', 
            maxAge: rememberMe ? 86400000 : 1800000,
            path: '/', 
        });

        return reply.status(200).send({ message: 'Login successful' });

    } catch (error) {
        console.error(error);
        return reply.status(500).send({ message: 'An error occurred. Please try again.' });
    }
};