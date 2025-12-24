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
    PostgrestVersion: "13.0.4"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      admission_types: {
        Row: {
          id: string
          label: string
        }
        Insert: {
          id?: string
          label: string
        }
        Update: {
          id?: string
          label?: string
        }
        Relationships: []
      }
      audience_type: {
        Row: {
          id: string
          label: string
        }
        Insert: {
          id?: string
          label: string
        }
        Update: {
          id?: string
          label?: string
        }
        Relationships: []
      }
      auth_codes: {
        Row: {
          code: string | null
          id: number
        }
        Insert: {
          code?: string | null
          id?: number
        }
        Update: {
          code?: string | null
          id?: number
        }
        Relationships: []
      }
      bulk_upload_events_drafts: {
        Row: {
          admin_user_id: string
          created_at: string | null
          draft_data: Json
          id: string
          updated_at: string | null
        }
        Insert: {
          admin_user_id: string
          created_at?: string | null
          draft_data: Json
          id?: string
          updated_at?: string | null
        }
        Update: {
          admin_user_id?: string
          created_at?: string | null
          draft_data?: Json
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      collection_event_links: {
        Row: {
          collection_id: string
          created_at: string | null
          event_id: string
          id: string
        }
        Insert: {
          collection_id: string
          created_at?: string | null
          event_id: string
          id?: string
        }
        Update: {
          collection_id?: string
          created_at?: string | null
          event_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "collection_event_links_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_event_links_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      collection_location_links: {
        Row: {
          collection_id: string
          created_at: string | null
          id: string
          location_id: string
        }
        Insert: {
          collection_id: string
          created_at?: string | null
          id?: string
          location_id: string
        }
        Update: {
          collection_id?: string
          created_at?: string | null
          id?: string
          location_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "collection_location_links_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_location_links_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      collections: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          owner_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          owner_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          owner_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "collections_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "collections_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users_with_created_at"
            referencedColumns: ["user_id"]
          },
        ]
      }
      event_categories: {
        Row: {
          id: string
          label: string
        }
        Insert: {
          id?: string
          label: string
        }
        Update: {
          id?: string
          label?: string
        }
        Relationships: []
      }
      event_hosts: {
        Row: {
          created_at: string | null
          event_id: number | null
          id: string
          role: string | null
          user_id: number | null
        }
        Insert: {
          created_at?: string | null
          event_id?: number | null
          id?: string
          role?: string | null
          user_id?: number | null
        }
        Update: {
          created_at?: string | null
          event_id?: number | null
          id?: string
          role?: string | null
          user_id?: number | null
        }
        Relationships: []
      }
      event_tags: {
        Row: {
          id: string
          label: string
          parent_type: string | null
        }
        Insert: {
          id?: string
          label: string
          parent_type?: string | null
        }
        Update: {
          id?: string
          label?: string
          parent_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_tags_parent_type_fkey"
            columns: ["parent_type"]
            isOneToOne: false
            referencedRelation: "event_types"
            referencedColumns: ["id"]
          },
        ]
      }
      event_types: {
        Row: {
          created_at: string
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          address: string | null
          admission_type_id: string | null
          approval_status: Database["public"]["Enums"]["approval_status"]
          audience_type: string[] | null
          categories: string[] | null
          contact_info: Json | null
          created_at: string
          description: string | null
          end_date: string | null
          end_time: string | null
          event_name: string
          id: string
          image_urls: string[] | null
          is_adult_only: boolean | null
          is_pride_event: boolean
          latitude: number | null
          longitude: number | null
          oct_social_push: boolean
          other_pride_name: string | null
          owner_id: string | null
          pride_id: string | null
          social_media_handles: Json | null
          start_date: string
          start_time: string | null
          tags: string[]
          thumbnail_url: string | null
          ticket_link: string | null
          venue_name: string | null
          video_url: string | null
        }
        Insert: {
          address?: string | null
          admission_type_id?: string | null
          approval_status?: Database["public"]["Enums"]["approval_status"]
          audience_type?: string[] | null
          categories?: string[] | null
          contact_info?: Json | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          end_time?: string | null
          event_name: string
          id?: string
          image_urls?: string[] | null
          is_adult_only?: boolean | null
          is_pride_event?: boolean
          latitude?: number | null
          longitude?: number | null
          oct_social_push?: boolean
          other_pride_name?: string | null
          owner_id?: string | null
          pride_id?: string | null
          social_media_handles?: Json | null
          start_date: string
          start_time?: string | null
          tags: string[]
          thumbnail_url?: string | null
          ticket_link?: string | null
          venue_name?: string | null
          video_url?: string | null
        }
        Update: {
          address?: string | null
          admission_type_id?: string | null
          approval_status?: Database["public"]["Enums"]["approval_status"]
          audience_type?: string[] | null
          categories?: string[] | null
          contact_info?: Json | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          end_time?: string | null
          event_name?: string
          id?: string
          image_urls?: string[] | null
          is_adult_only?: boolean | null
          is_pride_event?: boolean
          latitude?: number | null
          longitude?: number | null
          oct_social_push?: boolean
          other_pride_name?: string | null
          owner_id?: string | null
          pride_id?: string | null
          social_media_handles?: Json | null
          start_date?: string
          start_time?: string | null
          tags?: string[]
          thumbnail_url?: string | null
          ticket_link?: string | null
          venue_name?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_admission_type_id_fkey"
            columns: ["admission_type_id"]
            isOneToOne: false
            referencedRelation: "admission_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "events_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users_with_created_at"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "events_pride_id_fkey"
            columns: ["pride_id"]
            isOneToOne: false
            referencedRelation: "prides"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          address: string | null
          approval_status: Database["public"]["Enums"]["approval_status"]
          categories: string[] | null
          contact_info: Json | null
          created_at: string
          description: string | null
          id: string
          image_urls: string[] | null
          latitude: number
          longitude: number
          name: string
          owner_id: string | null
          social_media_handles: Json | null
          tags: string[]
          thumbnail: string | null
          type: Database["public"]["Enums"]["location_type"]
          video_url: string | null
        }
        Insert: {
          address?: string | null
          approval_status?: Database["public"]["Enums"]["approval_status"]
          categories?: string[] | null
          contact_info?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          image_urls?: string[] | null
          latitude: number
          longitude: number
          name: string
          owner_id?: string | null
          social_media_handles?: Json | null
          tags: string[]
          thumbnail?: string | null
          type: Database["public"]["Enums"]["location_type"]
          video_url?: string | null
        }
        Update: {
          address?: string | null
          approval_status?: Database["public"]["Enums"]["approval_status"]
          categories?: string[] | null
          contact_info?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          image_urls?: string[] | null
          latitude?: number
          longitude?: number
          name?: string
          owner_id?: string | null
          social_media_handles?: Json | null
          tags?: string[]
          thumbnail?: string | null
          type?: Database["public"]["Enums"]["location_type"]
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "locations_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "locations_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users_with_created_at"
            referencedColumns: ["user_id"]
          },
        ]
      }
      migrated_businesses: {
        Row: {
          accepted_t_and_c: boolean | null
          address: string | null
          admin_approved: boolean | null
          category: string[] | null
          city: string | null
          contact_email: string | null
          copied_to_clipboard_stat: number | null
          country: string | null
          created_at: string
          created_by: string | null
          description: string | null
          facebook: string | null
          favorited_by: string[] | null
          hours: string | null
          id: string
          images: string[] | null
          instagram: string | null
          lat_lng: string | null
          phone_number: string | null
          state: string | null
          submitted_by_role: string | null
          threads: string | null
          thumbnail: string | null
          tiktok: string | null
          title: string | null
          video: string | null
          website: string | null
          zip: string | null
        }
        Insert: {
          accepted_t_and_c?: boolean | null
          address?: string | null
          admin_approved?: boolean | null
          category?: string[] | null
          city?: string | null
          contact_email?: string | null
          copied_to_clipboard_stat?: number | null
          country?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          facebook?: string | null
          favorited_by?: string[] | null
          hours?: string | null
          id?: string
          images?: string[] | null
          instagram?: string | null
          lat_lng?: string | null
          phone_number?: string | null
          state?: string | null
          submitted_by_role?: string | null
          threads?: string | null
          thumbnail?: string | null
          tiktok?: string | null
          title?: string | null
          video?: string | null
          website?: string | null
          zip?: string | null
        }
        Update: {
          accepted_t_and_c?: boolean | null
          address?: string | null
          admin_approved?: boolean | null
          category?: string[] | null
          city?: string | null
          contact_email?: string | null
          copied_to_clipboard_stat?: number | null
          country?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          facebook?: string | null
          favorited_by?: string[] | null
          hours?: string | null
          id?: string
          images?: string[] | null
          instagram?: string | null
          lat_lng?: string | null
          phone_number?: string | null
          state?: string | null
          submitted_by_role?: string | null
          threads?: string | null
          thumbnail?: string | null
          tiktok?: string | null
          title?: string | null
          video?: string | null
          website?: string | null
          zip?: string | null
        }
        Relationships: []
      }
      migrated_events: {
        Row: {
          accepted_t_and_c: boolean | null
          address: string | null
          admin_approved: boolean | null
          admission_info: string[] | null
          booking_link: string | null
          bulk_upload_id: string | null
          city: string | null
          contact_email: string | null
          copied_to_clipboard_stat: number | null
          country: string | null
          created_at: string
          created_by: string | null
          description: string | null
          end_date: string | null
          end_time: string | null
          event_entry_id: string | null
          event_images: string[] | null
          event_name: string | null
          event_tags: string[] | null
          event_types: string[] | null
          facebook: string | null
          favorited_by: string[] | null
          id: string
          instagram: string | null
          is_global_pride: boolean | null
          is_pride_event: string | null
          is_recurring_event: string | null
          is_youth_event: string | null
          lat_lng: string | null
          modified: boolean | null
          partnerID: string | null
          phone_number: string | null
          pride: string | null
          start_date: string | null
          start_time: string | null
          state: string | null
          submitted_by_role: string | null
          threads: string | null
          thumbnail: string | null
          tiktok: string | null
          venue_name: string | null
          video: string | null
          video_url: string | null
          website: string | null
          who_its_for: string[] | null
          zip: string | null
        }
        Insert: {
          accepted_t_and_c?: boolean | null
          address?: string | null
          admin_approved?: boolean | null
          admission_info?: string[] | null
          booking_link?: string | null
          bulk_upload_id?: string | null
          city?: string | null
          contact_email?: string | null
          copied_to_clipboard_stat?: number | null
          country?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          end_time?: string | null
          event_entry_id?: string | null
          event_images?: string[] | null
          event_name?: string | null
          event_tags?: string[] | null
          event_types?: string[] | null
          facebook?: string | null
          favorited_by?: string[] | null
          id?: string
          instagram?: string | null
          is_global_pride?: boolean | null
          is_pride_event?: string | null
          is_recurring_event?: string | null
          is_youth_event?: string | null
          lat_lng?: string | null
          modified?: boolean | null
          partnerID?: string | null
          phone_number?: string | null
          pride?: string | null
          start_date?: string | null
          start_time?: string | null
          state?: string | null
          submitted_by_role?: string | null
          threads?: string | null
          thumbnail?: string | null
          tiktok?: string | null
          venue_name?: string | null
          video?: string | null
          video_url?: string | null
          website?: string | null
          who_its_for?: string[] | null
          zip?: string | null
        }
        Update: {
          accepted_t_and_c?: boolean | null
          address?: string | null
          admin_approved?: boolean | null
          admission_info?: string[] | null
          booking_link?: string | null
          bulk_upload_id?: string | null
          city?: string | null
          contact_email?: string | null
          copied_to_clipboard_stat?: number | null
          country?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          end_time?: string | null
          event_entry_id?: string | null
          event_images?: string[] | null
          event_name?: string | null
          event_tags?: string[] | null
          event_types?: string[] | null
          facebook?: string | null
          favorited_by?: string[] | null
          id?: string
          instagram?: string | null
          is_global_pride?: boolean | null
          is_pride_event?: string | null
          is_recurring_event?: string | null
          is_youth_event?: string | null
          lat_lng?: string | null
          modified?: boolean | null
          partnerID?: string | null
          phone_number?: string | null
          pride?: string | null
          start_date?: string | null
          start_time?: string | null
          state?: string | null
          submitted_by_role?: string | null
          threads?: string | null
          thumbnail?: string | null
          tiktok?: string | null
          venue_name?: string | null
          video?: string | null
          video_url?: string | null
          website?: string | null
          who_its_for?: string[] | null
          zip?: string | null
        }
        Relationships: []
      }
      migrated_prides: {
        Row: {
          about: string | null
          background_image: string | null
          city: string | null
          created_at: string
          end_date: string | null
          id: string
          link: string | null
          logo: string | null
          start_date: string | null
        }
        Insert: {
          about?: string | null
          background_image?: string | null
          city?: string | null
          created_at?: string
          end_date?: string | null
          id?: string
          link?: string | null
          logo?: string | null
          start_date?: string | null
        }
        Update: {
          about?: string | null
          background_image?: string | null
          city?: string | null
          created_at?: string
          end_date?: string | null
          id?: string
          link?: string | null
          logo?: string | null
          start_date?: string | null
        }
        Relationships: []
      }
      migrated_resources: {
        Row: {
          accepted_t_and_c: boolean | null
          address: string | null
          admin_approved: boolean | null
          category: string[] | null
          city: string | null
          contact_email: string | null
          copied_to_clipboard_stat: number | null
          country: string | null
          created_at: string
          created_by: string | null
          description: string | null
          facebook: string | null
          favorited_by: string[] | null
          id: string
          images: string[] | null
          instagram: string | null
          lat_lng: string | null
          phone_number: string | null
          state: string | null
          submitted_by_role: string | null
          tags: string[] | null
          threads: string | null
          thumbnail: string | null
          tiktok: string | null
          title: string | null
          video: string | null
          video_url: string | null
          website: string | null
          zip: string | null
        }
        Insert: {
          accepted_t_and_c?: boolean | null
          address?: string | null
          admin_approved?: boolean | null
          category?: string[] | null
          city?: string | null
          contact_email?: string | null
          copied_to_clipboard_stat?: number | null
          country?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          facebook?: string | null
          favorited_by?: string[] | null
          id?: string
          images?: string[] | null
          instagram?: string | null
          lat_lng?: string | null
          phone_number?: string | null
          state?: string | null
          submitted_by_role?: string | null
          tags?: string[] | null
          threads?: string | null
          thumbnail?: string | null
          tiktok?: string | null
          title?: string | null
          video?: string | null
          video_url?: string | null
          website?: string | null
          zip?: string | null
        }
        Update: {
          accepted_t_and_c?: boolean | null
          address?: string | null
          admin_approved?: boolean | null
          category?: string[] | null
          city?: string | null
          contact_email?: string | null
          copied_to_clipboard_stat?: number | null
          country?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          facebook?: string | null
          favorited_by?: string[] | null
          id?: string
          images?: string[] | null
          instagram?: string | null
          lat_lng?: string | null
          phone_number?: string | null
          state?: string | null
          submitted_by_role?: string | null
          tags?: string[] | null
          threads?: string | null
          thumbnail?: string | null
          tiktok?: string | null
          title?: string | null
          video?: string | null
          video_url?: string | null
          website?: string | null
          zip?: string | null
        }
        Relationships: []
      }
      pride_admin_assignments: {
        Row: {
          created_at: string | null
          id: string
          pride_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          pride_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          pride_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pride_admin_assignments_pride_id_fkey"
            columns: ["pride_id"]
            isOneToOne: false
            referencedRelation: "prides"
            referencedColumns: ["id"]
          },
        ]
      }
      prides: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          created_at: string | null
          description: string | null
          email: string | null
          end_date: string | null
          header_image: string | null
          id: string
          is_interpride: boolean | null
          name: string
          oct_pride: boolean
          owner_id: string | null
          phone: string | null
          start_date: string | null
          website_url: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          end_date?: string | null
          header_image?: string | null
          id?: string
          is_interpride?: boolean | null
          name: string
          oct_pride?: boolean
          owner_id?: string | null
          phone?: string | null
          start_date?: string | null
          website_url?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          end_date?: string | null
          header_image?: string | null
          id?: string
          is_interpride?: boolean | null
          name?: string
          oct_pride?: boolean
          owner_id?: string | null
          phone?: string | null
          start_date?: string | null
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prides_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "prides_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users_with_created_at"
            referencedColumns: ["user_id"]
          },
        ]
      }
      tags: {
        Row: {
          created_at: string
          cross_category: boolean
          id: number
          item_type: Database["public"]["Enums"]["item_type"]
          name: string | null
          parent_type: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          cross_category?: boolean
          id?: number
          item_type: Database["public"]["Enums"]["item_type"]
          name?: string | null
          parent_type?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          cross_category?: boolean
          id?: number
          item_type?: Database["public"]["Enums"]["item_type"]
          name?: string | null
          parent_type?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tags_parent_type_fkey"
            columns: ["parent_type"]
            isOneToOne: false
            referencedRelation: "types"
            referencedColumns: ["id"]
          },
        ]
      }
      types: {
        Row: {
          created_at: string
          cross_category: boolean
          id: number
          item_type: Database["public"]["Enums"]["item_type"]
          name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          cross_category?: boolean
          id?: number
          item_type: Database["public"]["Enums"]["item_type"]
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          cross_category?: boolean
          id?: number
          item_type?: Database["public"]["Enums"]["item_type"]
          name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          email: string | null
          is_adult: boolean
          role: Database["public"]["Enums"]["user_role"] | null
          user_id: string
          username: string | null
        }
        Insert: {
          email?: string | null
          is_adult?: boolean
          role?: Database["public"]["Enums"]["user_role"] | null
          user_id: string
          username?: string | null
        }
        Update: {
          email?: string | null
          is_adult?: boolean
          role?: Database["public"]["Enums"]["user_role"] | null
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      users_with_created_at: {
        Row: {
          email: string | null
          is_adult: boolean | null
          role: Database["public"]["Enums"]["user_role"] | null
          signup_date: string | null
          user_id: string | null
          username: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      earth: { Args: never; Returns: number }
      get_events_within_distance: {
        Args: { distance_meters: number; lat: number; lon: number }
        Returns: {
          event_id: number
          event_latitude: number
          event_longitude: number
          event_name: string
        }[]
      }
    }
    Enums: {
      approval_status: "pending" | "rejected" | "approved"
      item_type: "event" | "resource" | "business"
      location_type: "business" | "resource"
      user_role:
        | "super_admin"
        | "admin"
        | "pride_admin"
        | "location_owner"
        | "standard_user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          type: Database["storage"]["Enums"]["buckettype"]
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          type?: Database["storage"]["Enums"]["buckettype"]
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          type?: Database["storage"]["Enums"]["buckettype"]
          updated_at?: string | null
        }
        Relationships: []
      }
      buckets_analytics: {
        Row: {
          created_at: string
          deleted_at: string | null
          format: string
          id: string
          name: string
          type: Database["storage"]["Enums"]["buckettype"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          format?: string
          id?: string
          name: string
          type?: Database["storage"]["Enums"]["buckettype"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          format?: string
          id?: string
          name?: string
          type?: Database["storage"]["Enums"]["buckettype"]
          updated_at?: string
        }
        Relationships: []
      }
      buckets_vectors: {
        Row: {
          created_at: string
          id: string
          type: Database["storage"]["Enums"]["buckettype"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          type?: Database["storage"]["Enums"]["buckettype"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          type?: Database["storage"]["Enums"]["buckettype"]
          updated_at?: string
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          level: number | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          user_metadata: Json | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          level?: number | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          level?: number | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      prefixes: {
        Row: {
          bucket_id: string
          created_at: string | null
          level: number
          name: string
          updated_at: string | null
        }
        Insert: {
          bucket_id: string
          created_at?: string | null
          level?: number
          name: string
          updated_at?: string | null
        }
        Update: {
          bucket_id?: string
          created_at?: string | null
          level?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prefixes_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          user_metadata: Json | null
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          user_metadata?: Json | null
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          user_metadata?: Json | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
      vector_indexes: {
        Row: {
          bucket_id: string
          created_at: string
          data_type: string
          dimension: number
          distance_metric: string
          id: string
          metadata_configuration: Json | null
          name: string
          updated_at: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          data_type: string
          dimension: number
          distance_metric: string
          id?: string
          metadata_configuration?: Json | null
          name: string
          updated_at?: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          data_type?: string
          dimension?: number
          distance_metric?: string
          id?: string
          metadata_configuration?: Json | null
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "vector_indexes_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets_vectors"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_prefixes: {
        Args: { _bucket_id: string; _name: string }
        Returns: undefined
      }
      can_insert_object: {
        Args: { bucketid: string; metadata: Json; name: string; owner: string }
        Returns: undefined
      }
      delete_leaf_prefixes: {
        Args: { bucket_ids: string[]; names: string[] }
        Returns: undefined
      }
      delete_prefix: {
        Args: { _bucket_id: string; _name: string }
        Returns: boolean
      }
      extension: { Args: { name: string }; Returns: string }
      filename: { Args: { name: string }; Returns: string }
      foldername: { Args: { name: string }; Returns: string[] }
      get_level: { Args: { name: string }; Returns: number }
      get_prefix: { Args: { name: string }; Returns: string }
      get_prefixes: { Args: { name: string }; Returns: string[] }
      get_size_by_bucket: {
        Args: never
        Returns: {
          bucket_id: string
          size: number
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
          prefix_param: string
        }
        Returns: {
          created_at: string
          id: string
          key: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          delimiter_param: string
          max_keys?: number
          next_token?: string
          prefix_param: string
          start_after?: string
        }
        Returns: {
          id: string
          metadata: Json
          name: string
          updated_at: string
        }[]
      }
      lock_top_prefixes: {
        Args: { bucket_ids: string[]; names: string[] }
        Returns: undefined
      }
      operation: { Args: never; Returns: string }
      search: {
        Args: {
          bucketname: string
          levels?: number
          limits?: number
          offsets?: number
          prefix: string
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          created_at: string
          id: string
          last_accessed_at: string
          metadata: Json
          name: string
          updated_at: string
        }[]
      }
      search_legacy_v1: {
        Args: {
          bucketname: string
          levels?: number
          limits?: number
          offsets?: number
          prefix: string
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          created_at: string
          id: string
          last_accessed_at: string
          metadata: Json
          name: string
          updated_at: string
        }[]
      }
      search_v1_optimised: {
        Args: {
          bucketname: string
          levels?: number
          limits?: number
          offsets?: number
          prefix: string
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          created_at: string
          id: string
          last_accessed_at: string
          metadata: Json
          name: string
          updated_at: string
        }[]
      }
      search_v2: {
        Args: {
          bucket_name: string
          levels?: number
          limits?: number
          prefix: string
          sort_column?: string
          sort_column_after?: string
          sort_order?: string
          start_after?: string
        }
        Returns: {
          created_at: string
          id: string
          key: string
          last_accessed_at: string
          metadata: Json
          name: string
          updated_at: string
        }[]
      }
    }
    Enums: {
      buckettype: "STANDARD" | "ANALYTICS" | "VECTOR"
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      approval_status: ["pending", "rejected", "approved"],
      item_type: ["event", "resource", "business"],
      location_type: ["business", "resource"],
      user_role: [
        "super_admin",
        "admin",
        "pride_admin",
        "location_owner",
        "standard_user",
      ],
    },
  },
  storage: {
    Enums: {
      buckettype: ["STANDARD", "ANALYTICS", "VECTOR"],
    },
  },
} as const
