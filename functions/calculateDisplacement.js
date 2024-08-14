import { ML_TO_OZ } from "../assets/constants";

export function calculateDisplacement(numCups, numScoops, numTbsps, numTsps, formula) {
    if (!formula) {
        return 0
    }
    
    const per_cup = numCups * formula?.units['cup'].displacement;
    const per_scoop = numScoops * formula?.units['scoop'].displacement;
    const per_tbsp = numTbsps * formula?.units['tbsp'].displacement;
    const per_tsp = numTsps * formula?.units['tsp'].displacement;
    return ML_TO_OZ * (per_cup + per_scoop + per_tbsp + per_tsp);
}