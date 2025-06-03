
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
    const potentialScore = calculateScore(category.key, diceValues);
    const canScoreThis = canScore && !isScored;

    return (
      <div className="flex items-stretch bg-yellow-50/80 border border-amber-300/50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
        <div className="flex-1 p-3">
          <div className="font-semibold text-amber-900 text-lg">{category.label}</div>
          <div className="text-sm text-amber-700 mt-1">{category.description}</div>
        </div>
        
        <div className="flex items-center justify-center bg-amber-100/50 border-l border-amber-300/30 px-4 min-w-[80px]">
          <span className="font-bold text-xl text-amber-800">
            {isScored ? scores[category.key] : '-'}
          </span>
        </div>
        
        <div className="flex items-center justify-center bg-amber-200/30 border-l border-amber-300/30 min-w-[140px] px-3">
          {canScoreThis && (
            <Button
              onClick={() => onScoreCategory(category.key)}
              size="sm"
              className="bg-amber-700 hover:bg-amber-800 text-yellow-50 font-bold px-4 py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              Score {potentialScore}
            </Button>
          )}
          {isScored && (
            <span className="text-amber-700 font-bold text-lg">✓ Scored</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="p-6 bg-yellow-50/90 backdrop-blur-sm border-2 border-amber-400/60 shadow-xl">
        <h3 className="text-2xl font-bold mb-6 text-center text-amber-900 border-b-2 border-amber-400/40 pb-3">Upper Section</h3>
        <div className="space-y-3">
          {categories.map(category => (
            <ScoreRow key={category.key} category={category} />
          ))}
          
          <div className="border-t-2 border-amber-500/60 pt-4 mt-6 bg-amber-100/40 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 text-lg font-bold text-amber-900">
              <div>Subtotal:</div>
              <div className="text-right">{upperSectionTotal}</div>
              <div className="flex items-center gap-2">
                Bonus:
                <span className="text-sm font-normal text-amber-700">
                  {pointsNeeded > 0 ? `Need ${pointsNeeded} more` : '✓ Achieved!'}
                </span>
              </div>
              <div className="text-right text-amber-800">{bonus}</div>
              <div className="border-t border-amber-500/60 pt-2 text-xl">Total:</div>
              <div className="text-right border-t border-amber-500/60 pt-2 text-xl">{upperSectionTotal + bonus}</div>
            </div>
            {pointsNeeded > 0 && (
              <div className="mt-3 p-3 bg-yellow-100/80 rounded-lg border border-amber-300/40">
                <div className="text-sm text-amber-800 text-center">
                  💡 <strong>Bonus Hint:</strong> Get 35 bonus points by scoring at least 63 points in the upper section!
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-yellow-50/90 backdrop-blur-sm border-2 border-amber-400/60 shadow-xl">
        <h3 className="text-2xl font-bold mb-6 text-center text-amber-900 border-b-2 border-amber-400/40 pb-3">Lower Section</h3>
        <div className="space-y-3">
          {specialCategories.map(category => (
            <ScoreRow key={category.key} category={category} />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ScoreCard;
