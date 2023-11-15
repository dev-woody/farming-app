import { atom } from 'recoil';

export const LoginState = atom<ServerRes>({
  key: 'LoginState',
  default: {
    success: false,
    data: null,
    message: null,
    code: null,
  },
});
