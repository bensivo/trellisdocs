import type { Getter, Setter } from 'jotai';
import { atom, createStore } from 'jotai';
import type { Document } from './models';
import { mockDocuments } from './mock-data';

// Define all atoms, the core data elements stored in the store
// Atoms can either store values themselves, or be derived from other atoms
export const atoms = {
    documents: atom<Document[]>([]),
    activeDocumentId: atom<number>(0),
    activeDocument: atom<Document | null>((get) => {
        const documents: Document[] = get(atoms.documents);
        const activeDocumentId: number = get(atoms.activeDocumentId);

        return documents.find(d => d.id === activeDocumentId) ?? null;
    })
}

// Define all actions, atoms that do nothing but update other atoms
export const actions = {
    setDocuments: createAction((_, set, documents: Document[]) => {
        set(atoms.documents, documents);
    }),
    setActiveDocumentId: createAction((_, set, id: number) => {
        set(atoms.activeDocumentId, id);
    })
}

export function initializeStore() {
    const store = createStore();

    // Provide any initial values
    // TODO: this is where we'd load state from localstorage, if necessary
    store.set(atoms.documents, mockDocuments)

    return store;
}

// Utility to create Action atoms
function createAction<Args extends any[]>(
    fn: (get: Getter, set: Setter, ...args: Args) => void
) {
    return atom(null, fn);
}