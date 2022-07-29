import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist({
  key: 'auth',
  storage: localStorage,
})

export const authenticateAtom = atom({
  key: 'auth',
  default: false,
  effects_UNSTABLE: [persistAtom],
})


export const cartAtom = atom({
  key: 'cart',
  default: [],
})
