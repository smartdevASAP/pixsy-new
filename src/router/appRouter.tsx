// // import { Routes, Route } from "react-router-dom";
// // import Layout from "../dashboard/layout";
// // import Login from "../admin/auth/login";
// // import Main from "../admin/components/main";

// // export default function AppRouter() {
// //   return (
// //     <Routes>
// //       {/* Everything under the dashboard layout */}
// //       <Route path="/dashboard/*" element={<Layout />} />
// //       <Route path="/admin/*" element={<Login />} />
// //       <Route path="/panel/*" element={<Main />} />
// //     </Routes>
// //   );
// // }

// import { Routes, Route } from "react-router-dom";
// import Layout from "../dashboard/layout";
// import Login from "../admin/auth/login";
// import Main from "../admin/components/main";

// export default function AppRouter() {
//   return (
//     <Routes>
//       {/* Dashboard routes */}
//       <Route path="/dashboard/*" element={<Layout />} />

//       {/* Admin routes */}
//       <Route path="/admin/*" element={<Login />} />

//       {/* Panel routes */}
//       <Route path="/panel/*" element={<Main />} />
//     </Routes>
//   );
// }

// IT WAS WORKING 👇

// import { Routes, Route } from "react-router-dom";
// import Login from "../authentication/login";
// import Main from "../admin/components/main";
// import Layout from "../dashboard/layout";
// import ProtectedRoute from "./protectedRoutes";

// function AppRouter() {
//   return (
//     <Routes>
//       {/* Public route unprotected */}
//       <Route path="/" element={<Login />} />

//       {/* Protected route */}
//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <Route path="/dashboard/*" element={<Layout />} />
//             {/* Admin routes */}
//             <Route path="/admin/*" element={<Login />} />
//             {/* Panel routes */}
//             <Route path="/panel/*" element={<Main />} />
//           </ProtectedRoute>
//         }
//       />
//     </Routes>
//   );
// }

// export default AppRouter;

import { Routes, Route } from "react-router-dom";
import Login from "../authentication/login";
import Main from "../admin/components/main";
import Layout from "../dashboard/layout";
import LoginAdmin from "../admin/auth/login";
import ProtectedRoute from "./protectedRoutes";

function AppRouter() {
  return (
    <Routes>
      {/* Public route (unprotected) */}
      <Route path="/" element={<Login />} />

      {/* Protected routes wrapper */}
      <Route element={<ProtectedRoute />}>
        {/* Dashboard */}
        <Route path="/dashboard/*" element={<Layout />} />
        {/* Admin */}
        <Route path="/admin/*" element={<LoginAdmin />} />
        {/* Panel (optional if different) */}
        <Route path="/panel/*" element={<Main />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
