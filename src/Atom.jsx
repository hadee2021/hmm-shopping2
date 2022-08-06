import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom: authPersist } = recoilPersist({
  key: 'auth',
  storage: localStorage,
})

export const authenticateAtom = atom({
  key: 'auth',
  default: false,
  effects_UNSTABLE: [authPersist],
})

const { persistAtom: cartPersist } = recoilPersist({
  key: 'cart',
  storage: localStorage,
})


export const cartAtom = atom({
  key: 'cart',
  default: [],
  effects_UNSTABLE: [cartPersist]
})
