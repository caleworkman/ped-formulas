export function calculateRatios(calories, formula) {
    const calories_per_cup = formula?.units['cup'].calories;
    const cups = Math.floor(calories / calories_per_cup);
    let remainder = calories - (cups * calories_per_cup);

    const calories_per_scoop = formula?.units['scoop'].calories;
    const scoops = Math.floor(remainder / calories_per_scoop);
    remainder = remainder - (scoops * calories_per_scoop);

    const calories_per_tbsp = formula?.units['tbsp'].calories;
    const tbsps = Math.floor(remainder / calories_per_tbsp);
    remainder = remainder - (tbsps * calories_per_tbsp);

    const calories_per_tsp = formula?.units['tsp'].calories;
    const tsps = Math.floor(remainder / calories_per_tsp);

    return {
        'numCups': cups ? cups : 0,
        'numScoops': scoops ? scoops : 0,
        'numTbsps': tbsps ? tbsps : 0,
        'numTsps': tsps ? tsps : 0
    }
}