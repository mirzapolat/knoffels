
import React from 'react';
import { Card } from '@/components/ui/card';

interface DiceProps {
  value: number;
  locked: boolean;
  onClick: () => void;
  disabled: boolean;
}

const Dice: React.FC<DiceProps> = ({ value, locked, onClick, disabled }) => {
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
        w-20 h-20 cursor-pointer transition-all duration-200 transform hover:scale-105
        ${locked 
          ? 'bg-yellow-100 border-4 border-yellow-400 shadow-lg' 
          : 'bg-white border-2 border-gray-300 hover:border-blue-400'
        }
        ${disabled ? 'cursor-not-allowed opacity-50' : ''}
        relative select-none
      `}
      onClick={disabled ? undefined : onClick}
    >
      <div className="absolute inset-2 grid grid-cols-3 grid-rows-3 gap-1">
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
                w-2 h-2 rounded-full transition-all duration-200
                ${showDot ? 'bg-gray-800' : 'bg-transparent'}
              `}
            />
          );
        })}
      </div>
      
      {locked && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
          🔒
        </div>
      )}
      
      {!disabled && (
        <div className="absolute bottom-0 left-0 right-0 text-xs text-center text-gray-500 bg-white/80 rounded-b">
          {locked ? 'Locked' : 'Click to lock'}
        </div>
      )}
    </Card>
  );
};

export default Dice;
