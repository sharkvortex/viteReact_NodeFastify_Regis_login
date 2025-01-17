import fastify from "fastify";
import cors from "@fastify/cors";
const app = fastify({ logger: true });

// dotenv
import dotenv from 'dotenv'
dotenv.config();
// Cookies
import fastifyCookie from 'fastify-cookie';
app.register(fastifyCookie)

// Database
import { getconnect } from "./lib/db.js";  
const connection = await getconnect();  




app.register(cors, {
    origin: "http://localhost:5173",  
});


app.get('/', async (request, reply) => {
    app.log.info("Frontend has requested data!"); 
    return { message: 'Hello, Fastify!', log: 'This is a log from the backend.' };
});

// Middleware
import Middleware from "./Routes/middleware.js";
app.register(Middleware)

// AuthRoute
import authRoutes from './Routes/authRoute.js';
app.register(authRoutes);




const startServer = async () => {
  try {
    await app.listen({ port: 8080 });  
    console.log('Server is running on http://localhost:8080');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();
