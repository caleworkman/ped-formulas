import { Formula } from "../../functions/formula/Formula";


export function calculateRatios(calories: number, formula: Formula) {

    let remainder = calories;

    let cups = 0;
    let scoops = 0;
    let tbsps = 0;
    let tsps = 0;

    const calories_per_cup = formula.cup.calories;
    if (typeof(calories_per_cup) == 'number') {
        cups = Math.floor(calories / calories_per_cup);
        remainder = calories - (cups * calories_per_cup);
    }

    const calories_per_scoop = formula.scoop.calories;
    if (typeof(calories_per_scoop) == 'number') {
        scoops = Math.floor(remainder / calories_per_scoop);
        remainder = remainder - (scoops * calories_per_scoop);
    }

    const calories_per_tbsp = formula.tbsp.calories;
    if (typeof(calories_per_tbsp) == 'number') {
        tbsps = Math.floor(remainder / calories_per_tbsp);
        remainder = remainder - (tbsps * calories_per_tbsp);
    }

    const calories_per_tsp = formula.tsp.calories;
    if (typeof(calories_per_tsp) == 'number') {
        tsps = Math.floor(remainder / calories_per_tsp);
    }

    return {
        'numCups': cups,
        'numScoops': scoops,
        'numTbsps': tbsps,
        'numTsps': tsps
    }
}