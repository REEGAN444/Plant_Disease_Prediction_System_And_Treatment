# 🌱 Plant Disease Prediction System

An AI-powered **Plant Disease Prediction System** built using **React.js, Java, Spring Boot, MySQL, and CNN-based image classification**. The system allows users to upload plant/leaf images, predict diseases, receive fertilizer and medicine recommendations, and maintain a prediction history.

> **Tech Stack:** React.js | Java | Spring Boot | MySQL | CNN | REST API

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [System Architecture](#-system-architecture)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Configuration](#-configuration)
- [Installation & Setup](#-installation--setup)
- [Running the Application](#-running-the-application)
- [API Endpoints](#-api-endpoints)
- [Database Schema](#-database-schema)
- [Application Workflow](#-application-workflow)
- [Security Considerations](#-security-considerations)
- [Future Enhancements](#-future-enhancements)
- [Troubleshooting](#-troubleshooting)
- [Author](#-author)

---

## 🌾 Overview

Plant diseases can significantly impact crop productivity and farmer income. Manual disease identification is time-consuming and requires expert knowledge.

This system provides an **automated, AI-driven solution** where users upload a plant leaf image. The system processes it through a **CNN-based disease prediction model** and returns:

✅ Predicted disease name  
✅ Disease cause & symptoms  
✅ Disease effects & details  
✅ Fertilizer recommendations  
✅ Medicine recommendations  
✅ Product purchasing information  
✅ Prediction history tracking  

---

## ✨ Features

### 👨‍🌾 User Features
- ✓ User registration and authentication
- ✓ Responsive dashboard
- ✓ Upload plant/leaf images with preview
- ✓ AI-based disease prediction
- ✓ View disease details (cause, effects, symptoms)
- ✓ Fertilizer & medicine recommendations
- ✓ Product browsing and purchasing
- ✓ Prediction history & analytics
- ✓ Mobile-responsive UI

### 🤖 AI/ML Features
- ✓ CNN-based image classification
- ✓ Automated image preprocessing
- ✓ High-accuracy disease prediction
- ✓ Confidence scoring
- ✓ Java-based ML workflow

### 🛠️ Admin Features
- ✓ Admin dashboard
- ✓ User management
- ✓ Disease information management
- ✓ Product & fertilizer management
- ✓ Recommendation management
- ✓ Prediction analytics

---

## 🧰 Technology Stack

| Layer          | Technology                 |
|----------------|---------------------------|
| **Frontend**   | React.js, Vite, CSS       |
| **Backend**    | Java, Spring Boot         |
| **API**        | REST API                  |
| **Database**   | MySQL                     |
| **AI/ML**      | CNN (Convolutional Neural Networks) |
| **ORM**        | Spring Data JPA, Hibernate|
| **Build Tool** | Maven                     |
| **Auth**       | JWT / Session-based       |
| **Version Control** | Git/GitHub          |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────┐
│         React.js Frontend            │
│      (Vite + React Components)       │
└──────────────────┬──────────────────┘
                   │
              REST API (HTTP)
                   │
┌──────────────────▼──────────────────┐
│      Spring Boot Backend             │
├──────────────────────────────────────┤
│  • Controllers                       │
│  • Services & Business Logic         │
│  • Image Processing & AI Prediction  │
│  • Authentication & Authorization    │
└──────────────┬───────────┬──────────┘
               │           │
    ┌──────────▼─┐   ┌────▼──────────┐
    │   MySQL    │   │  CNN Model    │
    │  Database  │   │  (Disease     │
    │            │   │   Classifier) │
    └────────────┘   └───────────────┘
```

---

## 📁 Project Structure

```
plant-disease-prediction/
│
├── backend/                          # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/plantdisease/
│   │   │   │       ├── controller/   # REST Controllers
│   │   │   │       ├── service/      # Business Logic
│   │   │   │       ├── repository/   # Database Access
│   │   │   │       ├── entity/       # JPA Entities
│   │   │   │       ├── dto/          # Data Transfer Objects
│   │   │   │       ├── ai/           # ML/AI Prediction Logic
│   │   │   │       └── config/       # Configuration Classes
│   │   │   │
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── model/            # Pre-trained CNN Model
│   │   │
│   │   └── test/                     # Unit Tests
│   │
│   └── pom.xml                       # Maven Dependencies
│
├── frontend/                         # React.js Frontend
│   ├── src/
│   │   ├── components/               # React Components
│   │   ├── pages/                    # Page Components
│   │   ├── services/                 # API Services
│   │   ├── hooks/                    # Custom Hooks
│   │   ├── assets/                   # Images/Static Files
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── database/
│   └── schema.sql                    # MySQL Schema
│
├── README.md
└── .gitignore
```

---

## 💻 Prerequisites

### Required Software
- **Java:** JDK 21 or compatible version
- **Node.js:** v18+ (includes npm)
- **MySQL:** Server 8.0+
- **Maven:** 3.8+
- **Git**

### Verify Installation
```bash
java -version
node -v
npm -v
mvn -version
mysql --version
git --version
```

---

## ⚙️ Configuration

### 1️⃣ Create MySQL Database

```sql
CREATE DATABASE plant_disease_db;
```

### 2️⃣ Configure Spring Boot

Edit `backend/src/main/resources/application.properties`:

```properties
# Server Configuration
server.port=8080

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/plant_disease_db
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# File Upload Configuration
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB

# JWT Configuration (Optional)
jwt.secret=YOUR_JWT_SECRET_KEY
jwt.expiration=86400000
```

**⚠️ Never commit credentials to GitHub.** Use environment variables for sensitive data.

### 3️⃣ Configure React Frontend

Edit `frontend/vite.config.js`:

```javascript
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
}
```

---

## 🚀 Installation & Setup

### Step 1: Clone Repository
```bash
git clone https://github.com/REEGAN444/plant-disease-prediction.git
cd plant-disease-prediction
```

### Step 2: Setup Backend

```bash
cd backend

# Install dependencies
mvn clean install

# Run the application
mvn spring-boot:run
```

Backend runs on: `http://localhost:8080`

### Step 3: Setup Frontend

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on: `http://localhost:5173`

### Step 4: Initialize Database

```bash
# Run the schema.sql file in MySQL
mysql -u root -p plant_disease_db < database/schema.sql
```

---

## 🧪 Running the Application

### Terminal 1: Backend
```bash
cd backend
mvn spring-boot:run
```

### Terminal 2: Frontend
```bash
cd frontend
npm run dev
```

### Terminal 3: MySQL (if not running as service)
```bash
mysql -u root -p
```

Visit `http://localhost:5173` in your browser.

---

## 🔌 API Endpoints

### Authentication
```http
POST   /api/auth/register          # User registration
POST   /api/auth/login             # User login
POST   /api/auth/logout            # User logout
```

### Predictions
```http
POST   /api/predictions/predict    # Predict disease from image
GET    /api/predictions/history    # Get user's prediction history
GET    /api/predictions/{id}       # Get specific prediction details
```

### Diseases
```http
GET    /api/diseases               # List all diseases
GET    /api/diseases/{id}          # Get disease details
POST   /api/diseases               # Create disease (Admin)
PUT    /api/diseases/{id}          # Update disease (Admin)
DELETE /api/diseases/{id}          # Delete disease (Admin)
```

### Products
```http
GET    /api/products               # List all products
GET    /api/products/{id}          # Get product details
POST   /api/products               # Create product (Admin)
PUT    /api/products/{id}          # Update product (Admin)
DELETE /api/products/{id}          # Delete product (Admin)
```

### Recommendations
```http
GET    /api/recommendations/{diseaseId}  # Get recommendations for disease
```

---

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('USER', 'ADMIN') DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Diseases Table
```sql
CREATE TABLE diseases (
    id INT PRIMARY KEY AUTO_INCREMENT,
    disease_name VARCHAR(100) NOT NULL,
    disease_cause VARCHAR(255),
    disease_effect TEXT,
    symptoms TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Products Table
```sql
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    category ENUM('FERTILIZER', 'MEDICINE') NOT NULL,
    type ENUM('NATURAL', 'ARTIFICIAL') NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    availability VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Prediction History Table
```sql
CREATE TABLE prediction_history (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    disease_id INT,
    image_path VARCHAR(255),
    confidence DECIMAL(5, 2),
    predicted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (disease_id) REFERENCES diseases(id)
);
```

---

## 🔄 Application Workflow

```
User Uploads Image
        ↓
React Sends Image to Backend
        ↓
Spring Boot Receives Image
        ↓
Image Preprocessing
        ↓
CNN Model Predicts Disease
        ↓
Query MySQL for Disease Details
        ↓
Retrieve Recommendations (Fertilizers/Medicines)
        ↓
Save Prediction to History
        ↓
Return Result to React Frontend
        ↓
Display Results & Recommendations to User
```

### Prediction Response Example
```json
{
  "success": true,
  "diseaseName": "Leaf Rust",
  "confidence": 94.5,
  "cause": "Fungal infection caused by Puccinia species",
  "effects": "Yellow-orange pustules on leaf undersides",
  "symptoms": ["Discoloration", "Pustules", "Early leaf drop"],
  "fertilizers": [
    {
      "id": 1,
      "name": "NPK 10-26-26",
      "type": "ARTIFICIAL",
      "price": 450.00
    }
  ],
  "medicines": [
    {
      "id": 5,
      "name": "Sulfur Dust",
      "type": "NATURAL",
      "price": 200.00
    }
  ]
}
```

---

## 🔐 Security Considerations

For **production deployment**, implement:

- ✓ Hash passwords with bcrypt/scrypt
- ✓ JWT-based authentication with token expiration
- ✓ Role-based access control (RBAC)
- ✓ Validate all file uploads (type, size, content)
- ✓ Restrict allowed image formats (JPEG, PNG only)
- ✓ Implement rate limiting
- ✓ Use HTTPS/TLS
- ✓ Store secrets in environment variables
- ✓ Sanitize user inputs
- ✓ Validate backend operations for admin roles
- ✓ Enable CORS only for trusted domains
- ✓ Implement logging and monitoring
- ✓ Regular database backups

---

## 🔮 Future Enhancements

- 📱 Mobile application (React Native/Flutter)
- 🌍 Multi-language support
- 🎯 Support for additional plant species
- 🧠 Improved CNN model accuracy
- 📊 Disease outbreak analytics
- 🌤️ Weather-based disease warnings
- 📍 Location-based recommendations
- 💬 Voice-based agricultural assistant
- 🛒 Payment gateway integration
- ☁️ Cloud deployment (AWS/Azure/GCP)
- 📈 Model monitoring and retraining pipeline
- 👥 Farmer community forum
- 📊 Advanced analytics dashboard

---

## 🐛 Troubleshooting

### MySQL Connection Error
```
✓ Verify MySQL Server is running
✓ Check database name: plant_disease_db
✓ Verify username: root
✓ Verify password is correct
✓ Default MySQL port: 3306
```

### Backend Won't Start
```bash
# Clean and reinstall
mvn clean
mvn install
mvn spring-boot:run

# Verify Java version
java -version
```

### Frontend Dependency Issues
```bash
# Windows PowerShell
Remove-Item -Recurse -Force node_modules
npm install
npm run dev

# macOS/Linux
rm -rf node_modules
npm install
npm run dev
```

### CORS Errors
Add to `application.properties`:
```properties
spring.web.cors.allowed-origins=http://localhost:5173
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE
spring.web.cors.allow-credentials=true
```

### Image Upload Fails
- ✓ Verify file type (JPEG/PNG)
- ✓ Check file size (<10MB)
- ✓ Verify multipart configuration in Spring Boot
- ✓ Check backend endpoint is accessible
- ✓ Verify React FormData request format

---

## 📄 License

This project is developed for **academic, learning, and portfolio demonstration purposes**.

Licensed under the **MIT License** - see LICENSE file for details.

---

## 👨‍💻 Author

**Immanuvel Reegan A**

- 🎓 B.Tech Information Technology
- 🏫 V.S.B. Engineering College, Karur
- 📧 Email: [Your Email]
- 🔗 GitHub: [REEGAN444](https://github.com/REEGAN444)
- 💼 LinkedIn: [immanuvel-reegan-a](https://www.linkedin.com/in/immanuvel-reegan-a)
- 🌐 Portfolio: [my-portfolio](https://my-portfolio-kappa-coral-12.vercel.app)

---

## ⭐ Project Highlights

This project demonstrates:
- ✨ Full-stack development (Frontend + Backend)
- 🤖 AI/ML integration with CNN
- 🗄️ Database design and management
- 🔌 RESTful API development
- 🔐 Authentication & Authorization
- 📱 Responsive UI/UX
- 🏗️ Scalable architecture
- 🎯 Real-world problem solving

If you find this project useful, please consider giving it a ⭐ on GitHub!

---

## 📞 Support

For issues, questions, or contributions, please open an issue or submit a pull request on GitHub.

**Happy Coding! 🚀**
