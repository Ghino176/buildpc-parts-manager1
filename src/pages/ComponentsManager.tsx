import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComponentForm } from "@/components/ComponentForm";
import { ComponentList } from "@/components/ComponentList";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Plus, Settings, Trash, Edit } from "lucide-react";

export type ComponentType = 'cpus' | 'graphics_cards' | 'motherboards' | 'ram' | 'storage' | 'power_supplies' | 'cooling' | 'cases';

const ComponentsManager = () => {
  const [activeTab, setActiveTab] = useState<ComponentType>('cpus');
  const [showForm, setShowForm] = useState(false);
  const [editingComponent, setEditingComponent] = useState<any>(null);
  const [components, setComponents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const componentTypes = [
    { value: 'cpus', label: 'CPUs', icon: '🖥️' },
    { value: 'graphics_cards', label: 'Tarjetas Gráficas', icon: '🎮' },
    { value: 'motherboards', label: 'Tarjetas Madre', icon: '🔧' },
    { value: 'ram', label: 'Memoria RAM', icon: '💾' },
    { value: 'storage', label: 'Almacenamiento', icon: '💿' },
    { value: 'power_supplies', label: 'Fuentes de Poder', icon: '⚡' },
    { value: 'cooling', label: 'Refrigeración', icon: '❄️' },
    { value: 'cases', label: 'Gabinetes', icon: '📦' }
  ];

  const fetchComponents = async (type: ComponentType) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from(type)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComponents(data || []);
    } catch (error) {
      console.error('Error fetching components:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los componentes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComponents(activeTab);
  }, [activeTab]);

  const handleTabChange = (value: string) => {
    setActiveTab(value as ComponentType);
    setShowForm(false);
    setEditingComponent(null);
  };

  const handleCreateComponent = () => {
    setEditingComponent(null);
    setShowForm(true);
  };

  const handleEditComponent = (component: any) => {
    setEditingComponent(component);
    setShowForm(true);
  };

  const handleDeleteComponent = async (id: string) => {
    try {
      const { error } = await supabase
        .from(activeTab)
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "Componente eliminado correctamente",
      });

      fetchComponents(activeTab);
    } catch (error) {
      console.error('Error deleting component:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el componente",
        variant: "destructive",
      });
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingComponent(null);
    fetchComponents(activeTab);
  };

  const currentType = componentTypes.find(type => type.value === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-6">
      <div className="max-w-7xl mx-auto">
        <Card className="mb-8 shadow-lg border-0 bg-gradient-to-r from-card to-card/90">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-tech-blue to-tech-purple bg-clip-text text-transparent">
              Gestor de Componentes PC
            </CardTitle>
            <CardDescription className="text-lg">
              Administra todos los componentes de tu inventario de PC
            </CardDescription>
          </CardHeader>
        </Card>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <div className="overflow-x-auto">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 h-auto p-2 bg-card/50 backdrop-blur-sm">
              {componentTypes.map((type) => (
                <TabsTrigger
                  key={type.value}
                  value={type.value}
                  className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <span className="text-2xl">{type.icon}</span>
                  <span className="text-xs font-medium">{type.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {componentTypes.map((type) => (
            <TabsContent key={type.value} value={type.value} className="space-y-6">
              <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{type.icon}</span>
                    <div>
                      <CardTitle className="text-2xl">{type.label}</CardTitle>
                      <CardDescription>
                        Gestiona los componentes de {type.label.toLowerCase()}
                      </CardDescription>
                    </div>
                  </div>
                  <Button
                    onClick={handleCreateComponent}
                    className="bg-tech-blue hover:bg-tech-blue/90 text-white shadow-lg"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar {type.label}
                  </Button>
                </CardHeader>
                <CardContent>
                  {showForm && (
                    <div className="mb-6">
                      <ComponentForm
                        type={activeTab}
                        component={editingComponent}
                        onSuccess={handleFormSuccess}
                        onCancel={() => {
                          setShowForm(false);
                          setEditingComponent(null);
                        }}
                      />
                    </div>
                  )}
                  <ComponentList
                    components={components}
                    type={activeTab}
                    loading={loading}
                    onEdit={handleEditComponent}
                    onDelete={handleDeleteComponent}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default ComponentsManager;