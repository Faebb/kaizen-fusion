export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthTenant {
  id: string;
  name: string;
  slug: string;
}

export interface AuthResult {
  token: string;
  user: AuthUser;
  tenant: AuthTenant;
}

export interface RegisterPayload {
  restaurantName: string;
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
