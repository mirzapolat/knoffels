
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
    { key: 'kniffel', label: 'Knoffels', description: '50 points (5 same)' },
    { key: 'chance', label: 'Chance', description: 'Sum of all dice' },
  ];

  const upperSectionTotal = categories.reduce((sum, cat) => {
    const score = scores[cat.key];
    return sum + (score || 0);
  }, 0);

  const bonus = upperSectionTotal >= 63 ? 35 : 0;
  const pointsNeeded = Math.max(0, 63 - upperSectionTotal);

  const ScoreRow = ({ category }: { category: any }) => {
    const isScored = scores[category.key] !== undefined;
    const currentScore = isScored ? scores[category.key] : calculateScore(category.key, diceValues);
    const canScoreThis = canScore && !isScored;

    return (
      <div className={`
        grid grid-cols-[1fr_auto_auto_auto] gap-2 p-3 rounded-lg transition-all duration-200 items-center
        ${isScored ? 'bg-orange-100 border border-orange-300' : 'bg-amber-50 hover:bg-orange-50'}
        ${canScoreThis ? 'border-2 border-amber-400 cursor-pointer' : ''}
      `}>
        <div className="min-w-0">
          <div className="font-semibold text-amber-900">{category.label}</div>
          <div className="text-sm text-amber-700 truncate">{category.description}</div>
        </div>
        <div className="text-center font-bold text-lg text-amber-800 min-w-[3rem]">
          {isScored ? scores[category.key] : (canScore ? currentScore : '-')}
        </div>
        <div className="flex justify-center min-w-[120px]">
          {canScoreThis && (
            <Button
              onClick={() => onScoreCategory(category.key)}
              size="sm"
              className="bg-amber-600 hover:bg-amber-700 text-amber-50 px-3 py-1 rounded transition-all duration-200 shadow text-xs whitespace-nowrap"
            >
              Score {currentScore}
            </Button>
          )}
          {isScored && (
            <span className="text-orange-600 font-bold text-sm">✓ Scored</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="p-6 bg-amber-50/90 backdrop-blur-sm border-2 border-amber-300 shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-center text-amber-900">Upper Section</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <ScoreRow key={category.key} category={category} />
          ))}
          
          <div className="border-t-2 border-amber-400 pt-3 mt-4">
            <div className="grid grid-cols-2 gap-4 text-lg font-bold text-amber-900">
              <div>Subtotal:</div>
              <div className="text-right">{upperSectionTotal}</div>
              <div className="flex items-center gap-2">
                Bonus (if ≥63):
                <span className="text-sm font-normal text-amber-700">
                  {pointsNeeded > 0 ? `Need ${pointsNeeded} more` : '✓ Achieved!'}
                </span>
              </div>
              <div className="text-right text-orange-600">{bonus}</div>
              <div className="border-t border-amber-400 pt-2">Total:</div>
              <div className="text-right border-t border-amber-400 pt-2">{upperSectionTotal + bonus}</div>
            </div>
            {pointsNeeded > 0 && (
              <div className="mt-2 p-2 bg-orange-100 rounded-lg border border-orange-200">
                <div className="text-sm text-amber-800 text-center">
                  💡 <strong>Bonus Hint:</strong> Get 35 bonus points by scoring at least 63 points in the upper section!
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-amber-50/90 backdrop-blur-sm border-2 border-orange-300 shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-center text-amber-900">Lower Section</h3>
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
