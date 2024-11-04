import { Formula } from "../formula/Formula";
import { VolumeUnit } from "../formula/VolumeUnits";
import { ML_TO_OZ } from "../../assets/constants";

export function calculateDisplacement(
    numCups: number, 
    numScoops: number, 
    numTbsps: number, 
    numTsps: number, 
    formula: Formula, 
    outputUnit: VolumeUnit) : number {
        
    // These calculations are done in ml
    // Returns the unit in outputUnit

    if (!formula) {
        return 0;
    }

    if ((numCups < 0) || (numScoops < 0) || (numTbsps < 0) || (numTsps < 0)) {
        return 0;
    }

    let per_cup = 0;
    let per_scoop = 0;
    let per_tbsp = 0;
    let per_tsp = 0;

    if (typeof(formula.cup.displacement) == 'number') {
        per_cup = numCups * formula.cup.displacement;
    }

    if (typeof(formula.scoop.displacement) == 'number') {
        per_scoop = numScoops * formula.scoop.displacement;
    }
    
    if (typeof(formula.tbsp.displacement) == 'number') {
        per_tbsp = numTbsps * formula.tbsp.displacement;
    }
    if (typeof(formula.tsp.displacement) == 'number') {
        per_tsp = numTsps * formula.tsp.displacement;
    }

    if (outputUnit == VolumeUnit.OZ) {
        return ML_TO_OZ * (per_cup + per_scoop + per_tbsp + per_tsp);
    } else if (outputUnit == VolumeUnit.ML) {
        return per_cup + per_scoop + per_tbsp + per_tsp;
    } else {
        console.error('Bad output unit in calculateDisplacement.')
    }

 }