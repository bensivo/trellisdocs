import { NavbarComponent } from "../../components/navbar/navbar";
import "./integration-pipelines-page.less";

type Pipeline = {
  id: number;
  title: string;
  description: string;
  color: string;
};

export function IntegrationPipelinesPage() {
  const pipelines: Pipeline[] = [
    {
      id: 1,
      title: "Jira Integration",
      description: "Sync issues and stories from Atlassian Jira",
      color: "#0052CC",
    },
    {
      id: 2,
      title: "GitHub Integration",
      description: "Import repositories and pull requests",
      color: "#24292e",
    },
    {
      id: 3,
      title: "Slack Integration",
      description: "Capture conversations and channel data",
      color: "#4A154B",
    },
    {
      id: 4,
      title: "Confluence Integration",
      description: "Import documentation and wiki pages",
      color: "#172B4D",
    },
    {
      id: 5,
      title: "Linear Integration",
      description: "Sync issues and project data",
      color: "#5E6AD2",
    },
    {
      id: 6,
      title: "Notion Integration",
      description: "Import pages and database records",
      color: "#000000",
    },
  ];

  return (
    <div className="integration-pipelines-page">
      <div className="layout-lr-container">
        <div className="layout-left">
          <NavbarComponent />
        </div>
        <div className="layout-right">
          <div className="integration-pipelines-page-content">
            <div className="page-header">
              <h1 className="page-title">Integration Pipelines</h1>
            </div>
            <div className="search-container">
              <input className="searchbar" placeholder="Search" />
              <button className="new-pipeline-btn">New Pipeline +</button>
            </div>
            <div className="pipelines-container"></div>
            <div className="pipelines-list">
              {pipelines.map((pipeline) => (
                <div key={pipeline.id} className="pipeline-card">
                  <div
                    className="pipeline-color-indicator"
                    style={{ backgroundColor: pipeline.color }}
                  ></div>
                  <div className="pipeline-content">
                    <h3 className="pipeline-title">{pipeline.title}</h3>
                    <p className="pipeline-description">
                      {pipeline.description}
                    </p>
                  </div>
                  <div className="pipeline-actions">
                    <i className="ri-settings-3-line gear-icon"></i>
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
