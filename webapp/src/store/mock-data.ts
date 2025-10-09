import type { Document } from "./models";

export const mockDocuments: Document[] = [
    {
        id: 1,
        name: "Q4 Financial Report",
        property_fields: [
            { id: 101, name: "author", type: "string", value: "Sarah Chen" },
            { id: 102, name: "created_date", type: "date", value: "2025-01-15" },
            { id: 103, name: "status", type: "string", value: "approved" },
            { id: 104, name: "version", type: "number", value: 2.1 }
        ],
        content_fields: [
            { id: 201, name: "revenue", type: "number", value: 2450000 },
            { id: 202, name: "expenses", type: "number", value: 1820000 },
            { id: 203, name: "summary", type: "text", value: "Strong quarter with 15% growth" }
        ]
    },
    {
        id: 2,
        name: "Employee Handbook 2025",
        property_fields: [
            { id: 105, name: "author", type: "string", value: "HR Department" },
            { id: 106, name: "created_date", type: "date", value: "2025-01-02" },
            { id: 107, name: "confidential", type: "boolean", value: false },
            { id: 108, name: "page_count", type: "number", value: 47 }
        ],
        content_fields: [
            { id: 204, name: "policies", type: "text", value: "Updated remote work and PTO policies" },
            { id: 205, name: "effective_date", type: "date", value: "2025-02-01" }
        ]
    },
    {
        id: 3,
        name: "Product Roadmap",
        property_fields: [
            { id: 109, name: "author", type: "string", value: "Mike Torres" },
            { id: 110, name: "created_date", type: "date", value: "2025-01-20" },
            { id: 111, name: "department", type: "string", value: "Product" },
            { id: 112, name: "priority", type: "number", value: 1 }
        ],
        content_fields: [
            { id: 206, name: "q1_goals", type: "text", value: "Launch mobile app beta" },
            { id: 207, name: "q2_goals", type: "text", value: "API v2 release" },
            { id: 208, name: "budget", type: "number", value: 350000 }
        ]
    },
    {
        id: 4,
        name: "Marketing Campaign Analysis",
        property_fields: [
            { id: 113, name: "author", type: "string", value: "Jennifer Park" },
            { id: 114, name: "created_date", type: "date", value: "2025-01-18" },
            { id: 115, name: "campaign_id", type: "string", value: "CAMP-2025-001" },
            { id: 116, name: "reviewed", type: "boolean", value: true }
        ],
        content_fields: [
            { id: 209, name: "impressions", type: "number", value: 1250000 },
            { id: 210, name: "conversions", type: "number", value: 3420 },
            { id: 211, name: "roi", type: "number", value: 2.8 },
            { id: 212, name: "notes", type: "text", value: "Exceeded expectations by 40%" }
        ]
    },
    {
        id: 5,
        name: "Security Audit Report",
        property_fields: [
            { id: 117, name: "author", type: "string", value: "Alex Kumar" },
            { id: 118, name: "created_date", type: "date", value: "2025-01-10" },
            { id: 119, name: "severity", type: "string", value: "medium" },
            { id: 120, name: "confidential", type: "boolean", value: true }
        ],
        content_fields: [
            { id: 213, name: "vulnerabilities_found", type: "number", value: 7 },
            { id: 214, name: "critical_issues", type: "number", value: 0 },
            { id: 215, name: "recommendations", type: "text", value: "Update SSL certs, enable 2FA" }
        ]
    },
    {
        id: 6,
        name: "Customer Feedback Summary",
        property_fields: [
            { id: 121, name: "author", type: "string", value: "Lisa Wang" },
            { id: 122, name: "created_date", type: "date", value: "2025-01-25" },
            { id: 123, name: "period", type: "string", value: "January 2025" },
            { id: 124, name: "response_count", type: "number", value: 342 }
        ],
        content_fields: [
            { id: 216, name: "avg_satisfaction", type: "number", value: 4.2 },
            { id: 217, name: "nps_score", type: "number", value: 58 },
            { id: 218, name: "top_complaint", type: "text", value: "Slow load times on mobile" }
        ]
    },
    {
        id: 7,
        name: "Office Lease Agreement",
        property_fields: [
            { id: 125, name: "author", type: "string", value: "Legal Team" },
            { id: 126, name: "created_date", type: "date", value: "2024-12-15" },
            { id: 127, name: "signed", type: "boolean", value: true },
            { id: 128, name: "term_years", type: "number", value: 5 }
        ],
        content_fields: [
            { id: 219, name: "monthly_rent", type: "number", value: 18500 },
            { id: 220, name: "start_date", type: "date", value: "2025-02-01" },
            { id: 221, name: "address", type: "text", value: "450 Market St, San Francisco, CA" }
        ]
    },
    {
        id: 8,
        name: "Training Materials - React Advanced",
        property_fields: [
            { id: 129, name: "author", type: "string", value: "David Lee" },
            { id: 130, name: "created_date", type: "date", value: "2025-01-12" },
            { id: 131, name: "category", type: "string", value: "Engineering" },
            { id: 132, name: "difficulty", type: "string", value: "advanced" }
        ],
        content_fields: [
            { id: 222, name: "duration_hours", type: "number", value: 8 },
            { id: 223, name: "topics", type: "text", value: "Hooks, Performance, Suspense" },
            { id: 224, name: "enrolled_users", type: "number", value: 23 }
        ]
    },
    {
        id: 9,
        name: "Server Maintenance Log",
        property_fields: [
            { id: 133, name: "author", type: "string", value: "DevOps Team" },
            { id: 134, name: "created_date", type: "date", value: "2025-01-22" },
            { id: 135, name: "server_id", type: "string", value: "SRV-PROD-03" },
            { id: 136, name: "downtime_minutes", type: "number", value: 12 }
        ],
        content_fields: [
            { id: 225, name: "issue", type: "text", value: "Memory leak in cache service" },
            { id: 226, name: "resolution", type: "text", value: "Restarted service, applied patch" },
            { id: 227, name: "incident_id", type: "string", value: "INC-2025-089" }
        ]
    },
    {
        id: 10,
        name: "Quarterly OKR Review",
        property_fields: [
            { id: 137, name: "author", type: "string", value: "Emma Rodriguez" },
            { id: 138, name: "created_date", type: "date", value: "2025-01-28" },
            { id: 139, name: "quarter", type: "string", value: "Q1 2025" },
            { id: 140, name: "teams_reviewed", type: "number", value: 8 }
        ],
        content_fields: [
            { id: 228, name: "objectives_met", type: "number", value: 14 },
            { id: 229, name: "objectives_total", type: "number", value: 18 },
            { id: 230, name: "completion_rate", type: "number", value: 0.78 },
            { id: 231, name: "highlights", type: "text", value: "Engineering exceeded goals, sales lagging" }
        ]
    }
];