import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";

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
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("user"));
        } catch {
            return null;
        }
    });

    useEffect(() => {
        const onStorage = (e) => {
            if (e.key === "user") {
                setUser(e.newValue ? JSON.parse(e.newValue) : null);
            }
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    function handleSignOut() {
        localStorage.removeItem("user");
        setUser(null);
    }

    // small helper to format createdAt
    const created = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—";

    if (!user) {
        return (
            <main style={{ padding: 20 }}>
                <h1>Profile</h1>
                <p>No user is signed in.</p>
                <p>
                    <Link to="/signup">Create an account</Link> or return{" "}
                    <Link to="/">home</Link>.
                </p>
            </main>
        );
    }

    return (
        <main style={{ padding: 20, maxWidth: 820 }}>
            <header style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 18 }}>
                <img
                    className="profile-avatar"
                    src={user.avatar || user.photoURL || "/avatar-placeholder.png"}
                    alt="avatar"
                    style={{ width: 96, height: 96, borderRadius: 12, objectFit: "cover" }}
                />
                <div>
                    <h1 style={{ margin: 0 }}>{user.name || user.username || "User"}</h1>
                    <p style={{ margin: 4, color: "rgba(255,255,255,0.7)" }}>{user.email}</p>
                    <div style={{ marginTop: 8 }}>
                        <button onClick={handleSignOut} style={{ padding: "8px 12px", borderRadius: 8, border: "none", background: "#ff6b6b", color: "#fff", cursor: "pointer" }}>
                            Sign out
                        </button>
                    </div>
                </div>
            </header>

            <section style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16 }}>
                <div>
                    <h2 style={{ marginTop: 0 }}>About</h2>
                    <p style={{ color: "rgba(255,255,255,0.8)" }}>{user.bio || "No bio provided."}</p>

                    <h3>Details</h3>
                    <ul>
                        <li><strong>Full name:</strong> {user.name || "-"}</li>
                        <li><strong>Email:</strong> {user.email || "-"}</li>
                        <li><strong>Username:</strong> {user.username || "-"}</li>
                        {/* add additional fields if present */}
                    </ul>
                </div>

                <aside style={{ padding: 12, borderRadius: 12, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.03)" }}>
                    <h4 style={{ marginTop: 0 }}>Quick</h4>
                    <p style={{ color: "rgba(255,255,255,0.7)" }}>Member since: {user.createdAt || "—"}</p>
                    <p style={{ color: "rgba(255,255,255,0.7)" }}>Role: {user.role || "user"}</p>
                </aside>
            </section>
        </main>
    );
}