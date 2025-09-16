import type { PropsWithChildren } from "react";
import { useAuth } from "react-oidc-context";
import { Navigate } from 'react-router-dom';

/**
 * Wrapper component that checks if the user is logged in. If not, redirects them to the /login page
 */
export function LoginWrapper(props: PropsWithChildren) {
    const auth = useAuth();

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }

    if (auth.isAuthenticated) {
        return props.children;
    } else {
        return <Navigate to="/login"/>
    }
}
