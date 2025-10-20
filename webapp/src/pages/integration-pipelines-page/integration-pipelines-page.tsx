import { useAtom } from 'jotai';
import { NavbarComponent } from "../../components/navbar/navbar";
import { useNavigate } from "react-router-dom";
import { atoms } from '../../store/store';
import "./integration-pipelines-page.less";

export function IntegrationPipelinesPage() {
  const navigate = useNavigate();
  const [pipelines] = useAtom(atoms.pipelines);

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
              <button 
                className="new-pipeline-btn"
                onClick={() => navigate("/integrations/new")}
              >
                New Pipeline +
              </button>
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
