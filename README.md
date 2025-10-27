# 🧩 Dynamic Form Builder

A full-stack form builder application with drag-and-drop functionality, built with React, Laravel, and Docker.

## 🚀 Live Demo

**Live URL:** [https://formbuilder-production.up.railway.app](https://formbuilder-production.up.railway.app)

## 📋 Features

- **User Authentication**: Register, login, and secure session management
- **Drag & Drop Form Builder**: Create dynamic forms with sections, groups, and fields
- **Field Types**: Text, email, number, textarea, select, radio, checkbox
- **Undo/Redo**: Full history management for form editing
- **Real-time Preview**: See your form as you build it
- **Form Management**: Save, load, edit, and delete forms
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend

- **React 19** with TypeScript
- **Redux Toolkit** for state management
- **Ant Design** for UI components
- **@dnd-kit** for drag-and-drop functionality
- **React Router** for navigation
- **Vite** for build tooling

### Backend

- **Laravel 12** with PHP 8.2
- **Laravel Sanctum** for API authentication
- **MySQL 8** for database
- **RESTful API** with JSON responses

### DevOps

- **Docker** & **Docker Compose** for containerization
- **Nginx** as reverse proxy
- **GitHub Actions** for CI/CD
- **Railway** for deployment

## 🏗️ Project Structure

```
├── backend/                 # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/Api/
│   │   └── Models/
│   ├── database/migrations/
│   └── routes/api.php
├── client/                  # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   └── utils/
│   └── public/
├── nginx/                   # Nginx configuration
├── .github/workflows/       # CI/CD pipeline
└── docker-compose.yml       # Docker services
```

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose
- Node.js ≥ 20
- PHP ≥ 8.2 (for local development)

### Local Development

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd fullstack-devops-assessment
   ```

2. **Start the application**

   ```bash
   docker compose up -d --build
   ```

3. **Access the application**

   - Frontend: http://localhost:3000
   - Backend API: http://localhost:9000
   - Full App (via Nginx): http://localhost

4. **Run migrations** (if needed)
   ```bash
   docker compose exec backend php artisan migrate
   ```

### Manual Setup (without Docker)

#### Backend Setup

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

#### Frontend Setup

```bash
cd client
npm install
npm run dev
```

## 📚 API Endpoints

### Authentication

- `POST /api/register` - Register new user
- `POST /api/login` - Login user
- `POST /api/logout` - Logout user
- `GET /api/user` - Get authenticated user

### Forms

- `GET /api/forms` - List user's forms
- `POST /api/forms` - Create new form
- `GET /api/forms/{id}` - Get form by ID
- `PUT /api/forms/{id}` - Update form
- `DELETE /api/forms/{id}` - Delete form

### Response Format

All API responses follow this structure:

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

## 🐳 Docker Services

- **frontend**: React development server (port 3000)
- **backend**: Laravel API server (port 9000)
- **mysql**: MySQL 8 database (port 3306)
- **nginx**: Reverse proxy (port 80)

## 🔧 Environment Variables

### Backend (.env)

```env
APP_NAME=FormBuilder
APP_ENV=local
APP_DEBUG=true
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=app
DB_USERNAME=root
DB_PASSWORD=secret
SANCTUM_STATEFUL_DOMAINS=localhost,localhost:3000
```

### Frontend (.env.local)

```env
VITE_API_BASE=http://localhost:9000/api
```

## 🧪 Testing

### Backend Tests

```bash
cd backend
php artisan test
```

### Frontend Tests

```bash
cd client
npm run test
```

### Docker Tests

```bash
docker compose exec backend php artisan test
docker compose exec frontend npm run test
```

## 🚀 Deployment

### Railway Deployment

1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

1. Build Docker images
2. Push to container registry
3. Deploy to your preferred platform

## 📝 Development Commands

```bash
# Start all services
docker compose up -d

# View logs
docker compose logs -f

# Stop services
docker compose down

# Rebuild specific service
docker compose up --build backend

# Run migrations
docker compose exec backend php artisan migrate

# Install new packages
docker compose exec backend composer require package-name
docker compose exec frontend npm install package-name
```

## 🐛 Known Limitations

- File uploads are stored locally (no S3 integration)
- Undo/redo is limited to frontend state
- Advanced form validation not implemented
- No form submission handling
- Limited field types (text, email, number, textarea, select, radio, checkbox)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name** - Full-Stack & DevOps Engineer Assessment

## 🎯 Assessment Completion

✅ **Backend**: Laravel 10 + Sanctum authentication  
✅ **Frontend**: React + Redux Toolkit + @dnd-kit  
✅ **Database**: MySQL with proper relationships  
✅ **Docker**: Multi-container setup with Nginx  
✅ **CI/CD**: GitHub Actions pipeline  
✅ **Deployment**: Railway with live URL  
✅ **Documentation**: Comprehensive README and setup guide

**Time Spent**: ~8 hours  
**Technical Choices**: Modern stack with TypeScript, Redux Toolkit for state management, Ant Design for consistent UI, @dnd-kit for smooth drag-and-drop experience.

---

_Built with ❤️ for the Full-Stack & DevOps Engineer Assessment_
