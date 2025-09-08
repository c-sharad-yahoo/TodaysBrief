import type { DailyBrief } from '@/types';
import { format } from 'date-fns';

const STORAGE_KEY = 'todays-brief-data';
const ARCHIVE_KEY = 'todays-brief-archive';

export function saveDailyBrief(data: DailyBrief): void {
  if (typeof window === 'undefined') return;
  
  try {
    // Archive any existing content before saving new content
    const existingData = getDailyBrief();
    if (existingData) {
      archiveDailyBrief(existingData);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving daily brief:', error);
  }
}

export function getDailyBrief(): DailyBrief | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error getting daily brief:', error);
    return null;
  }
}

export function archiveDailyBrief(data: DailyBrief): void {
  if (typeof window === 'undefined') return;
  
  try {
    const archive = getArchivedBriefs();
    // Ensure consistent date key format
    const dateKey = format(new Date(data.date), 'yyyy-MM-dd');
    
    archive[dateKey] = data;
    
    localStorage.setItem(ARCHIVE_KEY, JSON.stringify(archive));
  } catch (error) {
    console.error('Error archiving daily brief:', error);
  }
}

export function getArchivedBriefs(): Record<string, DailyBrief> {
  if (typeof window === 'undefined') return {};
  
  try {
    const archived = localStorage.getItem(ARCHIVE_KEY);
    return archived ? JSON.parse(archived) : {};
  } catch (error) {
    console.error('Error getting archived briefs:', error);
    return {};
  }
}

export function getBriefByDate(date: string): DailyBrief | null {
  if (typeof window === 'undefined') return null;
  
  // First try exact match
  const archive = getArchivedBriefs();
  if (archive[date]) {
    return archive[date];
  }
  
  // If no exact match, try to find by parsing dates
  for (const [key, brief] of Object.entries(archive)) {
    const briefDate = format(new Date(brief.date), 'yyyy-MM-dd');
    if (briefDate === date) {
      return brief;
    }
  }
  
  return null;
}

export function searchBriefs(query: string, category?: string): DailyBrief[] {
  if (typeof window === 'undefined') return [];
  
  // Get current daily brief
  const currentBrief = getDailyBrief();
  
  // Get archived briefs
  const archive = getArchivedBriefs();
  const results: DailyBrief[] = [];
  
  // Search current brief if it exists
  if (currentBrief) {
    const searchText = `${currentBrief.title} ${currentBrief.primary_focus.title} ${currentBrief.primary_focus.summary} ${currentBrief.sections.map(s => s.title + ' ' + s.summary).join(' ')}`.toLowerCase();
    
    if (searchText.includes(query.toLowerCase())) {
      if (!category || 
          currentBrief.primary_focus.category.toLowerCase() === category.toLowerCase() ||
          currentBrief.sections.some(s => s.id.toLowerCase() === category.toLowerCase())) {
        results.push(currentBrief);
      }
    }
  }
  
  // Search archived briefs
  Object.values(archive).forEach(brief => {
    const searchText = `${brief.title} ${brief.primary_focus.title} ${brief.primary_focus.summary} ${brief.sections.map(s => s.title + ' ' + s.summary).join(' ')}`.toLowerCase();
    
    if (searchText.includes(query.toLowerCase())) {
      if (!category || 
          brief.primary_focus.category.toLowerCase() === category.toLowerCase() ||
          brief.sections.some(s => s.id.toLowerCase() === category.toLowerCase())) {
        // Avoid duplicates by checking if current brief is already added
        const isDuplicate = currentBrief && 
          format(new Date(brief.date), 'yyyy-MM-dd') === format(new Date(currentBrief.date), 'yyyy-MM-dd');
        
        if (!isDuplicate) {
          results.push(brief);
        }
      }
    }
  });
  
  return results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export interface MonthlyArchive {
  month: string;
  year: number;
  count: number;
  briefs: DailyBrief[];
}

export function getBriefsGroupedByMonth(): MonthlyArchive[] {
  if (typeof window === 'undefined') return [];
  
  const archive = getArchivedBriefs();
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
  
  // Sort briefs within each month by date (newest first)
  Object.values(monthlyGroups).forEach(group => {
    group.briefs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  });
  
  // Return months sorted by date (newest first)
  return Object.values(monthlyGroups).sort((a, b) => b.year - a.year || b.month.localeCompare(a.month));
}