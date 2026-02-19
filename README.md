# 📋 NEXUS_TASK - Persistent Kanban Board

> **Status:** Completed.
> A high-performance, cyberpunk-themed task management dashboard with local data persistence.


## ⚡ The Tech Stack
| Tech | Role |
| :--- | :--- |
| **React 18** | UI Architecture & Hooks |
| **TypeScript** | Static Typing & Interfaces (`Task`, `Status`) |
| **Tailwind CSS** | Styling & Cyberpunk UI Design |
| **LocalStorage** | Native Browser Database for Data Persistence |
| **Lucide React** | Modern Iconography |

## 🚀 Key Features
* **Full CRUD Functionality:** Users can Create new tasks, Read them across columns, Update their status, and Delete them.
* **Data Persistence:** Utilizes React's `useEffect` to sync the application state with the browser's `localStorage`. Tasks survive page refreshes and browser restarts.
* **Strict Typing:** Built with TypeScript to ensure state integrity and prevent runtime errors during task manipulation.
* **Dynamic UI:** Smooth transitions, conditional rendering for empty states, and interactive hover effects.

## 🛠️ How to Run Locally
1.  Clone the repo:
    ```bash
    git clone [https://github.com/jean-009/nexus-task.git](https://github.com/jean-009/nexus-task.git)
    cd nexus-task
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the dashboard:
    ```bash
    npm run dev
    ```

## 🧠 Lessons Learned
* **State Management:** Handled complex state updates safely by mapping and filtering arrays in React.
* **TypeScript Integration:** Solved Vite compilation edge cases (e.g., using `import type`) and created robust data contracts.
* **Component Architecture:** Abstracted repeating logic into a reusable `<Column />` component passing down props and functions.

---
*Developed by Henrique Jean - Front-end Developer.*