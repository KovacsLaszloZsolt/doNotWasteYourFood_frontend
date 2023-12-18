import { atom, createStore } from 'jotai';
import { User } from '../../types/authentication';

export const store = createStore();

export const userAtom = atom<User | undefined>(undefined);

store.set(userAtom, undefined);
