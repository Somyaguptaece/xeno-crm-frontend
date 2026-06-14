import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Campaigns from "./pages/Campaigns";
import AudienceBuilder from "./pages/AudienceBuilder";
import CampaignGenerator from "./pages/CampaignGenerator";
import Analytics from "./pages/Analytics";
import ProtectedRoute from "./components/ProtectedRoute";
import AnalyticsAgent from "./pages/AnalyticsAgent";
import Agent from "./pages/Agent";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/*"
          element={

            <ProtectedRoute>

              <MainLayout>

                <Routes>

                  <Route
                    path="/"
                    element={
                      <Dashboard />
                    }
                  />

                  <Route
                    path="/customers"
                    element={
                      <Customers />
                    }
                  />

                  <Route
                    path="/campaigns"
                    element={
                      <Campaigns />
                    }
                  />

                  <Route
                    path="/audience"
                    element={
                      <AudienceBuilder />
                    }
                  />

                  <Route
                    path="/ai-campaign"
                    element={
                      <CampaignGenerator />
                    }
                  />

                  <Route
                    path="/analytics"
                    element={
                      <Analytics />
                    }
                  />

                  <Route
                    path="/agent"
                    element={
                      <Agent />
                    }
                  />

                  <Route
  path="/analytics-agent"
  element={
    <AnalyticsAgent />
  }
/>

                </Routes>



                

              </MainLayout>

            </ProtectedRoute>

          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;