# Project Setup Guide

Follow these steps to set up the project on your local machine.

## Step 1: Install MySQL

1. **Download MySQL Installer**  
   - Download the MySQL Installer from [here](https://dev.mysql.com/downloads/installer/).

2. **Install MySQL**  
   - During installation, **select all components** to install.

3. **Set up Localhost Server**  
   - Set **port to 3306**.
   - Use **"root"** as the username and **"Password!@#!""** as the password.

## Step 2: Set Up MySQL Workbench

1. Open **MySQL Workbench**.

2. **Connect to Local MySQL Server**  
   - Use the credentials you just set up (username: "root", password: "Password!@#!").

3. **Create a New Schema**  
   - In the left panel, find **Schemas**.
   - Right-click and select **Create Schema**.
   - Name the schema `demobank`.

## Step 3: Clone the Project

1. **Clone the Repository**  
   - Run the following command to clone the project:
   ```bash
   git clone https://github.com/your-repository-url.git
   ```

2. **Navigate to the Project Directory**  
   - Open **CMD** or **Terminal** and navigate to the project directory:
   ```bash
   cd backend
   ```

3. **Run the Backend**  
   - Start the backend server using Spring Boot:
   ```bash
   mvnw.cmd spring-boot:run
   ```

   > **Note:** If you encounter any errors, ensure you have the necessary dependencies installed or refer to online resources or ChatGPT for troubleshooting.

## Step 4: Set Up the Frontend

1. **Open Another CMD Tab**  
   - Navigate to the **frontend** directory:
   ```bash
   cd frontend
   ```

2. **Install Frontend Dependencies**  
   - Run the following command to install all required npm packages:
   ```bash
   npm install
   ```

3. **Start the Frontend**  
   - Run the following command to start the frontend development server:
   ```bash
   npm run dev
   ```

## Step 5: Access the Application

Open your browser and visit the following link: [http://localhost:3000/](http://localhost:3000/)
