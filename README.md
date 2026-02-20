# 🚀 Praveen K — Portfolio

A **Google-level, full-stack portfolio** built with **React.js (Vite)** frontend and **Spring Boot** backend.

---

## 📁 Project Structure

```
PortFolio/
├── frontend/           ← React + Vite (Port 5173)
│   ├── src/
│   │   ├── components/ ← Navbar, Hero, About, Skills, Projects, Education, Achievements, Contact, Footer
│   │   ├── data/       ← portfolioData.js (all resume data)
│   │   └── App.jsx     ← Root with page loader
│   └── index.html
│
└── backend/            ← Spring Boot (Port 8080)
    └── src/main/java/com/praveen/portfolio/
        ├── controller/ ← REST API controllers
        ├── service/    ← Business logic
        ├── model/      ← JPA entities
        ├── repository/ ← Spring Data JPA
        ├── dto/        ← Request/Response DTOs
        └── config/     ← CORS configuration
```

---

## 🖥️ Frontend (React + Vite)

### Run
```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

### Features
- ✅ Page loader with animation
- ✅ Sticky animated Navbar with mobile menu
- ✅ Hero section: typing animation, floating cards, orbit icons, stats
- ✅ About section with JSON code card
- ✅ Skills: animated progress bars + tech icon grid
- ✅ Projects: glassmorphism cards with hover effects
- ✅ Education: animated timeline + stats
- ✅ Achievements, Certifications, Soft Skills, Languages
- ✅ Contact form → calls Spring Boot API
- ✅ Footer with social links

---

## ⚙️ Backend (Spring Boot)

### Requirements
- Java 17+
- Maven 3.8+

### Run
```bash
cd backend
mvn spring-boot:run
# → http://localhost:8080
```

### API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET    | `/api/portfolio` | Get all portfolio data |
| GET    | `/api/portfolio/health` | API health check |
| POST   | `/api/contact` | Submit contact form |
| GET    | `/api/contact` | Get all messages |
| GET    | `/api/contact/unread` | Get unread messages |
| GET    | `/api/contact/stats` | Message statistics |
| PATCH  | `/api/contact/{id}/read` | Mark message as read |
| POST   | `/api/visitors` | Record page visit |
| GET    | `/api/visitors` | Get visitor count |

### H2 Database Console
Open: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:portfoliodb`
- Username: `sa`
- Password: *(empty)*

---

## 🎨 Design System

- **Theme**: Dark glassmorphism
- **Colors**: Purple `#7c3aed`, Cyan `#06b6d4`, Pink `#ec4899`
- **Fonts**: Inter, Outfit, Fira Code
- **Animations**: Framer Motion
- **Background**: Animated orbs + grid pattern

---

Built with ❤️ by **Praveen K**
