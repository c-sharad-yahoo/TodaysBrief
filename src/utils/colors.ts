export const categoryColors = {
  governance: {
    primary: '#007AFF',
    light: '#E6F3FF',
    hover: '#0056CC'
  },
  economic: {
    primary: '#34C759',
    light: '#E8F7EC',
    hover: '#28A745'
  },
  international: {
    primary: '#FF9500',
    light: '#FFF4E6',
    hover: '#E6850E'
  },
  science: {
    primary: '#AF52DE',
    light: '#F3E8FF',
    hover: '#9A3EC4'
  },
  social: {
    primary: '#5AC8FA',
    light: '#E8F7FF',
    hover: '#32ADE6'
  },
  environment: {
    primary: '#32D74B',
    light: '#E8F7EC',
    hover: '#28A745'
  }
} as const;

export function getCategoryColor(category: string) {
  const key = category.toLowerCase() as keyof typeof categoryColors;
  return categoryColors[key] || categoryColors.governance;
}

export function formatText(text: string): string {
  return text.replace(/\\n/g, '\n').replace(/\n/g, '<br>');
}