import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { TemplateEditorPage } from "./pages/template-editor-page/template-editor-page.tsx";
import { TemplateBrowserPage } from "./pages/template-browser-page/template-browser-page.tsx";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/template" element={<TemplateBrowserPage />} />
				<Route path="/template/new" element={<TemplateEditorPage />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
