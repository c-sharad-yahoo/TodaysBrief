import type { DailyBrief } from '@/types';
import { format } from 'date-fns';
import { supabase, handleSupabaseError } from './supabase';

// Keep localStorage as fallback for development
const STORAGE_KEY = 'todays-brief-data';
const ARCHIVE_KEY = 'todays-brief-archive';

export async function saveDailyBrief(data: DailyBrief): Promise<void> {
  try {
    const { error } = await supabase
      .from('daily_briefs')
      .upsert({
        title: data.title,
        date: data.date,
        meta: data.meta,
        impact_summary: data.impact_summary,
        primary_focus: data.primary_focus,
        sections: data.sections,
        rapid_updates: data.rapid_updates,
        exam_intelligence: data.exam_intelligence,
        knowledge_synthesis: data.knowledge_synthesis,
        weekly_analysis: data.weekly_analysis
      }, {
        onConflict: 'date'
      });

    if (error) {
      handleSupabaseError(error, 'save daily brief');
    }
  } catch (error) {
    console.error('Error saving daily brief:', error);
    // Fallback to localStorage in development
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }
}

export async function getDailyBrief(): Promise<DailyBrief | null> {
  try {
    const today = format(new Date(), 'yyyy-MM-dd');
    
    const { data, error } = await supabase
      .from('daily_briefs')
      .select('*')
      .eq('date', today)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
      handleSupabaseError(error, 'get daily brief');
    }

    return data ? convertSupabaseRowToDailyBrief(data) : null;
  } catch (error) {
    console.error('Error getting daily brief:', error);
    // Fallback to localStorage in development
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  }
}

export async function archiveDailyBrief(data: DailyBrief): Promise<void> {
  // This function is no longer needed as Supabase handles persistence
  // All briefs are automatically "archived" in the database
  console.log('Brief automatically archived in Supabase:', data.date);
}

export async function getArchivedBriefs(): Promise<Record<string, DailyBrief>> {
  try {
    const { data, error } = await supabase
      .from('daily_briefs')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      handleSupabaseError(error, 'get archived briefs');
    }

    const archive: Record<string, DailyBrief> = {};
    data?.forEach(row => {
      const brief = convertSupabaseRowToDailyBrief(row);
      const dateKey = format(new Date(brief.date), 'yyyy-MM-dd');
      archive[dateKey] = brief;
    });

    return archive;
  } catch (error) {
    console.error('Error getting archived briefs:', error);
    // Fallback to localStorage in development
    if (typeof window !== 'undefined') {
      const archived = localStorage.getItem(ARCHIVE_KEY);
      return archived ? JSON.parse(archived) : {};
    }
    return {};
  }
}

export async function getBriefByDate(date: string): Promise<DailyBrief | null> {
  try {
    const { data, error } = await supabase
      .from('daily_briefs')
      .select('*')
      .eq('date', date)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
      handleSupabaseError(error, 'get brief by date');
    }

    return data ? convertSupabaseRowToDailyBrief(data) : null;
  } catch (error) {
    console.error('Error getting brief by date:', error);
    // Fallback to localStorage in development
    if (typeof window !== 'undefined') {
      const archive = await getArchivedBriefs();
      return archive[date] || null;
    }
    return null;
  }
}

export async function searchBriefs(query: string, category?: string): Promise<DailyBrief[]> {
  try {
    let supabaseQuery = supabase
      .from('daily_briefs')
      .select('*')
      .order('date', { ascending: false });

    // Use Supabase's text search capabilities
    if (query.trim()) {
      supabaseQuery = supabaseQuery.or(`title.ilike.%${query}%,primary_focus->>title.ilike.%${query}%,primary_focus->>summary.ilike.%${query}%`);
    }

    const { data, error } = await supabaseQuery;

    if (error) {
      handleSupabaseError(error, 'search briefs');
    }

    const results = data?.map(convertSupabaseRowToDailyBrief) || [];

    // Apply category filter if specified
    if (category) {
      return results.filter(brief => 
        brief.primary_focus.category.toLowerCase() === category.toLowerCase() ||
        brief.sections.some(s => s.id.toLowerCase() === category.toLowerCase())
      );
    }

    return results;
  } catch (error) {
    console.error('Error searching briefs:', error);
    // Fallback to localStorage in development
    if (typeof window !== 'undefined') {
      const currentBrief = await getDailyBrief();
      const archive = await getArchivedBriefs();
      const results: DailyBrief[] = [];
      
      // Simple client-side search as fallback
      Object.values(archive).forEach(brief => {
        const searchText = `${brief.title} ${brief.primary_focus.title} ${brief.primary_focus.summary}`.toLowerCase();
        if (searchText.includes(query.toLowerCase())) {
          results.push(brief);
        }
      });
      
      return results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    return [];
  }
}

export interface MonthlyArchive {
  month: string;
  year: number;
  count: number;
  briefs: DailyBrief[];
}

export async function getBriefsGroupedByMonth(): Promise<MonthlyArchive[]> {
  try {
    const { data, error } = await supabase
      .from('daily_briefs')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      handleSupabaseError(error, 'get briefs grouped by month');
    }

    const monthlyGroups: Record<string, MonthlyArchive> = {};
    
    data?.forEach(row => {
      const brief = convertSupabaseRowToDailyBrief(row);
      const date = new Date(brief.date);
      const monthKey = format(date, 'yyyy-MM');
      const monthName = format(date, 'MMMM yyyy');
      
      if (!monthlyGroups[monthKey]) {
        monthlyGroups[monthKey] = {
          month: monthName,
          year: date.getFullYear(),
          count: 0,
          briefs: []
        };
      }
      
      monthlyGroups[monthKey].count++;
      monthlyGroups[monthKey].briefs.push(brief);
    });
    
    // Sort briefs within each month by date (newest first)
    Object.values(monthlyGroups).forEach(group => {
      group.briefs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
    
    // Return months sorted by date (newest first)
    return Object.values(monthlyGroups).sort((a, b) => b.year - a.year || b.month.localeCompare(a.month));
  } catch (error) {
    console.error('Error getting briefs grouped by month:', error);
    // Fallback to localStorage in development
    if (typeof window !== 'undefined') {
      const archive = await getArchivedBriefs();
      const monthlyGroups: Record<string, MonthlyArchive> = {};
      
      Object.values(archive).forEach(brief => {
        const date = new Date(brief.date);
        const monthKey = format(date, 'yyyy-MM');
        const monthName = format(date, 'MMMM yyyy');
        
        if (!monthlyGroups[monthKey]) {
          monthlyGroups[monthKey] = {
            month: monthName,
            year: date.getFullYear(),
            count: 0,
            briefs: []
          };
        }
        
        monthlyGroups[monthKey].count++;
        monthlyGroups[monthKey].briefs.push(brief);
      });
      
      return Object.values(monthlyGroups).sort((a, b) => b.year - a.year);
    }
    return [];
  }
}

// Helper function to convert Supabase row to DailyBrief
function convertSupabaseRowToDailyBrief(row: any): DailyBrief {
  return {
    title: row.title,
    date: row.date,
    meta: row.meta,
    impact_summary: row.impact_summary,
    primary_focus: row.primary_focus,
    sections: row.sections,
    rapid_updates: row.rapid_updates,
    exam_intelligence: row.exam_intelligence,
    knowledge_synthesis: row.knowledge_synthesis,
    weekly_analysis: row.weekly_analysis
  };
}