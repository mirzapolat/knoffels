
import KniffelGame from "@/components/KniffelGame";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-start mb-8">
          <div className="mt-4">
            <LanguageToggle />
          </div>
          <div className="text-center flex-1">
            <h1 className="text-7xl font-didot font-bold text-amber-900 dark:text-amber-100 mb-4">
              Knoffels
            </h1>
          </div>
          <div className="mt-4">
            <ThemeToggle />
          </div>
        </div>
        <KniffelGame />
        
        <div className="text-center mt-12 pt-8 border-t border-amber-300 dark:border-gray-600">
          <p className="text-sm text-amber-700 dark:text-amber-300 font-medium">
            Made with ❤️ by{" "}
            <span className="text-amber-800 dark:text-amber-200 font-semibold">Mirza Polat</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
