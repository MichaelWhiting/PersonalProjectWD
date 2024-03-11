import { Outlet } from "react-router-dom";

function AuthenticationPage() {
    return ( // holds the outlet that decides whether to show the LoginPage or the CreateAccountPage
        <Outlet/>
    )
}

export default AuthenticationPage;