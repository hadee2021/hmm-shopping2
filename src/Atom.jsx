import { atom } from 'recoil'

export const authenticateAtom = atom({
  key: 'auth',
  default: false,
})

export const cartAtom = atom({
  key: 'cart',
  default: [],
})

export const loadingAtiom = atom({
  key: 'loading',
  default: true,
})