import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class AppService {
  private supabase: SupabaseClient;

  constructor() {
    // This pulls your credentials automatically from the .env file
    this.supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_KEY!
    );
  }

  async getEntries() {
    const { data, error } = await this.supabase
      .from('guestbook') 
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  async createEntry(name: string, message: string) {
    const { data, error } = await this.supabase
      .from('guestbook')
      .insert([{ name, message }]);
    
    if (error) throw error;
    return data;
  }

  // New method to remove an entry
  async deleteEntry(id: string) {
    const { data, error } = await this.supabase
      .from('guestbook')
      .delete()
      .eq('id', id); // Filters for the specific ID to delete
    
    if (error) throw error;
    return data;
  }
}