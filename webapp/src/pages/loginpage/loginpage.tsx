import { useAuth } from "react-oidc-context";

import './loginpage.less';

export function LoginPage() {
    const auth = useAuth();

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }

    if (auth.error) {
        return <div>Encountering error... {auth.error.message}</div>;
    }

    return (
        <div className="loginpage">
            <button onClick={() => auth.signinRedirect()}>
                Login with Cognito
            </button>
        </div>
    )
}
