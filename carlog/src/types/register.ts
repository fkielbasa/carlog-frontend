export interface RegisterParams {
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phoneNumber: string;
}

export interface RegisterResponse {
  token: string;
}
