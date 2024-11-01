import { ML_TO_OZ } from "../../assets/constants";

export function calculateDisplacement(
    numCups: number, 
    numScoops: number, 
    numTbsps: number, 
    numTsps: number, 
    formula, 
    outputUnit: string) : number {
        
    // These calculations are done in oz
    // Returns the unit in outputUnit

    if (!formula) {
        return 0;
    }

    if ((outputUnit.toLowerCase() != 'oz') && (outputUnit.toLowerCase() != 'ml')) {
        console.error('Bad output unit in calculateDisplacement.', outputUnit);
    }

    let per_cup = 0;
    let per_scoop = 0;
    let per_tbsp = 0;
    let per_tsp = 0;

    if (typeof(formula?.units['cup'].displacement) == 'number') {
        per_cup = numCups * formula.units['cup'].displacement;
    }

    if (typeof(formula?.units['scoop'].displacement) == 'number') {
        per_scoop = numScoops * formula.units['scoop'].displacement;
    }
    
    if (typeof(formula?.units['tbsp'].displacement) == 'number') {
        per_tbsp = numTbsps * formula.units['tbsp'].displacement;
    }
    if (typeof(formula?.units['tsp'].displacement) == 'number') {
        per_tsp = numTsps * formula.units['tsp'].displacement;
    }

    if (outputUnit.toLowerCase() == 'ml') {
        return per_cup + per_scoop + per_tbsp + per_tsp;
    } else if (outputUnit.toLowerCase() == 'oz') {
        return ML_TO_OZ * (per_cup + per_scoop + per_tbsp + per_tsp);
    } else {
        console.error('Invalid unit. This should be unreachable.')
    }
 }