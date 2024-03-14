import {SearchableItem} from './SearchableList';

function mesureMatchDamerauLevenshtein(a: string, b: string) {
  const lenA = a.length;
  const lenB = b.length;
  const matrix = Array(lenA + 1)
    .fill(null)
    .map(() => Array(lenB + 1).fill(0));

  for (let i = 0; i <= lenA; i++) {
    matrix[i][0] = i;
  }

  for (let j = 0; j <= lenB; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= lenA; i++) {
    for (let j = 1; j <= lenB; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost,
      );
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        matrix[i][j] = Math.min(matrix[i][j], matrix[i - 2][j - 2] + cost);
      }
    }
  }

  return matrix[lenA][lenB];
}

function mesureHamming(a: string, b: string) {
  let distance = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      distance++;
    }
  }
  return distance;
}

function scoreItems(items: SearchableItem[], query: string): SearchableItem[] {
  const scoredItems = items.map(item => {
    const score =
      (mesureMatchDamerauLevenshtein(item.title, query) +
        mesureHamming(item.title, query)) /
      2;
    return {item, score};
  });

  scoredItems.sort((a, b) => a.score - b.score);
  return scoredItems
    .filter(scoredItem => scoredItem.score < 5)
    .map(scoredItem => scoredItem.item);
}

export default scoreItems;
