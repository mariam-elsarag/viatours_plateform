import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<null | AuthContextType>(null);

type UserType = {
  id: string | null;
  fullName: string | null;
  avatar: string | null;
  role: string | null;
};

type LoginType = UserType & {
  token: string | null;
};

type AuthContextType = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
  login: (data: LoginType) => void;
  logout: (nav?: string) => void;
};

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const navigate = useNavigate();

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const [user, setUser] = useState<UserType>({
    id: localStorage.getItem("id"),
    fullName: localStorage.getItem("fullName"),
    role: localStorage.getItem("role"),
    avatar: localStorage.getItem("avatar"),
  });

  const login = (data: LoginType) => {
    localStorage.setItem("token", data.token || "");
    localStorage.setItem("id", data.id || "");
    localStorage.setItem("avatar", data.avatar || "");
    localStorage.setItem("fullName", data.fullName || "");
    localStorage.setItem("role", data.role || "");

    setToken(data.token);
    setUser({
      id: data.id,
      fullName: data.fullName,
      avatar: data.avatar,
      role: data.role,
    });
  };

  const logout = (nav = "/") => {
    localStorage.clear();
    setToken(null);
    setUser({ id: null, fullName: null, avatar: null, role: null });
    navigate(nav);
  };

  return (
    <AuthContext.Provider
      value={{ token, setToken, user, setUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

export { useAuth, AuthProvider };
