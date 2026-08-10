export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  id: number;
  name?: string;
  email?: string;
  password?: string;
}

export interface EntityIdRequest {
  id: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserListResponse {
  data: User[];
}
