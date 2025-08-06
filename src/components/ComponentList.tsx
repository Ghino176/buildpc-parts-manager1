import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ComponentType } from "@/pages/ComponentsManager";
import { Edit, Trash2, ImageIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ComponentListProps {
  components: any[];
  type: ComponentType;
  loading: boolean;
  onEdit: (component: any) => void;
  onDelete: (id: string) => void;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(price);
};

const getDisplayFields = (component: any, type: ComponentType) => {
  const common = [
    { label: 'Marca', value: component.brand },
    { label: 'Precio', value: formatPrice(component.price) }
  ];

  const specific: Record<ComponentType, any[]> = {
    cpus: [
      { label: 'Socket', value: component.socket },
      { label: 'Núcleos/Hilos', value: `${component.cores}/${component.threads}` },
      { label: 'Frecuencia Base', value: component.base_clock },
      { label: 'TDP', value: component.tdp }
    ],
    graphics_cards: [
      { label: 'Memoria', value: component.memory },
      { label: 'Frecuencia Núcleo', value: component.core_clock },
      { label: 'TDP', value: component.tdp }
    ],
    motherboards: [
      { label: 'Socket', value: component.socket },
      { label: 'Chipset', value: component.chipset },
      { label: 'Factor de Forma', value: component.form_factor },
      { label: 'Memoria Máxima', value: component.max_memory }
    ],
    ram: [
      { label: 'Capacidad', value: component.capacity },
      { label: 'Tipo', value: component.type },
      { label: 'Velocidad', value: component.speed },
      { label: 'Latencia CAS', value: component.cas_latency || 'N/A' }
    ],
    storage: [
      { label: 'Capacidad', value: component.capacity },
      { label: 'Tipo', value: component.type },
      { label: 'Interfaz', value: component.interface },
      { label: 'Velocidad Lectura', value: component.read_speed || 'N/A' }
    ],
    power_supplies: [
      { label: 'Potencia', value: component.wattage },
      { label: 'Eficiencia', value: component.efficiency },
      { label: 'Modular', value: component.modular }
    ],
    cooling: [
      { label: 'Tipo', value: component.type },
      { label: 'Tamaño Radiador', value: component.radiator_size || 'N/A' },
      { label: 'Tamaño Ventilador', value: component.fan_size || 'N/A' }
    ],
    cases: [
      { label: 'Factor de Forma', value: component.form_factor },
      { label: 'Soporte MB', value: component.motherboard_support },
      { label: 'Dimensiones', value: component.dimensions || 'N/A' }
    ]
  };

  return [...common, ...specific[type]];
};

export const ComponentList = ({ components, type, loading, onEdit, onDelete }: ComponentListProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-muted rounded w-1/2 mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded"></div>
                <div className="h-3 bg-muted rounded w-5/6"></div>
                <div className="h-3 bg-muted rounded w-4/6"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (components.length === 0) {
    return (
      <Card className="text-center py-12 border-dashed border-2">
        <CardContent>
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-lg font-semibold mb-2">No hay componentes</h3>
          <p className="text-muted-foreground">
            Comienza agregando tu primer componente de este tipo.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {components.map((component) => {
        const displayFields = getDisplayFields(component, type);
        
        return (
          <Card key={component.id} className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/90">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1 line-clamp-2">
                    {component.name}
                  </h3>
                  <Badge variant="secondary" className="mb-2">
                    {component.brand}
                  </Badge>
                </div>
                
                {component.image && (
                  <div className="ml-4 w-16 h-16 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                      src={component.image}
                      alt={component.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = '<div class="text-muted-foreground"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>';
                        }
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2 mb-4">
                {displayFields.slice(0, 4).map((field, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{field.label}:</span>
                    <span className="font-medium">{field.value}</span>
                  </div>
                ))}
              </div>

              {component.description && (
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {component.description}
                </p>
              )}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(component)}
                  className="flex-1 hover:bg-tech-blue hover:text-white transition-colors"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Editar
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Eliminar
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta acción no se puede deshacer. Se eliminará permanentemente
                        el componente "{component.name}" de la base de datos.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onDelete(component.id)}
                        className="bg-destructive hover:bg-destructive/90"
                      >
                        Eliminar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};