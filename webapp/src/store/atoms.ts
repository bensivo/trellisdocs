import { atom } from 'jotai';

// Simple counter atom
export const counterAtom = atom(0);

// Derived atom
export const counterTimesTwoAtom = atom((get) => {
    const counter = get(counterAtom);
    return counter * 2
});

// Action atom - doesn't hold any values itself, but has a 'setter', which actually sets other atoms
export const doubleAtom = atom(null, (get, set) => {
    const counter = get(counterAtom);
    set(counterAtom, counter * 2)
})
