# **MERN To-Do Application**

## **Project Overview**
The **MERN To-Do Application** allows users to:
- Add, delete, edit, and mark tasks as completed.
- View completed and pending tasks separately.
- Log in, register, and log out seamlessly.
- Enjoy a sleek **navbar** and a well-designed **landing page**.

### **Features**
1. **Task Management**:
   - Add new tasks with ease.
   - Edit tasks directly from the task list.
   - Mark tasks as completed or pending.
   - Delete tasks when no longer needed.
   - you can delete both completed and pending tasks
   - you can only complete and edit pending tasks not completed tasks

2. **User Authentication**:
   - Register a new account.
   - Log in with existing credentials.
   - Securely log out when done.

3. **Intuitive UI**:
   - A user-friendly interface with a **responsive design**.
   - Separate views for completed and pending tasks.
  
     
4. **Protected Routes**
   -A protected route for my to add a task
   
## **Tech Stack**
- **Frontend**: React, MaterialUI
- **Backend**: PostgreSQL, GraphQL with Apollo Server, TypeScript, and MVC architecture
- **Database**: Used raw SQL queries only
- **Authentication**: JWT (JSON Web Tokens)

## **Setup Instructions**
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd frontend
   npm i
   cd..
   cd backend
   npm i
2. To run the project:
    ```bash
    cd frontend
    npm run start

    cd..
    cd backend
    npm tsc --build
    node dist/server.js

    
## **Project structure**
1. Frontend
    src/graphql containing mutation.ts storing all the resolvers
    src/components containing various components like navbar, todolist etc
    src/pages containing various login register landing pages
    src/ApolloClient.ts for client side setup of graphql
    src/app.tsx containing various routes and so related to project
2. Backend
   src/controllers 
   src/views containing graphqlSchema.ts and resolvers
   src/models containing models for user and todos
   src/db/db.ts
   middleware.ts
   server.ts
   .env file storing connection string and jwt secret key values provided in .env.example
   
    
