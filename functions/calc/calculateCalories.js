export function calculateCalories(numCups, numScoops, numTbsps, numTsps, formula) {

    if (!formula) {
        return 0
    }

    const calories_per_cup = typeof(formula?.units['cup'].calories) == 'number' ? formula.units['cup'].calories : 0;
    const calories_per_scoop = typeof(formula?.units['scoop'].calories) == 'number' ? formula.units['scoop'].calories : 0;
    const calories_per_tbsp = typeof(formula?.units['tbsp'].calories) == 'number' ? formula.units['tbsp'].calories : 0;
    const calories_per_tsp = typeof(formula?.units['tsp'].calories) == 'number' ? formula.units['tsp'].calories : 0;

    return numCups * calories_per_cup + numScoops * calories_per_scoop + numTbsps * calories_per_tbsp + numTsps * calories_per_tsp
}