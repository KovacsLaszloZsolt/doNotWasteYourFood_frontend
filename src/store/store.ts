import { atom, createStore } from 'jotai';
import { User } from '../../types/authentication.type';
import { Food } from '../../types/food.type';

export const store = createStore();

export const appLocaleAtom = atom<string>('en');

export const userAtom = atom<User | undefined>(undefined);

export const foodsAtom = atom<Food[]>([]);

export const snackbarMessageAtom = atom<string | null>(null);

store.set(appLocaleAtom, 'en');
store.set(userAtom, undefined);
store.set(foodsAtom, []);
store.set(snackbarMessageAtom, null);
