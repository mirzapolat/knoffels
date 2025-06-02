
import React from 'react';
import { Card } from '@/components/ui/card';

interface GameStatsProps {
  rollsLeft: number;
  totalScore: number;
  isGameComplete: boolean;
}

const GameStats: React.FC<GameStatsProps> = ({ rollsLeft, totalScore, isGameComplete }) => {
  return (
    <Card className="p-4 bg-gradient-to-r from-blue-500 to-green-500 text-white border-0">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <div className="text-center">
            <div className="text-sm opacity-90">Rolls Left</div>
            <div className="text-2xl font-bold">{rollsLeft}</div>
          </div>
          <div className="text-center">
            <div className="text-sm opacity-90">Total Score</div>
            <div className="text-2xl font-bold">{totalScore}</div>
          </div>
        </div>
        
        <div className="text-right">
          {isGameComplete ? (
            <div className="text-center">
              <div className="text-lg font-bold">🎉 Game Complete!</div>
              <div className="text-sm opacity-90">Final Score: {totalScore}</div>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-sm opacity-90">Game Status</div>
              <div className="text-lg font-bold">
                {rollsLeft === 3 ? 'Ready to Roll!' : rollsLeft > 0 ? 'Rolling...' : 'Choose Score'}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default GameStats;
