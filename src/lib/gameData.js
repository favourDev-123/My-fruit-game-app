import { fruits } from './fruitData';

const nutrientMap = {};
fruits.forEach((f) => {
  f.nutrients.forEach((n) => {
    if (!nutrientMap[n]) nutrientMap[n] = [];
    nutrientMap[n].push(f);
  });
});

export const allNutrients = Object.keys(nutrientMap);
export const fruitById = Object.fromEntries(fruits.map((f) => [f.id, f]));

export function getRandomNutrient() {
  return allNutrients[Math.floor(Math.random() * allNutrients.length)];
}

export function getRoundFruits(nutrient, count = 4) {
  const correct = nutrientMap[nutrient] || [];
  if (correct.length === 0) return [];
  const correctFruit = correct[Math.floor(Math.random() * correct.length)];
  const wrong = fruits.filter((f) => !correct.includes(f));
  const shuffled = wrong.sort(() => Math.random() - 0.5).slice(0, count - 1);
  const options = [...shuffled, correctFruit].sort(() => Math.random() - 0.5);
  return { options, correctId: correctFruit.id, correctName: correctFruit.name };
}
