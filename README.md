# 🧪 Clinical Trial Management System

A full-stack web application to manage **Doctors**, **Participants**, **Trials**, and **Appointments** for clinical research teams. Built with **Angular** and **.NET**, it features intuitive scheduling, clean UI, and real-time updates.

---

## 📺 Demo

## **Clinical Trial Management System** – April 2025  
# Clinical Trial Management - Watch Video 🎥
[Clinical Trial Management - Watch Video](https://www.loom.com/share/c810364cd6d841e0b24971e3c0c84b12?sid=6772322e-2b77-49d4-8f01-965ad763763c)

<iframe src="https://www.loom.com/embed/c810364cd6d841e0b24971e3c0c84b12?sid=6772322e-2b77-49d4-8f01-965ad763763c" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen width="640" height="360"></iframe>



---

## ✨ Features

- 🧑‍⚕️ Manage **Doctors**, **Participants**, and **Trials**
- 📅 Schedule appointments with **custom date and time**
- 🔄 View, edit, and delete upcoming appointments
- 📊 Dashboard cards show total entities at a glance
- 🔍 Search and filter in appointment tables
- ✅ **Form validation**, **snackbars**, and user feedback
- 📱 **Responsive UI** with Angular Material
- ⚙️ Swagger API documentation

---

## 📸 Screenshots

### Dashboard
<img src="https://github.com/user-attachments/assets/24980b13-c119-44ca-a494-27709ab5d087" alt="Dashboard" width="800"/>
_Landing view with total stats for Doctors, Trials, Participants, Appointments_

### Add Trial Dialog
<img width="550" alt="image" src="https://github.com/user-attachments/assets/7241b0fa-2631-4846-b816-ca414ea157eb" />

_A form to create a new clinical trial, including trial name, description, start date, and end date._

### Add Doctor Dialog
<img width="550" alt="image" src="https://github.com/user-attachments/assets/dfc4c382-4528-4c8c-9f7d-3a6fd849bfae" />

_A form to register a doctor with specialization and trial assignment._

### Add Participant Dialog
<img width="550" alt="image" src="https://github.com/user-attachments/assets/1886c796-bb21-454e-913b-fda96bc62fad" />

_A form to add a participant with full medical history and trial enrollment._

### Schedule Appointment Dialog
<img width="550" alt="image" src="https://github.com/user-attachments/assets/97c3c597-6a21-46d3-8e01-861f2558b8b9" />

_A form to schedule appointments by selecting participant, doctor, time, date, and optional location._

### Appointments Table
<img width="550" alt="image" src="https://github.com/user-attachments/assets/e08ada97-5f24-4931-ab2f-faa9d4d1c240" />

_A sortable, searchable, and paginated table displaying all scheduled appointments with edit and delete functionality._

---

## ⚡ Quick Start

### Prerequisites

- Node.js + Angular CLI
- .NET SDK 8.0
- SQLite
- Docker (optional)

---

## 🛠 Installation

### 1. Clone the Repository

   ```bash
   git clone https://github.com/your-username/clinical-trial-manager.git
   cd clinical-trial-manager
   ```

### 2. Backend Setup

   ```bash
   cd backend/ClinicalTrial.Api
   dotnet build
   dotnet ef database update
   dotnet run
   ```
- **API BaseB URL:** [https://localhost:7050](https://localhost:7050)
- **Swagger Documentation:** [https://localhost:7050/swagger](https://localhost:7050/swagger)


### 3. Frontend Setup

   ```bash
   cd backend/ClinicalTrial.Api
   dotnet build
   dotnet ef database update
   dotnet run
   ```
- **Frontend URL:** [https://localhost:4200](https://localhost:4200)

## 🧰 Technology Stack

| Layer     | Stack                            |
|-----------|----------------------------------|
| Frontend  | Angular 16 + Angular Material    |
| Backend   | ASP.NET Core 8 Web API           |
| Database  | SQLite                           |
| Styling   | SCSS / Angular Material          |
| API Docs  | Swagger                          |

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create a feature branch**:

   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit changes**:
   
   ```bash
   git commit -m "Add amazing feature"
   ```
4. **Push**:
   
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**:

## 🙏 Acknowledgments

- [Angular](https://angular.io/) & [Angular Material](https://material.angular.io/)
- [ASP.NET Core](https://dotnet.microsoft.com/en-us/apps/aspnet)
- [SQLite](https://www.sqlite.org/index.html)
- open-source community

