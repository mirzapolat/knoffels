
import KniffelGame from "@/components/KniffelGame";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-7xl font-didot font-bold text-amber-900 mb-4">
            Knoffels
          </h1>
        </div>

        <KniffelGame />

        <div className="text-center mt-12 pt-8 border-t border-amber-300">
          <p className="text-sm text-amber-700 font-medium">
            Made with ❤️ by{" "}
            <span className="text-amber-800 font-bold"><a href="https://mirzapolat.com" target="_blank" rel="noopener noreferrer">Mirza Polat</a></span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
