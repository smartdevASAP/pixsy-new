// import { createContext, useState, useEffect, useContext } from "react";
// import type { ReactNode } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api/axios";
// import toast from "react-hot-toast";
// //type to declare the users (email na akina username na the other stuffs like bio)
// type AppContextType = {
//   username: string;
//   setUsername: (val: string) => void;
//   saveUser: () => void;
//   deleteUser: () => void;
//   firstname: string;
//   setFirstname: (val: string) => void;
//   lastname: string;
//   setLastname: (val: string) => void;
//   phone: string;
//   setPhone: (val: string) => void;
//   birthDay: string;
//   setBirthDay: (val: string) => void;
//   password: string;
//   setPassword: (val: string) => void;
//   confirmPassword: string;
//   setConfirmPassword: (val: string) => void;
//   bio: string;
//   setBio: (val: string) => void;
//   pronouns: string;
//   setPronouns: (val: string) => void;
//   confirmPhone: string;
//   setConfirmPhone: (val: string) => void;
//   email: string;
//   setEmail: (val: string) => void;
//   sendToServer: () => void;
//   login: () => void;
//   actualUser: any;
//   setActualUser: (val: any) => any;
//   hasAccount: boolean; //to choose whether to create acc or login
//   setHasAccount: (val: boolean) => any;
//   //to login the user
//   loggingEmail: string;
//   setLoggingEmail: (val: any) => any;
//   loggingPassword: string;
//   setLoggingPassword: (val: any) => any;
// };
// //creating a context
// const AppContext = createContext<AppContextType | undefined>(undefined);
// export const AppProvider = ({ children }: { children: ReactNode }) => {
//   //all authentication details are to be kept here
//   const [username, setUsername] = useState(
//     localStorage.getItem("username") || ""
//   );
//   const [firstname, setFirstname] = useState(
//     localStorage.getItem("firstname") || ""
//   );
//   const [lastname, setLastname] = useState(
//     localStorage.getItem("lastname") || ""
//   );
//   const [phone, setPhone] = useState(localStorage.getItem("phone") || "");
//   const [birthDay, setBirthDay] = useState(
//     localStorage.getItem("birthDay") || ""
//   );
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [bio, setBio] = useState(localStorage.getItem("bio") || "");
//   const [pronouns, setPronouns] = useState(
//     localStorage.getItem("pronouns") || ""
//   );
//   const [confirmPhone, setConfirmPhone] = useState("");
//   const [email, setEmail] = useState(localStorage.getItem("email") || "");
//   const [actualUser, setActualUser] = useState([]);
//   const [hasAccount, setHasAccount] = useState(false);

//   //logging in credentials
//   const [loggingEmail, setLoggingEmail] = useState("");
//   const [loggingPassword, setLoggingPassword] = useState("");

//   const navigate = useNavigate();
//   //finish up button
//   const sendToServer = async (): Promise<void> => {
//     try {
//       const payload = {
//         //everything  i was loggin in the console
//         username,
//         firstname,
//         lastname,
//         phone,
//         birthDay,
//         password,
//         pronouns,
//         confirmPassword,
//         confirmPhone,
//         email,
//         bio,
//       };
//       const res = await API.post("/users/register", payload);
//       if (res.data.success) {
//         console.log("user registered succesfully: " + res.data.User);
//         // Store useful data in localStorage
//         localStorage.setItem("username", username);
//         localStorage.setItem("email", email);

