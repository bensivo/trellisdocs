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