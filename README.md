# ✈️ Flight Booking System API

A simple Node.js-based REST API that allows users to register, search flights, and book tickets securely using JWT authentication.

## 🚀 Features

- User registration with secure password hashing
- JWT token-based authentication
- Dynamic flight search with query parameters
- Flight booking for authenticated users
- Clean RESTful architecture using MVC

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- PostgreSQL / MongoDB
- JWT for authentication
- Bcrypt for password hashing

---

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/flight-booking-api.git
   cd flight-booking-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup environment variables:**

   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   DB_URI=<your_database_uri>
   JWT_SECRET=<your_jwt_secret>
   ```

4. **Run the server:**
   ```bash
   npm start
   ```

---

## 🔐 Authentication

### Register

**POST** `/api/auth/register`

```json
{
  "username": "testuser",
  "password": "testpass123"
}
```

**Response**
```json
{
  "token": "<JWT_TOKEN>",
  "message": "User registered successfully"
}
```

---

## 🔍 Flight Search

**GET** `/api/flights/search`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Query Parameters:**
| Parameter        | Required | Description                |
|------------------|----------|----------------------------|
| origin           | Yes      | Origin city (e.g. Delhi)   |
| destination      | Yes      | Destination city (e.g. Mumbai) |
| departure_date   | Yes      | Format: YYYY-MM-DD         |
| passengers       | Yes      | Number of passengers       |

**Example:**
```
GET /api/flights/search?origin=Delhi&destination=Mumbai&departure_date=2025-06-01&passengers=1
```

---

## 📦 Book a Flight

**POST** `/api/bookings/book`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Body:**
```json
{
  "flight_id": "abc123",
  "passenger_details": [
    {
      "name": "John Doe",
      "age": 30,
      "gender": "Male"
    }
  ]
}
```

**Response:**
```json
{
  "message": "Booking confirmed",
  "booking_id": "xyz789",
  "flight_id": "abc123"
}
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Nishant Gupta**  
B.Tech CSE @ LPU  
Backend Developer (Java, Node.js, MERN Stack)

---

## 💡 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
