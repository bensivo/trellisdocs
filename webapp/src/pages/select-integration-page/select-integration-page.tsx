import { NavbarComponent } from "../../components/navbar/navbar";
import "./select-integration-page.less";

type IntegrationSource = {
  id: number;
  name: string;
  description: string;
  icon?: string;
};

export function SelectIntegrationPage() {
  const integrationSources: IntegrationSource[] = [
    {
      id: 1,
      name: "Jira",
      description: "Fetch from Atlassian Jira",
    },
    {
      id: 2,
      name: "GitHub",
      description: "Import from GitHub repositories",
    },
    {
      id: 3,
      name: "Slack",
      description: "Capture from Slack channels",
    },
    {
      id: 4,
      name: "Confluence",
      description: "Import from Confluence pages",
    },
    {
      id: 5,
      name: "Linear",
      description: "Sync from Linear issues",
    },
    {
      id: 6,
      name: "Notion",
      description: "Import from Notion databases",
    },
  ];

  return (
    <div className="select-integration-page">
      <div className="layout-lr-container">
        <div className="layout-left">
          <NavbarComponent />
        </div>
        <div className="layout-right">
          <div className="select-integration-page-content">
            <div className="page-header">
              <h1 className="page-title">Select Integration Source</h1>
              <p className="page-subtitle">
                Choose from one of the available integration sources.
              </p>
            </div>
            <div className="integration-sources-grid">
              {integrationSources.map((source) => (
                <div key={source.id} className="integration-source-card">
                  <div className="card-icon">
                    <div className="icon-placeholder"></div>
                  </div>
                  <div className="card-content">
                    <h3 className="source-name">{source.name}</h3>
                    <p className="source-description">{source.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
