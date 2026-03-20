# Manakamana Printing Backend API Documentation

This document provides a comprehensive list of API endpoints, request formats, and response examples for the Manakamana Printing e-commerce platform.

**Base URL**: `/api/v1`  
**Authentication**: Bearer Token required for protected routes.  
**Content-Type**: `application/json`

---

## 🔐 Authentication

### Admin Login
Logs in an administrator and returns a JWT token.
- **Endpoint**: `POST /admin/auth/login`
- **Request Body**:
  ```json
  {
    "email": "admin@example.com",
    "password": "plain_text_password"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "message": "Admin login successful",
    "token": "JWT_TOKEN",
    "admin": {
      "id": "uuid",
      "name": "Admin Name",
      "email": "admin@example.com",
      "role": "ADMIN"
    }
  }
  ```

### Client Login
Logs in a client and returns a JWT token.
- **Endpoint**: `POST /auth/login`
- **Request Body**:
  ```json
  {
    "phone_number": "9812345678",
    "password": "plain_text_password"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "message": "Login successful",
    "token": "JWT_TOKEN",
    "client": {
      "id": "uuid",
      "client_code": "MP-XXXXXXXX",
      "phone": "9812345678",
      "business_name": "Business Name",
      "role": "CLIENT"
    }
  }
  ```

### Logout
- **Endpoint**: `POST /auth/logout`
- **Response (200 OK)**: `{"message": "Logout successful"}`

### Get Current User (Me)
Fetches details of the currently authenticated user (Admin or Client).
- **Endpoint**: `GET /auth/me` (for clients) or `GET /admin/auth/me` (for admins)
- **Header**: `Authorization: Bearer <TOKEN>`
- **Response (200 OK)**:
  ```json
  {
    "message": "Current user fetched",
    "user": { ... }
  }
  ```

---

## 📝 Public Registration

### Submit Registration Request
Allows new businesses to submit a request to join the platform.
- **Endpoint**: `POST /register-request`
- **Request Body**:
  ```json
  {
    "business_name": "ABC Traders",
    "owner_name": "Ram Sharma",
    "email": "abc@example.com",
    "phone_number": "9812345678",
    "business_address": "Kathmandu, Nepal",
    "notes": "Bulk order inquiry"
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "message": "Registration request submitted successfully",
    "data": { ... }
  }
  ```

---

## 👤 Client Profile

### Get Profile
- **Endpoint**: `GET /user/profile`
- **Header**: `Authorization: Bearer <CLIENT_TOKEN>`
- **Response (200 OK)**: `{"message": "Profile fetched", "data": { ... }}`

### Update Profile
- **Endpoint**: `PATCH /user/profile`
- **Header**: `Authorization: Bearer <CLIENT_TOKEN>`
- **Request Body**:
  ```json
  {
    "business_name": "Updated Name",
    "owner_name": "Updated Owner",
    "email": "updated@example.com",
    "address": "Updated Address"
  }
  ```
- **Response (200 OK)**: `{"message": "Profile updated successfully", "data": { ... }}`

---

## 🛠 Admin Management

### List Registration Requests
- **Endpoint**: `GET /admin/registration-requests`
- **Query Parameters**:
  - `status`: Filter by status (`PENDING`, `APPROVED`, `REJECTED`).
  - `search`: Search by business name or phone number.
- **Response (200 OK)**: `{"message": "...", "data": [ ... ]}`

### Get Request Details
- **Endpoint**: `GET /admin/registration-requests/:request_id`

### Approve Registration Request
Approves a request, creates a Client account, and generates temporary credentials.
- **Endpoint**: `POST /admin/registration-requests/:request_id/approve`
- **Response (200 OK)**:
  ```json
  {
    "message": "Client approved and created successfully",
    "credentials": {
      "phone_number": "...",
      "password": "..."
    },
    "client": { ... }
  }
  ```

### Reject Registration Request
- **Endpoint**: `PATCH /admin/registration-requests/:request_id/reject`
- **Request Body**: `{"reason": "Insufficient documentation"}`

### Mark Credentials Sent
Updates the request to indicate that the credentials have been communicated to the client.
- **Endpoint**: `PATCH /admin/registration-requests/:request_id/credentials-sent`

