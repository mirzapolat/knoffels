
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const LanguageToggle = () => {
  const [language, setLanguage] = React.useState('en');

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    // You can add language switching logic here later
    console.log('Language changed to:', value);
  };

  return (
    <Select value={language} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-24 bg-white/80 dark:bg-gray-800/80 border-amber-300 dark:border-gray-600">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-gray-800 border-amber-300 dark:border-gray-600">
        <SelectItem value="en" className="hover:bg-amber-50 dark:hover:bg-gray-700">🇺🇸 EN</SelectItem>
        <SelectItem value="de" className="hover:bg-amber-50 dark:hover:bg-gray-700">🇩🇪 DE</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LanguageToggle;
