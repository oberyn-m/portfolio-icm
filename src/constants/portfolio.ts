import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from './translations';

export function usePortfolioContent() {
  const { language } = useLanguage();
  const t = translations[language].portfolio;

  return `# ${t.title}

${t.description}

## ${t.education.title}

${t.education.items.map(item => `- ${item}`).join('\n')}

## ${t.skills.title}

${t.skills.items.map(item => `- ${item}`).join('\n')}

## ${t.projects.title}

${t.projects.items.map(item => `- ${item}`).join('\n')}

## ${t.contact.title}

${t.contact.items.map(item => `- ${item}`).join('\n')}`;
} 