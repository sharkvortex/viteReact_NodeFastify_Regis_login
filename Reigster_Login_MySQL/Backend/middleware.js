import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const authenticateToken = (request, reply, next) => {
    const token = request.cookies.auth_token; 

    if (!token) {
        return reply.status(401).send({ message: 'No token provided' });  
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        request.user = decoded; 
        next(); 
    } catch (err) {
        return reply.status(403).send({ message: 'Invalid or expired token' });  
    }
};

const authorizeRole = (requiredRole) => {
    return (request, reply, next) => {
        if (request.user.role !== requiredRole) {
            return reply.status(403).send({ message: 'Unauthorized' });  
        }
        next();
    };
};

export { authenticateToken, authorizeRole };
