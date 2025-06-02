
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
    <Card
      className={`
        w-24 h-24 cursor-pointer transition-all duration-300 transform hover:scale-105
        ${locked 
          ? 'bg-gradient-to-br from-yellow-100 to-yellow-200 border-4 border-yellow-400 shadow-xl' 
          : 'bg-gradient-to-br from-white to-gray-50 border-3 border-gray-300 hover:border-blue-400 shadow-lg'
        }
        ${disabled ? 'cursor-not-allowed opacity-50' : ''}
        ${isRolling ? 'animate-spin' : ''}
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
                  ? 'bg-gradient-to-br from-gray-700 to-gray-900 shadow-inner' 
                  : 'bg-transparent'
                }
              `}
            />
          );
        })}
      </div>
      
      {locked && (
        <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
          🔒
        </div>
      )}
      
      {!disabled && (
        <div className="absolute bottom-0 left-0 right-0 text-xs text-center text-gray-600 bg-white/90 rounded-b-xl py-1 font-medium">
          {locked ? 'Locked' : 'Click to lock'}
        </div>
      )}
    </Card>
  );
};

export default Dice;
