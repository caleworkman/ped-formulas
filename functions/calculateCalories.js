export function calculateCalories(numCups, numScoops, numTbsps, numTsps, formula) {

    if (!formula) {
        return 0
    }

    const calories_per_cup = formula?.units['cup'].calories;
    const calories_per_scoop = formula?.units['scoop'].calories;
    const calories_per_tbsp = formula?.units['tbsp'].calories;
    const calories_per_tsp = formula?.units['tsp'].calories;
    return numCups * calories_per_cup + numScoops * calories_per_scoop + numTbsps * calories_per_tbsp + numTsps * calories_per_tsp
}