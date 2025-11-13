import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
type AdminContextType = {
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  loginAdmin: () => Promise<void>;
  logoutAdmin: () => void;
  isAuthenticated: boolean;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: any) => {
  const [email, setEmail] = useState(localStorage.getItem("adminEmail") || "");
  const [password, setPassword] = useState("");

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("adminUsername")
  );
  const navigate = useNavigate();

  const loginAdmin = async (): Promise<void> => {
    console.log("button working");
    try {
      const payload = { email, password };
      const res = await API.post("/admin/login", payload);
      if (res.data.success) {
        console.log("✅ Admin logged in:", res.data.admin);
        setIsAuthenticated(true);
        localStorage.setItem("adminEmail", email);
        localStorage.setItem(
          "adminUsername",
          res.data.admin.username || "Admin"
        );
        navigate("/panel");
      } else {
        console.log("❌ Login failed:", res.data.message);
      }
    } catch (err: any) {
      console.error("🔥 Error logging in:", err.response?.data || err.message);
    }
  };

  const logoutAdmin = (): void => {
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminUsername");
    setIsAuthenticated(false);
    setEmail("");
    setPassword("");

    navigate("/admin");
  };

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("adminEmail", email);
    }
  }, [email, , isAuthenticated]);

  return (
    <AdminContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        loginAdmin,
        logoutAdmin,
        isAuthenticated,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used inside AdminProvider");
  return ctx;
};
