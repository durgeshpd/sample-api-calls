✅ Sample README.md for sample-api-calls/

# Sample API Calls (Express.js)

This project contains a simple Express.js server that demonstrates basic REST API operations (CRUD) on in-memory user data.

---

## 📦 Features

- GET all users
- POST a new user
- PATCH a user by ID
- DELETE a user by ID

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm (Node Package Manager)

### Installation

```bash
  ~ git clone https://github.com/your-username/sample-api-calls.git
  ~ cd sample-api-calls
  ~ npm install
```
Running the Server
```bash
  ~ node server.js
```
Server will start at: http://localhost:3000

---

📡 API Endpoints
|Method	  |Endpoint	      |Description     |
|---------|---------------|----------------|
|GET	    |/api/users	    |Get all users   |
|POST	    |/api/users	    |Add a new user  |
|PATCH	  |/api/users/:id	|Update user name|
|DELETE   |/api/users/:id	|Delete a user   |

📝 Sample POST Body
```json
{
  "name": "John Doe"
}
```
📝 Sample PATCH Body
```json
{
  "name": "Jane Doe"
}
```
---

🧪 Notes
This is an in-memory example; data will reset when the server restarts.

Intended for learning, testing, or prototyping.
