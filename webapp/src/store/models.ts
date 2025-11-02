export interface Document {
    id: number;
    name: string;
    property_fields: DocumentField[];
    content_fields: DocumentField[];
}

export interface DocumentField {
    id: number;
    name: string;
    type: string;
    value: any;
}

export interface Pipeline {
    id: number;
    title: string;
    description: string;
    color: string;
    status?: 'active' | 'inactive' | 'error';
    lastSync?: string;
}

export interface IntegrationSource {
    id: number;
    name: string;
    description: string;
    icon?: string;
    available: boolean;
}

export interface IntegrationConfig {
    apiKey: string;
    frequency: string;
    jqlQuery: string;
    [key: string]: any;
}

export interface PreviewDocument {
    title: string;
    type: string;
    createdAt: string;
    source?: string;
}