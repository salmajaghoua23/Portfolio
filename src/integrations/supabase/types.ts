export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      certifications: {
        Row: {
          created_at: string
          description_en: string | null
          description_fr: string | null
          id: string
          name_en: string
          name_fr: string | null
          org: string | null
          sort_order: number
          year: string | null
        }
        Insert: {
          created_at?: string
          description_en?: string | null
          description_fr?: string | null
          id?: string
          name_en: string
          name_fr?: string | null
          org?: string | null
          sort_order?: number
          year?: string | null
        }
        Update: {
          created_at?: string
          description_en?: string | null
          description_fr?: string | null
          id?: string
          name_en?: string
          name_fr?: string | null
          org?: string | null
          sort_order?: number
          year?: string | null
        }
        Relationships: []
      }
      cvs: {
        Row: {
          created_at: string
          file_url: string
          filename: string | null
          id: string
          is_default: boolean
          label_en: string
          label_fr: string | null
          sort_order: number
        }
        Insert: {
          created_at?: string
          file_url: string
          filename?: string | null
          id?: string
          is_default?: boolean
          label_en: string
          label_fr?: string | null
          sort_order?: number
        }
        Update: {
          created_at?: string
          file_url?: string
          filename?: string | null
          id?: string
          is_default?: boolean
          label_en?: string
          label_fr?: string | null
          sort_order?: number
        }
        Relationships: []
      }
      education: {
        Row: {
          created_at: string
          degree_en: string
          degree_fr: string | null
          id: string
          location: string | null
          period_en: string | null
          period_fr: string | null
          school_en: string
          school_fr: string | null
          sort_order: number
        }
        Insert: {
          created_at?: string
          degree_en: string
          degree_fr?: string | null
          id?: string
          location?: string | null
          period_en?: string | null
          period_fr?: string | null
          school_en: string
          school_fr?: string | null
          sort_order?: number
        }
        Update: {
          created_at?: string
          degree_en?: string
          degree_fr?: string | null
          id?: string
          location?: string | null
          period_en?: string | null
          period_fr?: string | null
          school_en?: string
          school_fr?: string | null
          sort_order?: number
        }
        Relationships: []
      }
      experiences: {
        Row: {
          company: string | null
          context_en: string | null
          context_fr: string | null
          created_at: string
          details_en: string | null
          details_fr: string | null
          id: string
          location: string | null
          mission_en: string | null
          mission_fr: string | null
          period_en: string | null
          period_fr: string | null
          skills: string[]
          sort_order: number
          title_en: string
          title_fr: string | null
        }
        Insert: {
          company?: string | null
          context_en?: string | null
          context_fr?: string | null
          created_at?: string
          details_en?: string | null
          details_fr?: string | null
          id?: string
          location?: string | null
          mission_en?: string | null
          mission_fr?: string | null
          period_en?: string | null
          period_fr?: string | null
          skills?: string[]
          sort_order?: number
          title_en: string
          title_fr?: string | null
        }
        Update: {
          company?: string | null
          context_en?: string | null
          context_fr?: string | null
          created_at?: string
          details_en?: string | null
          details_fr?: string | null
          id?: string
          location?: string | null
          mission_en?: string | null
          mission_fr?: string | null
          period_en?: string | null
          period_fr?: string | null
          skills?: string[]
          sort_order?: number
          title_en?: string
          title_fr?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          created_at: string
          email: string
          id: string
          is_read: boolean
          message: string
          name: string
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_read?: boolean
          message: string
          name: string
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_read?: boolean
          message?: string
          name?: string
          subject?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          architecture_en: string | null
          architecture_fr: string | null
          context_en: string | null
          context_fr: string | null
          created_at: string
          demo_url: string | null
          featured: boolean
          features_en: string | null
          features_fr: string | null
          github_url: string | null
          icon: string | null
          id: string
          image_url: string | null
          is_recent: boolean
          results_en: string | null
          results_fr: string | null
          role_en: string | null
          role_fr: string | null
          sort_order: number
          stack: string[]
          summary_en: string | null
          summary_fr: string | null
          tags: string[]
          title_en: string
          title_fr: string | null
          year: string | null
        }
        Insert: {
          architecture_en?: string | null
          architecture_fr?: string | null
          context_en?: string | null
          context_fr?: string | null
          created_at?: string
          demo_url?: string | null
          featured?: boolean
          features_en?: string | null
          features_fr?: string | null
          github_url?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          is_recent?: boolean
          results_en?: string | null
          results_fr?: string | null
          role_en?: string | null
          role_fr?: string | null
          sort_order?: number
          stack?: string[]
          summary_en?: string | null
          summary_fr?: string | null
          tags?: string[]
          title_en: string
          title_fr?: string | null
          year?: string | null
        }
        Update: {
          architecture_en?: string | null
          architecture_fr?: string | null
          context_en?: string | null
          context_fr?: string | null
          created_at?: string
          demo_url?: string | null
          featured?: boolean
          features_en?: string | null
          features_fr?: string | null
          github_url?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          is_recent?: boolean
          results_en?: string | null
          results_fr?: string | null
          role_en?: string | null
          role_fr?: string | null
          sort_order?: number
          stack?: string[]
          summary_en?: string | null
          summary_fr?: string | null
          tags?: string[]
          title_en?: string
          title_fr?: string | null
          year?: string | null
        }
        Relationships: []
      }
      settings: {
        Row: {
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string
          value: Json
        }
        Update: {
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      skills: {
        Row: {
          group_key: string
          id: string
          name: string
          sort_order: number
        }
        Insert: {
          group_key: string
          id?: string
          name: string
          sort_order?: number
        }
        Update: {
          group_key?: string
          id?: string
          name?: string
          sort_order?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin"],
    },
  },
} as const
