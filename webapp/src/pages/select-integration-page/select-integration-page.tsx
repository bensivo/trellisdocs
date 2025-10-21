import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { NavbarComponent } from "../../components/navbar/navbar";
import { atoms, actions } from '../../store/store';
import "./select-integration-page.less";

export function SelectIntegrationPage() {
  const navigate = useNavigate();
  const [integrationSources] = useAtom(atoms.integrationSources);
  const [, fetchIntegrationSources] = useAtom(actions.fetchIntegrationSources);

  useEffect(() => {
    fetchIntegrationSources();
  }, [fetchIntegrationSources]);
  
  const handleIntegrationSelect = (integrationName: string) => {
    navigate(`/integrations/configure/${integrationName.toLowerCase()}`);
  };

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
              {integrationSources.filter(source => source.available).map((source) => (
                <div 
                  key={source.id} 
                  className="integration-source-card"
                  onClick={() => handleIntegrationSelect(source.name)}
                >
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
