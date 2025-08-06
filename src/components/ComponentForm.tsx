import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { ComponentType } from "@/pages/ComponentsManager";
import { X, Save } from "lucide-react";

interface ComponentFormProps {
  type: ComponentType;
  component?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

const getFieldsForType = (type: ComponentType) => {
  const commonFields = [
    { name: 'name', label: 'Nombre', type: 'text', required: true },
    { name: 'brand', label: 'Marca', type: 'text', required: true },
    { name: 'price', label: 'Precio', type: 'number', required: true },
    { name: 'image', label: 'URL de Imagen', type: 'url' },
    { name: 'description', label: 'Descripción', type: 'textarea' }
  ];

  const specificFields: Record<ComponentType, any[]> = {
    cpus: [
      { name: 'socket', label: 'Socket', type: 'text', required: true },
      { name: 'cores', label: 'Núcleos', type: 'number', required: true },
      { name: 'threads', label: 'Hilos', type: 'number', required: true },
      { name: 'base_clock', label: 'Frecuencia Base', type: 'text', required: true },
      { name: 'boost_clock', label: 'Frecuencia Boost', type: 'text', required: true },
      { name: 'tdp', label: 'TDP', type: 'text', required: true }
    ],
    graphics_cards: [
      { name: 'memory', label: 'Memoria', type: 'text', required: true },
      { name: 'core_clock', label: 'Frecuencia de Núcleo', type: 'text', required: true },
      { name: 'boost_clock', label: 'Frecuencia Boost', type: 'text', required: true },
      { name: 'tdp', label: 'TDP', type: 'text', required: true }
    ],
    motherboards: [
      { name: 'socket', label: 'Socket', type: 'text', required: true },
      { name: 'chipset', label: 'Chipset', type: 'text', required: true },
      { name: 'form_factor', label: 'Factor de Forma', type: 'select', required: true, options: ['ATX', 'Micro-ATX', 'Mini-ITX', 'E-ATX'] },
      { name: 'max_memory', label: 'Memoria Máxima', type: 'text', required: true },
      { name: 'memory_slots', label: 'Slots de Memoria', type: 'number', required: true }
    ],
    ram: [
      { name: 'capacity', label: 'Capacidad', type: 'text', required: true },
      { name: 'type', label: 'Tipo', type: 'select', required: true, options: ['DDR4', 'DDR5'] },
      { name: 'speed', label: 'Velocidad', type: 'text', required: true },
      { name: 'cas_latency', label: 'Latencia CAS', type: 'text' }
    ],
    storage: [
      { name: 'capacity', label: 'Capacidad', type: 'text', required: true },
      { name: 'type', label: 'Tipo', type: 'select', required: true, options: ['SSD', 'HDD', 'NVMe'] },
      { name: 'interface', label: 'Interfaz', type: 'text', required: true },
      { name: 'read_speed', label: 'Velocidad de Lectura', type: 'text' },
      { name: 'write_speed', label: 'Velocidad de Escritura', type: 'text' },
      { name: 'cache_size', label: 'Tamaño de Caché', type: 'text' },
      { name: 'rpm', label: 'RPM', type: 'number' }
    ],
    power_supplies: [
      { name: 'wattage', label: 'Potencia', type: 'text', required: true },
      { name: 'efficiency', label: 'Eficiencia', type: 'select', required: true, options: ['80+', '80+ Bronze', '80+ Silver', '80+ Gold', '80+ Platinum', '80+ Titanium'] },
      { name: 'modular', label: 'Modular', type: 'select', required: true, options: ['Fully Modular', 'Semi-Modular', 'Non-Modular'] }
    ],
    cooling: [
      { name: 'type', label: 'Tipo', type: 'select', required: true, options: ['Air Cooler', 'AIO Liquid', 'Custom Loop'] },
      { name: 'radiator_size', label: 'Tamaño del Radiador', type: 'text' },
      { name: 'fan_size', label: 'Tamaño del Ventilador', type: 'text' },
      { name: 'height', label: 'Altura', type: 'text' }
    ],
    cases: [
      { name: 'form_factor', label: 'Factor de Forma', type: 'select', required: true, options: ['Full Tower', 'Mid Tower', 'Mini Tower', 'Mini ITX'] },
      { name: 'motherboard_support', label: 'Soporte de Tarjeta Madre', type: 'text', required: true },
      { name: 'dimensions', label: 'Dimensiones', type: 'text' }
    ]
  };

  return [...specificFields[type], ...commonFields];
};

export const ComponentForm = ({ type, component, onSuccess, onCancel }: ComponentFormProps) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);

  const fields = getFieldsForType(type);

  useEffect(() => {
    if (component) {
      setFormData(component);
    } else {
      setFormData({});
    }
  }, [component]);

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      const requiredFields = fields.filter(field => field.required);
      for (const field of requiredFields) {
        if (!formData[field.name]) {
          throw new Error(`El campo ${field.label} es requerido`);
        }
      }

      // Prepare data for submission
      const submitData = { ...formData };
      
      // Convert numeric fields
      if (submitData.price) submitData.price = parseFloat(submitData.price);
      if (submitData.cores) submitData.cores = parseInt(submitData.cores);
      if (submitData.threads) submitData.threads = parseInt(submitData.threads);
      if (submitData.memory_slots) submitData.memory_slots = parseInt(submitData.memory_slots);
      if (submitData.rpm) submitData.rpm = parseInt(submitData.rpm);

      if (component) {
        // Update existing component
        const { error } = await supabase
          .from(type)
          .update(submitData)
          .eq('id', component.id);

        if (error) throw error;

        toast({
          title: "Éxito",
          description: "Componente actualizado correctamente",
        });
      } else {
        // Create new component
        const { error } = await supabase
          .from(type as any)
          .insert(submitData as any);

        if (error) throw error;

        toast({
          title: "Éxito",
          description: "Componente creado correctamente",
        });
      }

      onSuccess();
    } catch (error: any) {
      console.error('Error saving component:', error);
      toast({
        title: "Error",
        description: error.message || "No se pudo guardar el componente",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderField = (field: any) => {
    const value = formData[field.name] || '';

    if (field.type === 'textarea') {
      return (
        <Textarea
          id={field.name}
          value={value}
          onChange={(e) => handleInputChange(field.name, e.target.value)}
          placeholder={`Ingresa ${field.label.toLowerCase()}`}
          className="min-h-[100px]"
        />
      );
    }

    if (field.type === 'select' && field.options) {
      return (
        <Select
          value={value}
          onValueChange={(selectedValue) => handleInputChange(field.name, selectedValue)}
        >
          <SelectTrigger>
            <SelectValue placeholder={`Selecciona ${field.label.toLowerCase()}`} />
          </SelectTrigger>
          <SelectContent>
            {field.options.map((option: string) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    return (
      <Input
        id={field.name}
        type={field.type}
        value={value}
        onChange={(e) => handleInputChange(field.name, e.target.value)}
        placeholder={`Ingresa ${field.label.toLowerCase()}`}
        required={field.required}
        step={field.type === 'number' ? '0.01' : undefined}
      />
    );
  };

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/90">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">
          {component ? 'Editar Componente' : 'Agregar Nuevo Componente'}
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name} className="text-sm font-medium">
                {field.label} {field.required && <span className="text-destructive">*</span>}
              </Label>
              {renderField(field)}
            </div>
          ))}
          
          <div className="md:col-span-2 flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-tech-green hover:bg-tech-green/90 text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Guardando...' : component ? 'Actualizar' : 'Crear'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};