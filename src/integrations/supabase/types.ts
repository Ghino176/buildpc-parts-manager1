export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      build_components: {
        Row: {
          build_id: string
          component_brand: string
          component_category: string
          component_id: string
          component_image: string | null
          component_name: string
          component_price: number
          component_specs: Json | null
          created_at: string
          id: string
        }
        Insert: {
          build_id: string
          component_brand: string
          component_category: string
          component_id: string
          component_image?: string | null
          component_name: string
          component_price: number
          component_specs?: Json | null
          created_at?: string
          id?: string
        }
        Update: {
          build_id?: string
          component_brand?: string
          component_category?: string
          component_id?: string
          component_image?: string | null
          component_name?: string
          component_price?: number
          component_specs?: Json | null
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "build_components_build_id_fkey"
            columns: ["build_id"]
            isOneToOne: false
            referencedRelation: "pc_builds"
            referencedColumns: ["id"]
          },
        ]
      }
      cases: {
        Row: {
          brand: string
          created_at: string
          description: string | null
          dimensions: string | null
          form_factor: string
          id: string
          image: string | null
          motherboard_support: string
          name: string
          price: number
          updated_at: string
        }
        Insert: {
          brand: string
          created_at?: string
          description?: string | null
          dimensions?: string | null
          form_factor: string
          id?: string
          image?: string | null
          motherboard_support: string
          name: string
          price: number
          updated_at?: string
        }
        Update: {
          brand?: string
          created_at?: string
          description?: string | null
          dimensions?: string | null
          form_factor?: string
          id?: string
          image?: string | null
          motherboard_support?: string
          name?: string
          price?: number
          updated_at?: string
        }
        Relationships: []
      }
      cooling: {
        Row: {
          brand: string
          created_at: string
          description: string | null
          fan_size: string | null
          height: string | null
          id: string
          image: string | null
          name: string
          price: number
          radiator_size: string | null
          type: string
          updated_at: string
        }
        Insert: {
          brand: string
          created_at?: string
          description?: string | null
          fan_size?: string | null
          height?: string | null
          id?: string
          image?: string | null
          name: string
          price: number
          radiator_size?: string | null
          type: string
          updated_at?: string
        }
        Update: {
          brand?: string
          created_at?: string
          description?: string | null
          fan_size?: string | null
          height?: string | null
          id?: string
          image?: string | null
          name?: string
          price?: number
          radiator_size?: string | null
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      cpus: {
        Row: {
          base_clock: string
          boost_clock: string
          brand: string
          cores: number
          created_at: string
          description: string | null
          id: string
          image: string | null
          name: string
          price: number
          socket: string
          tdp: string
          threads: number
          updated_at: string
        }
        Insert: {
          base_clock: string
          boost_clock: string
          brand: string
          cores: number
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          name: string
          price: number
          socket: string
          tdp: string
          threads: number
          updated_at?: string
        }
        Update: {
          base_clock?: string
          boost_clock?: string
          brand?: string
          cores?: number
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          name?: string
          price?: number
          socket?: string
          tdp?: string
          threads?: number
          updated_at?: string
        }
        Relationships: []
      }
      graphics_cards: {
        Row: {
          boost_clock: string
          brand: string
          core_clock: string
          created_at: string
          description: string | null
          id: string
          image: string | null
          memory: string
          name: string
          price: number
          tdp: string
          updated_at: string
        }
        Insert: {
          boost_clock: string
          brand: string
          core_clock: string
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          memory: string
          name: string
          price: number
          tdp: string
          updated_at?: string
        }
        Update: {
          boost_clock?: string
          brand?: string
          core_clock?: string
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          memory?: string
          name?: string
          price?: number
          tdp?: string
          updated_at?: string
        }
        Relationships: []
      }
      motherboards: {
        Row: {
          brand: string
          chipset: string
          created_at: string
          description: string | null
          form_factor: string
          id: string
          image: string | null
          max_memory: string
          memory_slots: number
          name: string
          price: number
          socket: string
          updated_at: string
        }
        Insert: {
          brand: string
          chipset: string
          created_at?: string
          description?: string | null
          form_factor: string
          id?: string
          image?: string | null
          max_memory: string
          memory_slots: number
          name: string
          price: number
          socket: string
          updated_at?: string
        }
        Update: {
          brand?: string
          chipset?: string
          created_at?: string
          description?: string | null
          form_factor?: string
          id?: string
          image?: string | null
          max_memory?: string
          memory_slots?: number
          name?: string
          price?: number
          socket?: string
          updated_at?: string
        }
        Relationships: []
      }
      pc_builds: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          total_price: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          total_price?: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          total_price?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      power_supplies: {
        Row: {
          brand: string
          created_at: string
          description: string | null
          efficiency: string
          id: string
          image: string | null
          modular: string
          name: string
          price: number
          updated_at: string
          wattage: string
        }
        Insert: {
          brand: string
          created_at?: string
          description?: string | null
          efficiency: string
          id?: string
          image?: string | null
          modular: string
          name: string
          price: number
          updated_at?: string
          wattage: string
        }
        Update: {
          brand?: string
          created_at?: string
          description?: string | null
          efficiency?: string
          id?: string
          image?: string | null
          modular?: string
          name?: string
          price?: number
          updated_at?: string
          wattage?: string
        }
        Relationships: []
      }
      ram: {
        Row: {
          brand: string
          capacity: string
          cas_latency: string | null
          created_at: string
          description: string | null
          id: string
          image: string | null
          name: string
          price: number
          speed: string
          type: string
          updated_at: string
        }
        Insert: {
          brand: string
          capacity: string
          cas_latency?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          name: string
          price: number
          speed: string
          type: string
          updated_at?: string
        }
        Update: {
          brand?: string
          capacity?: string
          cas_latency?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          name?: string
          price?: number
          speed?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      storage: {
        Row: {
          brand: string
          cache_size: string | null
          capacity: string
          created_at: string
          description: string | null
          id: string
          image: string | null
          interface: string
          name: string
          price: number
          read_speed: string | null
          rpm: number | null
          type: string
          updated_at: string
          write_speed: string | null
        }
        Insert: {
          brand: string
          cache_size?: string | null
          capacity: string
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          interface: string
          name: string
          price: number
          read_speed?: string | null
          rpm?: number | null
          type: string
          updated_at?: string
          write_speed?: string | null
        }
        Update: {
          brand?: string
          cache_size?: string | null
          capacity?: string
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          interface?: string
          name?: string
          price?: number
          read_speed?: string | null
          rpm?: number | null
          type?: string
          updated_at?: string
          write_speed?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
