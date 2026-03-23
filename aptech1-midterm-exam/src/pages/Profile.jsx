
import { NavLink } from "react-router-dom";
 


export function ProfileNavItem() {
    return (
        <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
            Profile
        </NavLink>
    );
}

export default function Profile() {
    return (
        <main style={{ padding: 20 }}>
            <h1>Profile</h1>
            <p>This is the profile page.</p>
        </main>
    );
}