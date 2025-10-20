import { useAtom } from 'jotai';
import { useParams } from "react-router-dom";
import { NavbarComponent } from "../../components/navbar/navbar";
import { actions, atoms } from '../../store/store';
import type { IntegrationConfig } from '../../store/models';
import "./new-integration-page.less";

export function NewIntegrationPage() {
  const { type } = useParams<{ type: string }>();
  const integrationType = type || "Jira";
  const [config] = useAtom(atoms.integrationConfig);
  const [showPreview] = useAtom(atoms.showPreview);
  const [previewDocuments] = useAtom(atoms.previewDocuments);
  const [, updateConfig] = useAtom(actions.updateIntegrationConfig);
  const [, setShowPreview] = useAtom(actions.setShowPreview);

  const handleInputChange = (field: keyof IntegrationConfig, value: string) => {
    updateConfig(field, value);
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleCancel = () => {
    // Navigate back or reset form
    console.log("Cancel clicked");
  };

  return (
    <div className="new-integration-page">
      <div className="layout-lr-container">
        <div className="layout-left">
          <NavbarComponent />
        </div>
        <div className="layout-right">
          <div className="new-integration-content">
            <div className="content-split">
              {/* Left Half - Configuration */}
              <div className="config-section">
                <div className="breadcrumb">
                  <span className="breadcrumb-text">New Integration → {integrationType}</span>
                </div>
                
                <div className="config-title">
                  <h2>Configure your new integration with {integrationType.toLowerCase()}</h2>
                </div>

                <div className="config-form">
                  <div className="form-field">
                    <label htmlFor="apiKey" className="field-label">API Key</label>
                    <input
                      id="apiKey"
                      type="text"
                      className="field-input"
                      value={config.apiKey}
                      onChange={(e) => handleInputChange('apiKey', e.target.value)}
                      placeholder="value"
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="frequency" className="field-label">Frequency</label>
                    <select
                      id="frequency"
                      className="field-input"
                      value={config.frequency}
                      onChange={(e) => handleInputChange('frequency', e.target.value)}
                    >
                      <option value="Hourly">Hourly</option>
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label htmlFor="jqlQuery" className="field-label">JQL Query</label>
                    <textarea
                      id="jqlQuery"
                      className="field-input field-textarea"
                      value={config.jqlQuery}
                      onChange={(e) => handleInputChange('jqlQuery', e.target.value)}
                      placeholder="value"
                      rows={4}
                    />
                  </div>
                </div>

                <div className="action-buttons">
                  <button className="button button-secondary" onClick={handleCancel}>
                    Cancel +
                  </button>
                  <button className="button button-primary" onClick={handlePreview}>
                    Preview +
                  </button>
                </div>
              </div>

              {/* Right Half - Preview */}
              <div className="preview-section">
                <div className="preview-header">
                  <h2>Preview</h2>
                </div>
                
                <div className="preview-content">
                  {!showPreview ? (
                    <div className="preview-placeholder">
                      <p>Click "Preview" on the left-hand pane to see a preview of the imported documents</p>
                    </div>
                  ) : (
                    <div className="preview-results">
                      <div className="preview-description">
                        <p>Click "Preview" on the left-hand pane to see a preview of the imported documents</p>
                      </div>
                      <div className="preview-table-container">
                        <table className="preview-table">
                          <thead>
                            <tr>
                              <th>Title</th>
                              <th>Type</th>
                              <th>Created At</th>
                            </tr>
                          </thead>
                          <tbody>
                            {previewDocuments.map((doc, index) => (
                              <tr key={index}>
                                <td>{doc.title}</td>
                                <td>{doc.type}</td>
                                <td>{doc.createdAt}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="create-integration-container">
                        <button className="button button-primary create-integration-btn">
                          Create Integration Pipeline +
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
