import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import "./index.css";
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
	authority: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_ViGpu0xap",
	client_id: "7a6v4jhhcmr10ogbu2inntf7bp",
	redirect_uri: "http://localhost:5173",
	response_type: "code",
	scope: "openid email",
};

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AuthProvider {...cognitoAuthConfig}>
			<App />
		</AuthProvider>
	</StrictMode>
);
