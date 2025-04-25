# 🧪 Clinical Trial Management System

A full-stack web application to manage **Doctors**, **Participants**, **Trials**, and **Appointments** for clinical research teams. Built with **Angular** and **.NET**, it features intuitive scheduling, clean UI, and real-time updates.

---

## 📺 Demo

**Clinical Trial Management System** – April 2025  
[🎥 Watch Demo Video](#) *(Add video link here)*

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

_Landing view with total stats for Doctors, Trials, Participants, Appointments_

### Appointment Dialog
_Fully validated form with time selection and trial linking_

### Appointments Table
_Sortable and filterable data table with edit/delete actions and pagination_

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

### 3. Frontend Setup

   ```bash
   cd backend/ClinicalTrial.Api
   dotnet build
   dotnet ef database update
   dotnet run
   ```

## 🧰 Technology Stack

| Layer     | Stack                            |
|-----------|----------------------------------|
| Frontend  | Angular 16 + Angular Material    |
| Backend   | ASP.NET Core 8 Web API           |
| Database  | SQLite                           |
| Styling   | SCSS / Angular Material          |
| API Docs  | Swagger                          |

---

## 🔐 Role-Based Access

- **Admin** – Full access to manage doctors, participants, trials, and appointments  
- **Patient (coming soon)** – View own appointments

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

