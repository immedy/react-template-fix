import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";

import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import RefAmbulan from "./pages/Reference/RefAmbulan";
import AddRefAmbulan from "./pages/Reference/Detail/AddRefAmbulan";
import RefJenazah from "./pages/Reference/RefJenazah";
import AddRefJenazah from "./pages/Reference/Detail/AddRefJenazah";

import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import useAuth from "./hooks/useAuth";
import Pasien from "./pages/Dashboard/detail/Pasien";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Auth Layout - Tidak perlu dilindungi */}
          <Route path="/signin" element={<SignIn />} />

          {/* Semua route yang dilindungi */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index path="/" element={<Home />} />
            <Route index path="/dashboard/pasien" element={<Pasien/>} />
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
            <Route path="/referensi-ambulan" element={<RefAmbulan/>} />
            <Route path="/referensi-ambulan/addreferensiambulan" element={<AddRefAmbulan/>} />
            <Route path="/referensi-jenazah/addreferensijenazah" element={<AddRefJenazah/>}/>

            <Route path="/referensi-jenazah" element={<RefJenazah/>}/>
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
