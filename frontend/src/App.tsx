import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./lib/providers/AuthProvider";
import { ThemeProvider } from "./lib/providers/ThemeProvider";
import { FarcasterProvider } from "./lib/providers/FarcasterProvider";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import AllowlistAdmin from "./pages/AllowlistAdmin";
import NotFound from "./pages/NotFound";
import { RouteSync } from "./components/RouteSync";
import { ThemeSync } from "./components/ThemeSync";

const basename = "/";

const App = () => (
    <ThemeProvider defaultTheme="system" storageKey="app-theme">
        <AuthProvider>
            <FarcasterProvider>
                <TooltipProvider>
                    <Toaster />
                    <Sonner />
                    <BrowserRouter basename={basename}>
                        <Layout appName="" showHeader>
                        	<RouteSync />
                        	<ThemeSync />
                            <Routes>
                                <Route path="/" element={<Index />} />
                                <Route path="/admin" element={<AllowlistAdmin />} />
                                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </Layout>
                    </BrowserRouter>
                </TooltipProvider>
            </FarcasterProvider>
        </AuthProvider>
    </ThemeProvider>
);

export default App;
