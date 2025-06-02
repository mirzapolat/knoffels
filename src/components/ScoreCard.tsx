
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ScoreCardProps {
  scores: Record<string, number | null>;
  onScoreCategory: (category: string) => void;
  calculateScore: (category: string, diceValues: number[]) => number;
  diceValues: number[];
  canScore: boolean;
}

const ScoreCard: React.FC<ScoreCardProps> = ({
  scores,
  onScoreCategory,
  calculateScore,
  diceValues,
  canScore
}) => {
  const categories = [
    { key: 'ones', label: 'Ones', description: 'Sum of all 1s' },
    { key: 'twos', label: 'Twos', description: 'Sum of all 2s' },
    { key: 'threes', label: 'Threes', description: 'Sum of all 3s' },
    { key: 'fours', label: 'Fours', description: 'Sum of all 4s' },
    { key: 'fives', label: 'Fives', description: 'Sum of all 5s' },
    { key: 'sixes', label: 'Sixes', description: 'Sum of all 6s' },
  ];

  const specialCategories = [
    { key: 'threeOfAKind', label: 'Three of a Kind', description: 'Sum of all dice (3+ same)' },
    { key: 'fourOfAKind', label: 'Four of a Kind', description: 'Sum of all dice (4+ same)' },
    { key: 'fullHouse', label: 'Full House', description: '25 points (3+2 same)' },
    { key: 'smallStraight', label: 'Small Straight', description: '30 points (4 consecutive)' },
    { key: 'largeStraight', label: 'Large Straight', description: '40 points (5 consecutive)' },
    { key: 'kniffel', label: 'Kniffel', description: '50 points (5 same)' },
    { key: 'chance', label: 'Chance', description: 'Sum of all dice' },
  ];

  const upperSectionTotal = categories.reduce((sum, cat) => {
    const score = scores[cat.key];
    return sum + (score || 0);
  }, 0);

  const bonus = upperSectionTotal >= 63 ? 35 : 0;

  const ScoreRow = ({ category }: { category: any }) => {
    const isScored = scores[category.key] !== undefined;
    const currentScore = isScored ? scores[category.key] : calculateScore(category.key, diceValues);
    const canScoreThis = canScore && !isScored;

    return (
      <div className={`
        grid grid-cols-4 gap-4 p-3 rounded-lg transition-all duration-200
        ${isScored ? 'bg-green-50 border border-green-200' : 'bg-gray-50 hover:bg-blue-50'}
        ${canScoreThis ? 'border-2 border-blue-300 cursor-pointer' : ''}
      `}>
        <div className="font-semibold text-gray-800">{category.label}</div>
        <div className="text-sm text-gray-600">{category.description}</div>
        <div className="text-center font-bold text-lg">
          {isScored ? scores[category.key] : (canScore ? currentScore : '-')}
        </div>
        <div className="flex justify-center">
          {canScoreThis && (
            <Button
              onClick={() => onScoreCategory(category.key)}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded transition-all duration-200"
            >
              Score {currentScore}
            </Button>
          )}
          {isScored && (
            <span className="text-green-600 font-bold">✓ Scored</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="p-6 bg-white/90 backdrop-blur-sm border-2 border-blue-200">
        <h3 className="text-xl font-bold mb-4 text-center text-gray-800">Upper Section</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <ScoreRow key={category.key} category={category} />
          ))}
          
          <div className="border-t-2 border-gray-300 pt-3 mt-4">
            <div className="grid grid-cols-2 gap-4 text-lg font-bold">
              <div>Subtotal:</div>
              <div className="text-right">{upperSectionTotal}</div>
              <div>Bonus (if ≥63):</div>
              <div className="text-right text-green-600">{bonus}</div>
              <div className="border-t border-gray-300 pt-2">Total:</div>
              <div className="text-right border-t border-gray-300 pt-2">{upperSectionTotal + bonus}</div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-white/90 backdrop-blur-sm border-2 border-green-200">
        <h3 className="text-xl font-bold mb-4 text-center text-gray-800">Lower Section</h3>
        <div className="space-y-2">
          {specialCategories.map(category => (
            <ScoreRow key={category.key} category={category} />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ScoreCard;
