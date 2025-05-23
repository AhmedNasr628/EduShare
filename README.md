
# 🎓 EduShare - Graduation Project

EduShare is a collaborative platform for college students to upload and share lecture summaries, videos, and notes related to their university courses.

---

## 📁 Repository Structure

```
EduShare/
├── src/
│   ├── edushare-frontend/     # React.js frontend
│   └── laravel-api-app/       # Laravel 11 API backend
├── README.md                  # Project overview and setup instructions
```

---

## ⚙️ Technologies Used

### Frontend (React):
- React + Vite
- React Router DOM
- Lottie for animation
- Formspree (for Contact form)

### Backend (Laravel):
- Laravel 11
- Sanctum for authentication
- MySQL

---

## 🖥️ Setup Instructions (Windows/macOS)

### ✅ Prerequisites
- **Node.js** ≥ 16
- **Composer**
- **PHP** ≥ 8.1
- **MySQL**
- **Git**

---

### 🚀 1. Clone the repository

```bash
git clone https://github.com/AhmedNasr628/EduShare.git
cd EduShare/src
```

---

### 2. Frontend Setup (React)

```bash
cd edushare-frontend
npm install
npm run dev
```

Then open in browser:  
 `http://localhost:5173`

---

### 3. Backend Setup (Laravel)

```bash
cd laravel-api-app
composer install
cp .env.example .env
php artisan key:generate
```

🔁 Edit your `.env` file to match your database:
```
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=
```

```bash
php artisan migrate
php artisan storage:link
php artisan serve
```

Then open API at:  
`http://127.0.0.1:8000`

---

## API Proxy (in vite.config.js)

```js
server: {
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:8000',
      changeOrigin: true
    }
  }
}
```

---

## Features

- User authentication (Student/Doctor roles)
- Upload notes (PDF, PPT, MP4)
- Filter by course and file type
- Animated, responsive UI

---

## ❗ Troubleshooting

- **Can't connect to MySQL**: Make sure MySQL service is running (via XAMPP).
- **403 Forbidden on files**: Run `php artisan storage:link` and ensure `storage/app/public` has correct permissions.
- **Proxy error in React**: Laravel backend must be running on `localhost:8000`.

---

## Team

- Ahmed [Full Stack Developer]
- Gehad Rabie [Frontend Developer]
- Ganna Ahmed [Backend Developer]

