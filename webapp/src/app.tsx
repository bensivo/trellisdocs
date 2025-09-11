import { HomePage } from './pages/homepage/homepage'
import { TemplateBrowserPage } from './pages/template-browser-page/template-browser-page'
import { TemplateEditorPage } from './pages/template-editor-page/template-editor-page'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import './App.less'

function App() {
  return (
    <>
     <BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/template" element={<TemplateBrowserPage />} />
				<Route path="/template/new" element={<TemplateEditorPage />} />
			</Routes>
		</BrowserRouter>
    </>
  )
}

export default App
