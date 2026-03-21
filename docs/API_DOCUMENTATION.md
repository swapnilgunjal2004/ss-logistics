# API Documentation

## 1. Bookings
### Endpoint: `/api/bookings`
- **Method:** POST
- **Description:** Create a new booking.
- **Request Body:**  
  ```json
  {
    "truck_id": "string",
    "user_id": "string",
    "pickup_location": "string",
    "dropoff_location": "string",
    "date_time": "YYYY-MM-DD HH:MM:SS"
  }
  ```
- **Response:**  
  - **201 Created**
    - ```json
      {
        "message": "Booking created successfully.",
        "booking_id": "string"
      }```  

## 2. Trucks
### Endpoint: `/api/trucks`
- **Method:** GET
- **Description:** Retrieve all available trucks.
- **Response:**  
  - **200 OK**
    - ```json
      [
        {
          "truck_id": "string",
          "capacity": "number",
          "location": "string"
        }
      ]
      ```

## 3. Tracking
### Endpoint: `/api/tracking/{booking_id}`
- **Method:** GET
- **Description:** Track the status of a booking.
- **Response:**  
  - **200 OK**
    - ```json
      {
        "status": "string",
        "current_location": "string"
      }
      ```

## 4. Authentication
### Endpoint: `/api/auth`
- **Method:** POST
- **Description:** Authenticate a user.
- **Request Body:**  
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:**  
  - **200 OK**
    - ```json
      {
        "token": "string"
      }
      ```

---

**Date Created:** 2026-03-21 22:56:32 UTC

**Author:** swapnilgunjal2004