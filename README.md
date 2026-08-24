# User Service

gRPC service for managing users. Backed by MySQL via TypeORM, with soft delete.

## Stack

NestJS, `@grpc/grpc-js`, TypeORM, MySQL

## gRPC methods (`UserService`)

- `create` — validates the email isn't already taken, hashes nothing extra beyond what's provided (password is stored as-is in the request — no additional hashing layer here), and never returns the password field in the response.
- `getById`
- `update` — re-checks email uniqueness if the email is being changed.
- `delete` — soft delete.
- `list`

Request payloads are validated with hand-written validator functions (not class-validator DTOs) via a custom `Validate()` pipe, since a gRPC client can't consume an HTTP-shaped validation error — failures become a real `INVALID_ARGUMENT` gRPC status instead.

## Error handling

Business rule violations (e.g. `UserEmailExistsException`) and not-found lookups throw a typed `DomainException`, mapped to a gRPC status by `GrpcExceptionFilter`/`DomainExceptionFilter`. MySQL constraint violations (duplicate key, FK violation) are mapped by `DatabaseExceptionFilter`; unrecognized DB errors fall back to a generic `INTERNAL` status with the real error only logged server-side.

## Running locally

```bash
npm install
npm run migration:run
npm run start:dev
```

HTTP health check on `PORT` (default `3001`), gRPC server on `GRPC_URL` (default `0.0.0.0:50051`).

## Required env vars

```
PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root
DB_NAME=user_db
GRPC_URL=0.0.0.0:50051
```

## Depends on

A running MySQL instance with a `user_db` database.
