import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./hooks/useAuth"; // Asegúrate de exportar useAuth
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import ComponentsManager from "./pages/ComponentsManager";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Componente ProtectedRoute actualizado
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/auth" replace />;
  }
  
  return children;
};

// Componente para redirección inicial
const InitialRedirect = () => {
  const { currentUser } = useAuth();
  
  if (currentUser) {
    return <Navigate to="/" replace />;
  }
  
  return <Navigate to="/auth" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Redirección inicial */}
            <Route path="/" element={<InitialRedirect />} />
            
            {/* Ruta de autenticación */}
            <Route path="/auth" element={<Auth />} />
            
            {/* Rutas protegidas */}
            <Route path="/dashboard" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="/components" element={<ProtectedRoute><ComponentsManager /></ProtectedRoute>} />
            
            {/* Manejo de rutas no encontradas */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
