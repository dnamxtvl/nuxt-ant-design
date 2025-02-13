export interface FormInputLogin {
  email: string;
  password: string;
  remember: boolean;
}

export interface UserInfo {
  id: string;
  email: string;
  name: string;
  avatar?: string | null;
}
