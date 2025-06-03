
import React from 'react';
import { Card } from '@/components/ui/card';

interface DiceProps {
  value: number;
  locked: boolean;
  onClick: () => void;
  disabled: boolean;
  isRolling?: boolean;
}

const Dice: React.FC<DiceProps> = ({ value, locked, onClick, disabled, isRolling = false }) => {
  const getDotPositions = (value: number) => {
    const positions = {
      1: ['center'],
      2: ['top-left', 'bottom-right'],
      3: ['top-left', 'center', 'bottom-right'],
      4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      5: ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'],
      6: ['top-left', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-right']
    };
    return positions[value as keyof typeof positions] || [];
  };

  const dotPositions = getDotPositions(value);

  return (
    <div className="flex flex-col items-center">
      <Card
        className={`
          w-24 h-24 cursor-pointer transition-all duration-300 transform hover:scale-105
          ${locked 
            ? 'bg-gradient-to-br from-orange-100 to-orange-200 border-4 border-orange-400 shadow-2xl drop-shadow-xl' 
            : 'bg-gradient-to-br from-amber-50 to-orange-50 border-3 border-amber-400 hover:border-orange-500 shadow-xl drop-shadow-lg'
          }
          ${disabled ? 'cursor-not-allowed opacity-50' : ''}
          ${isRolling ? 'animate-bounce scale-110' : ''}
          relative select-none rounded-xl
        `}
        onClick={disabled ? undefined : onClick}
      >
        <div className="absolute inset-3 grid grid-cols-3 grid-rows-3 gap-1">
          {Array.from({ length: 9 }, (_, index) => {
            const positions = [
              'top-left', 'top-center', 'top-right',
              'middle-left', 'center', 'middle-right',
              'bottom-left', 'bottom-center', 'bottom-right'
            ];
            const position = positions[index];
            const showDot = dotPositions.includes(position);
            
            return (
              <div
                key={index}
                className={`
                  w-3 h-3 rounded-full transition-all duration-300
                  ${showDot 
                    ? 'bg-gradient-to-br from-amber-800 to-amber-900 shadow-lg drop-shadow-md' 
                    : 'bg-transparent'
                  }
                `}
              />
            );
          })}
        </div>
        
        {locked && (
          <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-2xl drop-shadow-lg">
            🔒
          </div>
        )}
      </Card>
      
      {!disabled && (
        <div className="text-xs text-center text-amber-700 bg-amber-50/95 rounded-md py-1 px-2 font-medium shadow-lg border border-amber-300 mt-2 mb-4">
          {locked ? 'Locked' : 'Click to lock'}
        </div>
      )}
    </div>
  );
};

export default Dice;
