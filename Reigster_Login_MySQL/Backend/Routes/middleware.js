import { authenticateToken, authorizeRole } from '../middleware.js';

export default async function Middleware(app, options) {
  
  app.get('/api/verify-token', { preHandler: authenticateToken }, async (request, reply) => {
    return reply.status(200).send({ message: 'Token is valid' });
  });

  
  app.get('/api/verify-admin', {
    preHandler: [
      authenticateToken,   
      authorizeRole('admin') 
    ]
  }, async (request, reply) => {
    return reply.status(200).send({ message: 'User is admin' });
  });
}
