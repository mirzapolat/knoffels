
import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'de';

interface Translations {
  [key: string]: {
    en: string;
    de: string;
  };
}

const translations: Translations = {
  title: {
    en: 'Knoffels',
    de: 'Kniffel'
  },
  madeWith: {
    en: 'Made with ❤️ by',
    de: 'Gemacht mit ❤️ von'
  },
  // Game translations
  rollDice: {
    en: 'Roll Dice',
    de: 'Würfeln'
  },
  rollsLeft: {
    en: 'Rolls left',
    de: 'Würfe übrig'
  },
  total: {
    en: 'Total',
    de: 'Summe'
  },
  // Scorecard categories
  ones: {
    en: 'Ones',
    de: 'Einser'
  },
  twos: {
    en: 'Twos',
    de: 'Zweier'
  },
  threes: {
    en: 'Threes',
    de: 'Dreier'
  },
  fours: {
    en: 'Fours',
    de: 'Vierer'
  },
  fives: {
    en: 'Fives',
    de: 'Fünfer'
  },
  sixes: {
    en: 'Sixes',
    de: 'Sechser'
  },
  threeOfAKind: {
    en: 'Three of a Kind',
    de: 'Dreierpasch'
  },
  fourOfAKind: {
    en: 'Four of a Kind',
    de: 'Viererpasch'
  },
  fullHouse: {
    en: 'Full House',
    de: 'Full House'
  },
  smallStraight: {
    en: 'Small Straight',
    de: 'Kleine Straße'
  },
  largeStraight: {
    en: 'Large Straight',
    de: 'Große Straße'
  },
  yahtzee: {
    en: 'Yahtzee',
    de: 'Yahtzee'
  },
  chance: {
    en: 'Chance',
    de: 'Chance'
  },
  upperBonus: {
    en: 'Upper Bonus',
    de: 'Bonus oben'
  },
  grandTotal: {
    en: 'Grand Total',
    de: 'Gesamtsumme'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'de' || saved === 'en') ? saved : 'en';
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
