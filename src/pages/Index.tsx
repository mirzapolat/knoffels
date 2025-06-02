
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
            Roll the dice and score big!
          </p>
        </div>
        <KniffelGame />
      </div>
    </div>
  );
};

export default Index;
