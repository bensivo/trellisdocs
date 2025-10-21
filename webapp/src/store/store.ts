import type { Getter, Setter } from 'jotai';
import { atom, createStore } from 'jotai';
import type { Document, Pipeline, IntegrationSource, IntegrationConfig, PreviewDocument } from './models';
// import { mockDocuments, mockPipelines, mockIntegrationSources, mockPreviewDocuments } from './mock-data';
import axios from 'axios';

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
    setDocuments: createAction((_, set, documents: Document[]) => {
        set(atoms.documents, documents);
    }),
    setActiveDocumentId: createAction((_, set, id: number) => {
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
    }),
    updateDocument: createAction((_, set, id: number, document: Document) => {
        set(atoms.documents, (docs) => docs.map((doc) => (doc.id === id ? document : doc)));
    }),
    fetchDocuments: createAction(async (_, set) => {
        const res = await axios.get('http://localhost:8000/api/documents');
        const documents: Document[] = res.data; // TODO: validate
        set(atoms.documents, documents);
    }),
    fetchPipelines: createAction(async (_, set) => {
        const res = await axios.get('http://localhost:8000/api/pipelines');
        const pipelines: Pipeline[] = res.data; // TODO: validate
        set(atoms.pipelines, pipelines);
    }),
    fetchIntegrationSources: createAction(async (_, set) => {
        const res = await axios.get('http://localhost:8000/api/integration-sources');
        const sources: IntegrationSource[] = res.data; // TODO: validate
        set(atoms.integrationSources, sources);
    }),
    fetchPreviewDocuments: createAction(async (_, set) => {
        const res = await axios.get('http://localhost:8000/api/preview-documents');
        const previewDocuments: PreviewDocument[] = res.data; // TODO: validate
        set(atoms.previewDocuments, previewDocuments);
    }),
}

export function initializeStore() {
    const store = createStore();

    // Provide any initial values
    // TODO: this is where we'd load state from localstorage, if necessary
    store.set(atoms.pipelines, []);
    store.set(atoms.integrationSources, []);
    store.set(atoms.previewDocuments, []);
    // store.set(atoms.documents, mockDocuments)
    store.set(atoms.documents, []);

    return store;
}

// Utility to create Action atoms
function createAction<Args extends any[]>(
    fn: (get: Getter, set: Setter, ...args: Args) => void
) {
    return atom(null, fn);
}