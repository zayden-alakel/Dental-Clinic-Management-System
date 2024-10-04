
# Dental Clinic Management System - Doctor Aid

## Project Overview
The **Dental Clinic Management System** is a comprehensive tool designed to streamline operations for dental clinics. It allows doctors, assistant doctors, and secretaries to efficiently manage appointments, patient records, and daily tasks. The system follows the **MVCS** (Model-View-Controller-Service) architecture and is built using **Node.js**, **TypeScript**, **Express**, and **Sequelize**.

## Features
- **Appointment Scheduling**: Manage patient appointments, assign doctors, and track availability.
- **Patient Records Management**: Store and retrieve patient details, treatment history, and records.
- **Task Coordination**: Facilitate communication between doctors, assistants, and secretaries to manage clinic tasks.
- **User Roles**: Manage roles for different clinic personnel (doctor, assistant doctor, secretary).

## Technologies Used
- **Node.js**
- **TypeScript**
- **Express** (for RESTful API)
- **Sequelize** (for database management)

## Architecture
The project follows the **MVCS (Model-View-Controller-Service)** architecture:
- **Models**: Define the database structure using Sequelize for patient records, appointments, and users.
- **Views**: API responses that the client can consume (mainly JSON).
- **Controllers**: Handle the HTTP requests and responses. Routes are defined in `app.ts`.
- **Services**: Business logic that communicates with the models.

## Project Structure
```
.
├── src
│   ├── app.ts               # Main application entry point and routes
│   ├── controllers          # Handles incoming HTTP requests
│   ├── services             # Business logic for handling data processing
│   ├── models               # Sequelize models for database interaction
│   └── config               # Database and other configuration settings
├── package.json
└── README.md
```

### `app.ts`
The `app.ts` file is the entry point of the application, responsible for defining routes and linking them to the appropriate controllers.

### Controllers
Controllers handle the incoming HTTP requests and delegate the required business logic to services. Each controller is mapped to specific endpoints (e.g., `/appointments`, `/patients`).

### Services
Services contain the main business logic, handling data processing and communication between the controller and model layers.

### Models
Models define the structure of the data being stored. Using Sequelize, it manages tables such as `Patients`, `Appointments`, and `Users`.

## Installation and Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/zayden-alakel/dental-clinic-management-system.git
   cd dental-clinic-management-system
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure the database**:
   - Update the database configuration in `src/config/config.json` to match your database settings.
   - Run the migrations to set up the database:
     ```bash
     npx sequelize db:migrate
     ```

4. **Run the application**:
   ```bash
   npm run dev
   ```

5. **API Endpoints**:
   - **Appointments**: `GET /appointments`
   - **Patients**: `GET /patients`
   - **Users**: `POST /users`

## How to Contribute
Feel free to fork the repository and submit pull requests. All contributions are welcome!

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
