import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

import NotFound from "./pages/NotFound";
import { BundleCreator } from "./cms/BundleCreator";
import EmitterPackDetails from "./pages/EmitterPackDetails";
import AddProject from "./cms/AddProject";
import { FeaturePacks } from "./pages/FeaturePacks";
import { EditPack } from "./cms/EditPack";
import { AllPacks } from "./cms/AllPacks";
import { ApiPack } from "./pages/ApiPack";
import CoinOptions from "./pages/CoinOptions";
import CoinRegisterForm from "./pages/CoinRegisterForm";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cms" element={<BundleCreator />} />
          <Route path="/projectcms" element={<AddProject />} />
          <Route path="/emitter-pack" element={<FeaturePacks />} />
          <Route path="/emitter-pack/:id" element={<EmitterPackDetails />} />
          <Route path="/all-packs" element={<AllPacks />} />
          <Route path="/edit-pack/:id" element={<EditPack />} />
          <Route path="/api-demo" element={<ApiPack />} />
          <Route path="/coinoption" element={<CoinOptions />} />
          <Route path="/coinregister" element={<CoinRegisterForm />} />

            <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
