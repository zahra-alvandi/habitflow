import { useLocalStorage } from "./useLocalStorage";

export function useAuth() {
  const [user, setUser] = useLocalStorage("habitflow-user", null);

  const login = ({ username, email }) => {
    const newUser = {
      id: crypto.randomUUID(),
      username: username.trim(),
      email: email.trim().toLowerCase(),
      joinedAt: new Date().toISOString(),
      avatar: username.trim().charAt(0).toUpperCase(),
    };
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    setUser(null);

    localStorage.removeItem("planner-v1");
  };

  const updateProfile = (updates) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : prev));
  };

  const isAuthenticated = user !== null;

  return { user, login, logout, updateProfile, isAuthenticated };
}
