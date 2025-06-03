import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Dice from './Dice';
import ScoreCard from './ScoreCard';
import GameStats from './GameStats';
import { useToast } from '@/hooks/use-toast';
export interface DiceState {
  value: number;
  locked: boolean;
}
export interface Score {
  [key: string]: number | null;
}
const KniffelGame = () => {
  const [dice, setDice] = useState<DiceState[]>([{
    value: 1,
    locked: false
  }, {
    value: 1,
    locked: false
  }, {
    value: 1,
    locked: false
  }, {
    value: 1,
    locked: false
  }, {
    value: 1,
    locked: false
  }]);
  const [rollsLeft, setRollsLeft] = useState(3);
  const [scores, setScores] = useState<Score>({});
  const [totalScore, setTotalScore] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const {
    toast
  } = useToast();
  const rollDice = useCallback(() => {
    if (rollsLeft > 0 && !isRolling) {
      setIsRolling(true);

      // Immediately roll dice and add pop animation
      setDice(prevDice => prevDice.map(die => die.locked ? die : {
        ...die,
        value: Math.floor(Math.random() * 6) + 1
      }));
      setRollsLeft(prev => prev - 1);

      // Stop the rolling animation after a short duration
      setTimeout(() => {
        setIsRolling(false);
      }, 300);
    }
  }, [rollsLeft, isRolling]);
  const toggleDiceLock = useCallback((index: number) => {
    if (rollsLeft < 3) {
      setDice(prevDice => prevDice.map((die, i) => i === index ? {
        ...die,
        locked: !die.locked
      } : die));
    }
  }, [rollsLeft]);
  const calculateScore = useCallback((category: string, diceValues: number[]): number => {
    const counts = diceValues.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);
    const sortedCounts = Object.values(counts).sort((a, b) => b - a);
    const sum = diceValues.reduce((a, b) => a + b, 0);
    switch (category) {
      case 'ones':
        return counts[1] ? counts[1] * 1 : 0;
      case 'twos':
        return counts[2] ? counts[2] * 2 : 0;
      case 'threes':
        return counts[3] ? counts[3] * 3 : 0;
      case 'fours':
        return counts[4] ? counts[4] * 4 : 0;
      case 'fives':
        return counts[5] ? counts[5] * 5 : 0;
      case 'sixes':
        return counts[6] ? counts[6] * 6 : 0;
      case 'threeOfAKind':
        return sortedCounts[0] >= 3 ? sum : 0;
      case 'fourOfAKind':
        return sortedCounts[0] >= 4 ? sum : 0;
      case 'fullHouse':
        return sortedCounts[0] === 3 && sortedCounts[1] === 2 ? 25 : 0;
      case 'smallStraight':
        {
          const sorted = [...new Set(diceValues)].sort();
          const straights = ['1,2,3,4', '2,3,4,5', '3,4,5,6'];
          return straights.some(straight => straight.split(',').every(num => sorted.includes(parseInt(num)))) ? 30 : 0;
        }
      case 'largeStraight':
        {
          const sorted = [...new Set(diceValues)].sort().join(',');
          return sorted === '1,2,3,4,5' || sorted === '2,3,4,5,6' ? 40 : 0;
        }
      case 'kniffel':
        return sortedCounts[0] === 5 ? 50 : 0;
      case 'chance':
        return sum;
      default:
        return 0;
    }
  }, []);

  // Calculate upper section total and bonus
  const upperSectionCategories = ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes'];
  const upperSectionTotal = upperSectionCategories.reduce((sum, cat) => {
    const score = scores[cat];
    return sum + (score || 0);
  }, 0);
  const bonus = upperSectionTotal >= 63 ? 35 : 0;

  // Calculate total score including bonus
  const allCategoriesTotal = Object.values(scores).reduce((sum, score) => sum + (score || 0), 0);
  const actualTotalScore = allCategoriesTotal + bonus;
  const scoreCategory = useCallback((category: string) => {
    if (scores[category] !== undefined || rollsLeft === 3) return;
    const diceValues = dice.map(die => die.value);
    const score = calculateScore(category, diceValues);
    setScores(prev => ({
      ...prev,
      [category]: score
    }));

    // Reset for next turn
    setDice(dice.map(() => ({
      value: 1,
      locked: false
    })));
    setRollsLeft(3);

    // Check if game is complete
    const categories = ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes', 'threeOfAKind', 'fourOfAKind', 'fullHouse', 'smallStraight', 'largeStraight', 'kniffel', 'chance'];
    if (Object.keys({
      ...scores,
      [category]: score
    }).length === categories.length) {
      setIsGameComplete(true);
      // Calculate final total including bonus
      const newUpperSectionTotal = upperSectionCategories.reduce((sum, cat) => {
        const catScore = cat === category ? score : scores[cat];
        return sum + (catScore || 0);
      }, 0);
      const finalBonus = newUpperSectionTotal >= 63 ? 35 : 0;
      const finalTotal = Object.values({
        ...scores,
        [category]: score
      }).reduce((sum, s) => sum + (s || 0), 0) + finalBonus;
      toast({
        title: "Game Complete!",
        description: `Final Score: ${finalTotal}`
      });
    }
  }, [dice, scores, rollsLeft, calculateScore, upperSectionCategories, toast]);
  const newGame = useCallback(() => {
    setDice([{
      value: 1,
      locked: false
    }, {
      value: 1,
      locked: false
    }, {
      value: 1,
      locked: false
    }, {
      value: 1,
      locked: false
    }, {
      value: 1,
      locked: false
    }]);
    setRollsLeft(3);
    setScores({});
    setTotalScore(0);
    setIsGameComplete(false);
    setIsRolling(false);
  }, []);
  return <div className="max-w-6xl mx-auto space-y-6">
      <GameStats rollsLeft={rollsLeft} totalScore={actualTotalScore} isGameComplete={isGameComplete} />
      
      <Card className="p-6 bg-amber-50/90 backdrop-blur-sm border-2 border-amber-300 shadow-lg">
        <div className="space-y-6">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {dice.map((die, index) => <Dice key={index} value={die.value} locked={die.locked} onClick={() => toggleDiceLock(index)} disabled={rollsLeft === 3} isRolling={isRolling && !die.locked} />)}
          </div>
          
          <div className="flex justify-center gap-6 mt-8">
            <Button onClick={rollDice} disabled={rollsLeft === 0 || isGameComplete || isRolling} size="lg" className="bg-amber-700 hover:bg-amber-800 text-amber-50 font-bold py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg px-[15px] mx-0">
              {isRolling ? 'Rolling...' : rollsLeft === 3 ? 'Start Rolling!' : `Roll Dice (${rollsLeft} left)`}
            </Button>
            
            <Button onClick={newGame} variant="outline" size="lg" className="border-2 border-amber-600 text-amber-700 hover:bg-amber-100 font-bold py-3 rounded-lg transition-all duration-200 shadow-lg px-[15px]">
              New Game
            </Button>
          </div>
        </div>
      </Card>

      <ScoreCard scores={scores} onScoreCategory={scoreCategory} calculateScore={calculateScore} diceValues={dice.map(die => die.value)} canScore={rollsLeft < 3 && !isGameComplete} />
    </div>;
};
export default KniffelGame;