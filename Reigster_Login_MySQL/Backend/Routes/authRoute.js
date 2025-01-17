import { Register , Login } from '../Controllers/authController.js';

export default async function authRoutes(app, options) {
//   Register Route
  app.post('/api/register', Register);

  // Login Route
  app.post('/api/login', Login);
}
