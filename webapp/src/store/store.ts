import type { Getter, Setter } from 'jotai';
import { atom, createStore } from 'jotai';
import type { Document, Pipeline, IntegrationSource, IntegrationConfig, PreviewDocument } from './models';
import { mockDocuments, mockPipelines, mockIntegrationSources, mockPreviewDocuments } from './mock-data';

// Define all atoms, the core data elements stored in the store
// Atoms can either store values themselves, or be derived from other atoms
export const atoms = {
    documents: atom<Document[]>([]),
    activeDocumentId: atom<number>(0),
    activeDocument: atom<Document | null>((get) => {
        const documents: Document[] = get(atoms.documents);
        const activeDocumentId: number = get(atoms.activeDocumentId);

        return documents.find(d => d.id === activeDocumentId) ?? null;
    }),
    // Integration-related atoms
    pipelines: atom<Pipeline[]>([]),
    integrationSources: atom<IntegrationSource[]>([]),
    integrationConfig: atom<IntegrationConfig>({
        apiKey: "",
        frequency: "Daily",
        jqlQuery: ""
    }),
    previewDocuments: atom<PreviewDocument[]>([]),
    showPreview: atom<boolean>(false)
}

// Define all actions, atoms that do nothing but update other atoms
export const actions = {
    setDocuments: createAction((get, set, documents: Document[]) => {
        set(atoms.documents, documents);
    }),
    setActiveDocumentId: createAction((get, set, id: number) => {
        set(atoms.activeDocumentId, id);
    }),
    // Integration-related actions
    setPipelines: createAction((get, set, pipelines: Pipeline[]) => {
        set(atoms.pipelines, pipelines);
    }),
    setIntegrationSources: createAction((get, set, sources: IntegrationSource[]) => {
        set(atoms.integrationSources, sources);
    }),
    setIntegrationConfig: createAction((get, set, config: IntegrationConfig) => {
        set(atoms.integrationConfig, config);
    }),
    updateIntegrationConfig: createAction((get, set, field: keyof IntegrationConfig, value: string) => {
        const currentConfig = get(atoms.integrationConfig);
        set(atoms.integrationConfig, { ...currentConfig, [field]: value });
    }),
    setPreviewDocuments: createAction((get, set, documents: PreviewDocument[]) => {
        set(atoms.previewDocuments, documents);
    }),
    setShowPreview: createAction((get, set, show: boolean) => {
        set(atoms.showPreview, show);
    })
}

export function initializeStore() {
    const store = createStore();

    // Provide any initial values
    // TODO: this is where we'd load state from localstorage, if necessary
    store.set(atoms.documents, mockDocuments);
    store.set(atoms.pipelines, mockPipelines);
    store.set(atoms.integrationSources, mockIntegrationSources);
    store.set(atoms.previewDocuments, mockPreviewDocuments);

    return store;
}

// Utility to create Action atoms
function createAction<Args extends any[]>(
    fn: (get: Getter, set: Setter, ...args: Args) => void
) {
    return atom(null, fn);
}