//         // (Optional) If your backend sends a token:
//         // localStorage.setItem("token", res.data.token);
//         navigate("dashboard/home");
//       } else {
//         console.log("registration failed: " + res.data.message);
//       }
//     } catch (err: any) {
//       console.error(
//         "🔥 Error sending data:",
//         err.response?.data || err.message
//       );
//     }
//   };
//   //logging in the user
//   const login = async (): Promise<void> => {
//     try {
//       const payload = {
//         emailToServer: loggingEmail,
//         passwordToServer: loggingPassword,
//       };
//       console.log({ loggingEmail, loggingPassword });
//       const res = await API.post("/users/login", payload, {
//         withCredentials: true, //  important if you're using cookies/JWTs
//       });
//       if (res?.data?.success) {
//         console.log("Logged in successfully");
//         toast.success("Logged in successfully");
//         navigate("/dashboard/home");
//       } else {
//         toast.error(res?.data?.message || "Error occurred during login");
//       }
//     } catch (err: any) {
//       const errorMessage =
//         err.response?.data?.message || err.message || "Login failed";
//       console.error("Login error:", errorMessage);
//       toast.error(errorMessage);
//     }
//   };

//   //----END OF AUTHENTICATION DETAILS
//   //-----
//   //user-related functions
//   // 1) saving
//   const saveUser = (): void => {
//     localStorage.setItem("username", username);
//     console.log(username);
//   };
//   //2)deleting/removing
//   const deleteUser = (): void => {
//     localStorage.removeItem("username");
//     console.log("removed the user");
//   };
//   //saving the username again incase the value changes
//   useEffect(() => {
//     localStorage.setItem("username", username);
//   }, [username]);
//   //----VERY IMPORTANT 👇
//   //running whenever the component is mounting on the browser
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const res = await API.get("/post/allPosts");
//         setActualUser(res.data);
//         console.log(res.data.posts.length); // or setPosts(res.data)
//       } catch (err) {
//         console.error("Error fetching posts:", err);
//       }
//     };

//     fetchPosts();
//   }, []);

//   return (
//     <AppContext.Provider
//       value={{
//         username,
//         setUsername,
//         deleteUser,
//         saveUser,
//         firstname,
//         setFirstname,
//         lastname,
//         setLastname,
//         phone,
//         setPhone,
//         birthDay,
//         setBirthDay,
//         password,
//         setPassword,
//         pronouns,
//         setPronouns,
//         confirmPassword,
//         setConfirmPassword,
//         confirmPhone,
//         setConfirmPhone,
//         email,
//         setEmail,
//         bio,
//         setBio,
//         sendToServer,
//         actualUser,
//         setActualUser,
//         hasAccount,
//         setHasAccount,
//         login,
//         loggingEmail,
//         loggingPassword,
//         setLoggingEmail,
//         setLoggingPassword,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useApp1 = () => {
//   const ctx = useContext(AppContext);
//   if (!ctx) throw new Error("useApp must be used inside AppProvider");
//   return ctx;
// };

import { createContext, useState, useEffect, useContext } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";

//---------------------- TYPE DEFINITION ----------------------//
type AppContextType = {
  username: string;
  setUsername: (val: string) => void;
  saveUser: () => void;
  deleteUser: () => void;
  firstname: string;
  setFirstname: (val: string) => void;
  lastname: string;
  setLastname: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
  birthDay: string | any;
  setBirthDay: (val: string | any) => void;
  password: string;
  setPassword: (val: string) => void;
  confirmPassword: string;
  setConfirmPassword: (val: string) => void;
  bio: string;
  setBio: (val: string) => void;
  pronouns: string;
  setPronouns: (val: string) => void;
  confirmPhone: string;
  setConfirmPhone: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  sendToServer: () => void;
  login: () => void;
  actualUser: any;
  setActualUser: (val: any) => any;
  hasAccount: boolean;
  setHasAccount: (val: boolean) => any;
  loggingEmail: string;
  setLoggingEmail: (val: any) => any;
  loggingPassword: string;
  setLoggingPassword: (val: any) => any;
};

//---------------------- CREATE CONTEXT ----------------------//
const AppContext = createContext<AppContextType | undefined>(undefined);

