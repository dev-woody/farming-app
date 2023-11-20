import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();


export const TokenState = atom <string | null>({
  key: 'TokenState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});