### List Clients
- **Endpoint**: `GET /admin/clients`

### Get Client Details
- **Endpoint**: `GET /admin/clients/:id`

---

## 🏥 Health Check
- **Endpoint**: `GET /`
- **Response**: `{"message": "API is running"}`

---

## 🎨 Templates (Client)

### Get Template Categories
- **Endpoint**: `GET /templates/categories`
- **Header**: `Authorization: Bearer <CLIENT_TOKEN>`
- **Response**: `{"success": true, "data": [{"id": "...", "name": "...", "slug": "..."}]}`

### Get Templates List
- **Endpoint**: `GET /templates`
- **Query Params**: `category` (slug), `page`, `limit`, `search`
- **Header**: `Authorization: Bearer <CLIENT_TOKEN>`

### Get Single Template Detail
- **Endpoint**: `GET /templates/:templateId`
- **Header**: `Authorization: Bearer <CLIENT_TOKEN>`

---

## 📥 Design Submissions (Client)

### Submit Design
- **Endpoint**: `POST /design-submissions`
- **Header**: `Authorization: Bearer <CLIENT_TOKEN>`
- **Content-Type**: `multipart/form-data`
- **Request Body (Form Data)**:
  - `file`: (File, required) The design file (PDF, PNG, JPG, JPEG)
  - `templateId`: (String, optional) ID of the template used
  - `title`: (String, optional) Title for the design
  - `notes`: (String, optional) Any additional notes

### Get My Submissions List
- **Endpoint**: `GET /design-submissions/my`
- **Query Params**: `status` (PENDING_REVIEW, APPROVED, REJECTED), `page`, `limit`
- **Header**: `Authorization: Bearer <CLIENT_TOKEN>`

### Get My Single Submission Detail
- **Endpoint**: `GET /design-submissions/my/:submissionId`
- **Header**: `Authorization: Bearer <CLIENT_TOKEN>`

### Get My Approved Design by Design ID
- **Endpoint**: `GET /my-designs/:designId`
- **Header**: `Authorization: Bearer <CLIENT_TOKEN>`

### Verify Design ID
- **Endpoint**: `POST /designs/verify`
- **Header**: `Authorization: Bearer <CLIENT_TOKEN>`
- **Request Body**:
  ```json
  {
    "designId": "DSN-2026-000001"
  }
  ```

---

## 👩‍💻 Design Submissions (Admin)

### Get Design Submissions List
- **Endpoint**: `GET /admin/design-submissions`
- **Query Params**: `status`, `clientId`, `page`, `limit`, `sort`
- **Header**: `Authorization: Bearer <ADMIN_TOKEN>`

### Get Single Submission Detail
- **Endpoint**: `GET /admin/design-submissions/:submissionId`
- **Header**: `Authorization: Bearer <ADMIN_TOKEN>`

### Approve a Design Submission
- **Endpoint**: `POST /admin/design-submissions/:submissionId/approve`
- **Header**: `Authorization: Bearer <ADMIN_TOKEN>`
- **Request Body**:
  ```json
  {
    "previewUrl": "https://example.com/preview.jpg",
    "note": "Approved for printing"
  }
  ```

### Reject a Design Submission
- **Endpoint**: `PATCH /admin/design-submissions/:submissionId/reject`
- **Header**: `Authorization: Bearer <ADMIN_TOKEN>`
- **Request Body**:
  ```json
  {
    "feedbackMessage": "Margin too small, please keep text inside the safe area."
  }
  ```

---

## 🏛️ Approved Designs (Admin)

### Get Approved Designs List
- **Endpoint**: `GET /admin/designs`
- **Query Params**: `status` (ACTIVE, ARCHIVED), `clientId`, `search`, `page`, `limit`
- **Header**: `Authorization: Bearer <ADMIN_TOKEN>`

### Get Approved Design Detail
- **Endpoint**: `GET /admin/designs/:designId`
- **Header**: `Authorization: Bearer <ADMIN_TOKEN>`

### Archive Approved Design
- **Endpoint**: `PATCH /admin/designs/:designId/archive`
- **Header**: `Authorization: Bearer <ADMIN_TOKEN>`
- **Request Body**:
  ```json
  {
    "reason": "Obsolete design or client request"
  }
  ```
