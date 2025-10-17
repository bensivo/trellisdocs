import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginWrapper } from "./components/login-wrapper/login-wrapper";
import { HomePage } from './pages/homepage/homepage';
import { LoginPage } from './pages/loginpage/loginpage';
import { SearchPage } from "./pages/search-page/search-page";
import { TemplateBrowserPage } from './pages/template-browser-page/template-browser-page';
import { TemplateEditorPage } from './pages/template-editor-page/template-editor-page';

import "remixicon/fonts/remixicon.css";
import './app.less';
import { IntegrationPipelinesPage } from "./pages/integration-pipelines-page/integration-pipelines-page";
import { SelectIntegrationPage } from "./pages/select-integration-page/select-integration-page";
import { NewIntegrationPage } from "./pages/new-integration-page/new-integration-page";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginWrapper><HomePage/></LoginWrapper>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/search" element={<SearchPage/>} />
                <Route path="/integrations" element={<LoginWrapper><IntegrationPipelinesPage/></LoginWrapper>} />
                <Route path="/integrations/new" element={<LoginWrapper><SelectIntegrationPage/></LoginWrapper>} />
                <Route path="/integrations/configure/:type" element={<LoginWrapper><NewIntegrationPage/></LoginWrapper>} />
                <Route path="/template" element={<LoginWrapper><TemplateBrowserPage/></LoginWrapper>} />
                <Route path="/template/new" element={<LoginWrapper><TemplateEditorPage/></LoginWrapper>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
