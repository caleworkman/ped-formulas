import { Formula } from "../formula/Formula"

export function calculateCalories(
    numCups: number, 
    numScoops: number, 
    numTbsps: number, 
    numTsps: number, 
    formula: Formula) : number {

    if ((numCups < 0) || (numScoops < 0) || (numTbsps < 0) || (numTsps < 0)) {
        return 0;
    }

    if (!formula) {
        return 0;
    }

    const calories_per_cup = formula.cup.calories ?? 0;
    const calories_per_scoop = formula.scoop.calories ?? 0;
    const calories_per_tbsp = formula.tbsp.calories ?? 0;
    const calories_per_tsp = formula.tsp.calories ?? 0;

    return numCups * calories_per_cup + numScoops * calories_per_scoop + numTbsps * calories_per_tbsp + numTsps * calories_per_tsp
}