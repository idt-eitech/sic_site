# SIC Backend REST APIs

## Base URL
- Default base URL: `http://localhost:3000`
- Configurable via `PORT` environment variable

## Authentication
- Scheme: `Bearer` token in `Authorization` header
- Obtain token via `POST /auth/login`
- Token validity: 7 days
- Admin-only endpoints require a user with role `ADMIN`
- Verification middleware reference: `src/middleware/auth.js:4`

## Media Types
- Requests and responses use `application/json` unless noted
- File upload uses `multipart/form-data`

## Endpoints

### Auth
- `POST /auth/register` (`src/routes/auth.js:9`)
  - Body: `{ "email": string, "password": string, "display_name"?: string, "details"?: object }`
  - 200: `{ "id": number }`
  - 400: `{ "error": "InvalidInput" }`
  - 409: `{ "error": "EmailExists" }`
  - 500: `{ "error": "RegisterError" }`
  - Notes: password is stored as a bcrypt hash; `details` is stored as JSON

- `POST /auth/login` (`src/routes/auth.js:26`)
  - Body: `{ "email": string, "password": string }`
  - 200: `{ "token": string, "expiresAt": isoString }`
  - 401: `{ "error": "InvalidCredentials" }`
  - 403: `{ "error": "UserDisabled" }`
  - 500: `{ "error": "LoginError" }`

- `POST /auth/logout` (`src/routes/auth.js:49`)
  - Header: `Authorization: Bearer <token>`
  - 200: `{ "ok": true }`
  - 400: `{ "error": "InvalidToken" }`
  - 500: `{ "error": "LogoutError" }`

- `PATCH /auth/me` (`src/routes/auth.js:63`)
  - Header: `Authorization: Bearer <token>`
  - Body: `{ "details": object | null }`
  - 200: `{ "ok": true }`
  - 400: `{ "error": "InvalidInput" }`
  - 500: `{ "error": "UpdateMeError" }`

- `GET /auth/me` (`src/routes/auth.js:77`)
  - Header: `Authorization: Bearer <token>`
  - 200: `User`
  - User object:
    - `{ id, email, display_name, role, is_active, last_login_at, created_at, updated_at, details }`
  - 404: `{ "error": "NotFound" }`
  - 500: `{ "error": "GetMeError" }`

### Papers
- `GET /papers` (`src/routes/papers.js:23`)
  - Header: `Authorization: Bearer <token>`
  - Admin: returns all papers, ordered by `uploaded_at` desc
  - Regular: returns papers filtered by current user
  - 200: `Array<Paper>`
  - 500: `{ "error": "ListError" }`
  - Paper object:
    - `{ id, user_id, title, description, file_path, file_size_bytes, file_hash, status, uploaded_at, updated_at }`

- `POST /papers` (`src/routes/papers.js:36`)
  - Header: `Authorization: Bearer <token>`
  - Content-Type: `multipart/form-data`
  - Fields:
    - `file`: PDF file
    - `title`: string
    - `description` (optional): string
  - 200: `{ "id": number }`
  - 400: `{ "error": "InvalidInput" }`
  - 500: `{ "error": "UploadError" }`
  - Notes: files stored under `uploads/`; SHA-256 `file_hash` recorded

- `PATCH /papers/:id/accept` (`src/routes/papers.js:54`)
  - Header: `Authorization: Bearer <token>`
  - Role: Admin required
  - 200: `{ "ok": true }`
  - 400: `{ "error": "InvalidId" }`
  - 500: `{ "error": "UpdateError" }`

- `PATCH /papers/:id/reject` (`src/routes/papers.js:65`)
  - Header: `Authorization: Bearer <token>`
  - Role: Admin required
  - 200: `{ "ok": true }`
  - 400: `{ "error": "InvalidId" }`
  - 500: `{ "error": "UpdateError" }`

### Admin
- `GET /admin/users` (`src/routes/admin.js:7`)
  - Header: `Authorization: Bearer <token>`
  - Role: Admin required
  - 200: `Array<User>`
  - 500: `{ "error": "ListUsersError" }`
  - User object:
    - `{ id, email, display_name, role, is_active, last_login_at, created_at, updated_at, details }`

- `PATCH /admin/users/:id` (`src/routes/admin.js:16`)
  - Header: `Authorization: Bearer <token>`
  - Role: Admin required
  - Body fields (any combination):
    - `role`: `"ADMIN" | "USER"`
    - `is_active`: `boolean | number`
    - `details`: `object | null`
  - 200: `{ "ok": true }`
  - 400: `{ "error": "InvalidId" }` or `{ "error": "NoChanges" }`
  - 500: `{ "error": "UpdateUserError" }`


## Error Payloads
- Errors return `{ "error": string }` with appropriate HTTP status codes
- Common errors:
  - `InvalidInput`, `EmailExists`, `InvalidCredentials`, `UserDisabled`, `InvalidToken`
  - `ListError`, `UploadError`, `UpdateError`, `ListUsersError`, `UpdateUserError`
