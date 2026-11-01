export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      certifications: {
        Row: {
          created_at: string
          id: string
          kind: string
          name_en: string
          name_fr: string
          organization: string | null
          sort_order: number
          year: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          kind?: string
          name_en: string
          name_fr: string
          organization?: string | null
          sort_order?: number
          year?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          kind?: string
          name_en?: string
          name_fr?: string
          organization?: string | null
          sort_order?: number
          year?: string | null
        }
        Relationships: []
      }
      cvs: {
        Row: {
          created_at: string
          file_name: string | null
          file_url: string
          id: string
          label_en: string
          label_fr: string
          language: string
          sort_order: number
          tags: string[]
        }
        Insert: {
          created_at?: string
          file_name?: string | null
          file_url: string
          id?: string
          label_en: string
          label_fr: string
          language: string
          sort_order?: number
          tags?: string[]
        }
        Update: {
          created_at?: string
          file_name?: string | null
          file_url?: string
          id?: string
          label_en?: string
          label_fr?: string
          language?: string
          sort_order?: number
          tags?: string[]
        }
        Relationships: []
      }
      education: {
        Row: {
          created_at: string
          degree_en: string
          degree_fr: string
          id: string
          period_en: string | null
          period_fr: string | null
          school_en: string
          school_fr: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          degree_en: string
          degree_fr: string
          id?: string
          period_en?: string | null
          period_fr?: string | null
          school_en: string
          school_fr: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          degree_en?: string
          degree_fr?: string
          id?: string
          period_en?: string | null
          period_fr?: string | null
          school_en?: string
          school_fr?: string
          sort_order?: number
        }
        Relationships: []
      }
      experiences: {
        Row: {
          achievements_en: string | null
          achievements_fr: string | null
          company: string
          context_en: string | null
          context_fr: string | null
          created_at: string
          id: string
          location_en: string | null
          location_fr: string | null
          mission_en: string | null
          mission_fr: string | null
          period_en: string | null
          period_fr: string | null
          role_en: string
          role_fr: string
          skills: string[]
          sort_order: number
        }
        Insert: {
          achievements_en?: string | null
          achievements_fr?: string | null
          company: string
          context_en?: string | null
          context_fr?: string | null
          created_at?: string
          id?: string
          location_en?: string | null
          location_fr?: string | null
          mission_en?: string | null
          mission_fr?: string | null
          period_en?: string | null
          period_fr?: string | null
          role_en: string
          role_fr: string
          skills?: string[]
          sort_order?: number
        }
        Update: {
          achievements_en?: string | null
          achievements_fr?: string | null
          company?: string
          context_en?: string | null
          context_fr?: string | null
          created_at?: string
          id?: string
          location_en?: string | null
          location_fr?: string | null
          mission_en?: string | null
          mission_fr?: string | null
          period_en?: string | null
          period_fr?: string | null
          role_en?: string
          role_fr?: string
          skills?: string[]
          sort_order?: number
        }
        Relationships: []
      }
      messages: {
        Row: {
          created_at: string
          email: string
          email_sent_at: string | null
          id: string
          is_read: boolean
          message: string
          name: string
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          email_sent_at?: string | null
          id?: string
          is_read?: boolean
          message: string
          name: string
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          email_sent_at?: string | null
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
          id: string
          image_key: string | null
          image_url: string | null
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
          title_fr: string
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
          id?: string
          image_key?: string | null
          image_url?: string | null
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
          title_fr: string
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
          id?: string
          image_key?: string | null
          image_url?: string | null
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
          title_fr?: string
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
          created_at: string
          group_key: string
          id: string
          name: string
          sort_order: number
          tags: string[]
        }
        Insert: {
          created_at?: string
          group_key: string
          id?: string
          name: string
          sort_order?: number
          tags?: string[]
        }
        Update: {
          created_at?: string
          group_key?: string
          id?: string
          name?: string
          sort_order?: number
          tags?: string[]
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: string
          user_id: string
        }
        Insert: {
          id?: string
          role: string
          user_id: string
        }
        Update: {
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
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
  TableName extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"]),
> = (DefaultSchema["Tables"] & DefaultSchema["Views"])[TableName] extends {
  Row: infer R
}
  ? R
  : never
