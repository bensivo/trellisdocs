import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Template } from "./pages/Template/Template.tsx";
import "./index.css";
import App from "./App.tsx";
import { NewTemplate } from "./pages/NewTemplate/NewTemplate.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/template" element={<Template />} />
				<Route path="/template/new" element={<NewTemplate />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