//---------------------- PROVIDER ----------------------//
export const AppProvider = ({ children }: { children: ReactNode }) => {
  // all authentication details
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [firstname, setFirstname] = useState(
    localStorage.getItem("firstname") || ""
  );
  const [lastname, setLastname] = useState(
    localStorage.getItem("lastname") || ""
  );
  const [phone, setPhone] = useState(localStorage.getItem("phone") || "");
  // const [birthDay, setBirthDay] = useState(
  //   localStorage.getItem("birthDay") || ""
  // );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bio, setBio] = useState(localStorage.getItem("bio") || "");
  const [pronouns, setPronouns] = useState(
    localStorage.getItem("pronouns") || ""
  );
  const [confirmPhone, setConfirmPhone] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [actualUser, setActualUser] = useState<any>(null);
  const [hasAccount, setHasAccount] = useState(false);
  const [birthDay, setBirthDay] = useState<Date | null>(null);
  // login state
  const [loggingEmail, setLoggingEmail] = useState("");
  const [loggingPassword, setLoggingPassword] = useState("");

  const navigate = useNavigate();

  //---------------------- REGISTER ----------------------//
  const sendToServer = async (): Promise<void> => {
    try {
      const payload = {
        username,
        firstname,
        lastname,
        phone,
        birthDay,
        password,
        confirmPassword,
        pronouns,
        confirmPhone,
        email,
        bio,
      };

      const res = await API.post("/users/register", payload, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Account created successfully 🎉");

        // Save user info + token
        localStorage.setItem("username", res.data.user.username);
        localStorage.setItem("email", res.data.user.email);
        localStorage.setItem("authToken", res.data.token);

        // Redirect to dashboard
        navigate("/dashboard/home");
      } else {
        toast.error(res.data.message || "Registration failed");
      }
    } catch (err: any) {
      const msg =
        err.response?.data?.message || err.message || "Registration error";
      console.error(" Registration Error:", msg);
      toast.error(msg);
    }
  };

  //---------------------- LOGIN ----------------------//
  const login = async (): Promise<void> => {
    try {
      const payload = {
        emailToServer: loggingEmail,
        passwordToServer: loggingPassword,
      };

      console.log("Login payload:", payload);

      const res = await API.post("/users/login", payload, {
        withCredentials: true,
      });

      if (res?.data?.success) {
        toast.success("Logged in successfully 🔐");

        // Save user info + token correctly
        localStorage.setItem("email", res.data.user.email);
        localStorage.setItem("username", res.data.user.username);
        localStorage.setItem("authToken", res.data.token);

        setActualUser(res.data.user);
        navigate("/dashboard/home");
      } else {
        toast.error(res?.data?.message || "Login failed");
      }
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message || err.message || "Login failed";
      console.error("Login error:", errorMsg);
      toast.error(errorMsg);
    }
  };

  //---------------------- SAVE & DELETE USER ----------------------//
  const saveUser = (): void => {
    localStorage.setItem("username", username);
    console.log("Saved username:", username);
  };

  const deleteUser = (): void => {
    localStorage.removeItem("username");
    console.log("Removed username from localStorage");
  };

  //---------------------- SYNC USERNAME ----------------------//
  useEffect(() => {
    localStorage.setItem("username", username);
  }, [username]);

  //---------------------- FETCH POSTS ----------------------//
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/post/allPosts");
        setActualUser(res.data);
        console.log("Fetched posts:", res.data.posts?.length || 0);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, []);

  //---------------------- CONTEXT VALUE ----------------------//
  return (
    <AppContext.Provider
      value={{
        username,
        setUsername,
        saveUser,
        deleteUser,
        firstname,
        setFirstname,
        lastname,
        setLastname,
        phone,
        setPhone,
        birthDay,
        setBirthDay,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        bio,
        setBio,
        pronouns,
        setPronouns,
        confirmPhone,
        setConfirmPhone,
        email,
        setEmail,
        sendToServer,
        login,
        actualUser,
        setActualUser,
        hasAccount,
        setHasAccount,
        loggingEmail,
        setLoggingEmail,
        loggingPassword,
        setLoggingPassword,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

//---------------------- HOOK ----------------------//
export const useApp1 = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp1 must be used within an AppProvider");
  return ctx;
};
