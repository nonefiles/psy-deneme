export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          role: string | null
          slug: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          role?: string | null
          slug?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          role?: string | null
          slug?: string | null
          updated_at?: string
        }
      }
      clients: {
        Row: {
          id: string
          psychologist_id: string
          first_name: string
          last_name: string
          email: string | null
          phone: string | null
          notes_enc: string | null
          created_at: string
        }
        Insert: {
          id?: string
          psychologist_id: string
          first_name: string
          last_name: string
          email?: string | null
          phone?: string | null
          notes_enc?: string | null
          created_at?: string
        }
        Update: {
          first_name?: string
          last_name?: string
          email?: string | null
          phone?: string | null
          notes_enc?: string | null
        }
      }
      appointments: {
        Row: {
          id: string
          psychologist_id: string
          client_id: string | null
          start_at: string
          end_at: string
          status: string
          notes: string | null
          guest_name: string | null
          guest_email: string | null
          guest_phone: string | null
          created_at: string
        }
        Insert: {
          id?: string
          psychologist_id: string
          client_id?: string | null
          start_at: string
          end_at: string
          status?: string
          notes?: string | null
          guest_name?: string | null
          guest_email?: string | null
          guest_phone?: string | null
          created_at?: string
        }
        Update: {
          client_id?: string | null
          start_at?: string
          end_at?: string
          status?: string
          notes?: string | null
          guest_name?: string | null
          guest_email?: string | null
          guest_phone?: string | null
        }
      }
      availability: {
        Row: {
          id: string
          psychologist_id: string
          day_of_week: number
          start_time: string
          end_time: string
          slot_minutes: number
        }
        Insert: {
          id?: string
          psychologist_id: string
          day_of_week: number
          start_time: string
          end_time: string
          slot_minutes: number
        }
        Update: {
          day_of_week?: number
          start_time?: string
          end_time?: string
          slot_minutes?: number
        }
      }
      transactions: {
        Row: {
          id: string
          psychologist_id: string
          type: string
          amount: number
          category: string
          description: string | null
          occurred_on: string
          created_at: string
        }
        Insert: {
          id?: string
          psychologist_id: string
          type: string
          amount: number
          category: string
          description?: string | null
          occurred_on: string
          created_at?: string
        }
        Update: {
          type?: string
          amount?: number
          category?: string
          description?: string | null
          occurred_on?: string
        }
      }
      invoices: {
        Row: {
          id: string
          psychologist_id: string
          appointment_id: string | null
          status: string
          total_amount: number
          currency: string
          issue_date: string
          due_date: string
        }
        Insert: {
          id?: string
          psychologist_id: string
          appointment_id?: string | null
          status?: string
          total_amount: number
          currency: string
          issue_date: string
          due_date: string
        }
        Update: {
          status?: string
          total_amount?: number
          currency?: string
          issue_date?: string
          due_date?: string
        }
      }
    }
  }
}
