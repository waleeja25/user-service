# User Service

gRPC service for managing users. Backed by MySQL via TypeORM, with soft delete. Publishes a `user.created` event to RabbitMQ after a user is successfully created.

## Stack

NestJS, `@grpc/grpc-js`, TypeORM, MySQL, RabbitMQ

## gRPC methods (`UserService`)

`create`, `getById`, `update`, `delete`, `list`. Email uniqueness is enforced on create/update. Requests are validated with hand-written validator functions (via a custom `Validate()` pipe), not class-validator DTOs, so failures surface as a real `INVALID_ARGUMENT` gRPC status.

## Error handling

Business rule violations and not-found lookups throw a typed `DomainException`, mapped to a gRPC status by `GrpcExceptionFilter`/`DomainExceptionFilter`. MySQL constraint violations are mapped by `DatabaseExceptionFilter`.

## Folder structure

```
src/
├── user/                # controller, service, mapper, entity, validators
├── rabbitmq/             # RabbitMQService (producer), user.created event, routing key
├── common/               # BaseEntity/BaseService, exceptions, filters, gRPC constants
├── config/
├── database/             # data source + migrations
└── health/
```

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

RABBITMQ_URL=amqp://guest:guest@localhost:5672
RABBITMQ_NOTIFICATION_QUEUE=notification_queue
```

## Depends on

A running MySQL instance with a `user_db` database, and a running RabbitMQ broker.
