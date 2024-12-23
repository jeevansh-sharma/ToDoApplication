import express, { Application } from 'express';  // Import the required modules
import { ApolloServer } from 'apollo-server-express';  // Apollo Server
import cors from 'cors';  // CORS
import dotenv from 'dotenv';  // To use environment variables
import jwt from 'jsonwebtoken';  // JWT Token verification
import { typeDefs } from './views/graphqlSchema';  // GraphQL schema
import { resolvers } from './views/resolver';  // GraphQL resolvers
import { pool } from './db/db';  // Database connection

dotenv.config(); // Load environment variables

const JWT_SECRET = process.env.JWT_SECRET as string // Secret key for JWT

// Create an express app
const app: Application = express();  // Ensure the app is explicitly typed as `express.Application`

// Enable CORS
app.use(cors());

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const authHeader = req.headers.authorization || '';  // Extract token from authorization header
    const token = authHeader.split(' ')[1];  // Get the token (Bearer <token> format)
    console.log(token);
    let user = null;
    if (token) {
      try {
        user = jwt.verify(token, JWT_SECRET); 
        console.log("user from server",user) // Verify the token
      } catch (error) {
        console.warn('Invalid or expired token');
      }
    }

    return { user,db:pool };  // Pass the user and database connection to context
  },
});

async function startServer() {
  // Start Apollo Server
  await server.start();

  // Apply Apollo middleware to the express app
  server.applyMiddleware({ app: app as any, path: '/graphql' });  // Force the correct type

  const PORT =  4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer().catch((error) => {
  console.error('Error starting the server:', error);
});
