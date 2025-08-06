import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Computer, Settings, Wrench, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente.",
    });
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full text-center space-y-8">
        <div className="flex justify-end mb-4">
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="hover:bg-destructive hover:text-destructive-foreground"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-tech-blue to-tech-purple bg-clip-text text-transparent">
            BuildPC Parts Manager
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Sistema completo de gestión de componentes para construcción de PCs
          </p>
          {user && (
            <p className="text-lg text-tech-blue font-medium">
              Bienvenido, {user.email}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/90 hover:scale-105">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-tech-blue/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-tech-blue/20 transition-colors">
                <Computer className="h-8 w-8 text-tech-blue" />
              </div>
              <CardTitle className="text-xl">Gestión de Componentes</CardTitle>
              <CardDescription>
                Administra tu inventario completo de componentes de PC
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/components')}
                className="w-full bg-tech-blue hover:bg-tech-blue/90 text-white"
              >
                <Settings className="h-4 w-4 mr-2" />
                Gestionar Componentes
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/90 hover:scale-105">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-tech-purple/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-tech-purple/20 transition-colors">
                <Wrench className="h-8 w-8 text-tech-purple" />
              </div>
              <CardTitle className="text-xl">Constructor de PCs</CardTitle>
              <CardDescription>
                Crea configuraciones personalizadas de PC
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline"
                className="w-full hover:bg-tech-purple hover:text-white transition-colors"
                disabled
              >
                Próximamente
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/90 hover:scale-105">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-tech-green/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-tech-green/20 transition-colors">
                <Computer className="h-8 w-8 text-tech-green" />
              </div>
              <CardTitle className="text-xl">Análisis de Precios</CardTitle>
              <CardDescription>
                Compara precios y encuentra las mejores ofertas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline"
                className="w-full hover:bg-tech-green hover:text-white transition-colors"
                disabled
              >
                Próximamente
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 p-8 bg-gradient-to-r from-tech-blue/5 to-tech-purple/5 rounded-xl border border-tech-blue/10">
          <h2 className="text-2xl font-semibold mb-4">¿Qué puedes hacer?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="space-y-2">
              <h3 className="font-medium text-tech-blue">✓ Agregar Componentes</h3>
              <p className="text-sm text-muted-foreground">Añade CPUs, GPUs, RAM, almacenamiento y más</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-tech-purple">✓ Editar Información</h3>
              <p className="text-sm text-muted-foreground">Actualiza especificaciones y precios fácilmente</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-tech-green">✓ Eliminar Componentes</h3>
              <p className="text-sm text-muted-foreground">Remueve elementos obsoletos del inventario</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-tech-orange">✓ Organizar por Categorías</h3>
              <p className="text-sm text-muted-foreground">Navega entre diferentes tipos de componentes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
