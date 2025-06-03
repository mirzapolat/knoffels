
import KniffelGame from "@/components/KniffelGame";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            🎲 Knoffels
          </h1>
          <p className="text-xl text-gray-600">
            You know the game
          </p>
        </div>
        <KniffelGame />
        
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 font-medium">
            Made with ❤️ by{" "}
            <span className="text-blue-600 font-semibold">Mirza Polat</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
