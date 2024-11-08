import { Formula } from "../formula/Formula"
import { VolumeUnit } from "../formula/VolumeUnits";
import { ML_TO_OZ } from "../../assets/constants";

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

export function calculateCaloriesFromPerVolume(
    caloriesPerOz: number,
    volume: number,
    volumeUnit: VolumeUnit) : number {
        
    // For now, calories per volume will only be per oz, but volume can be mL or oz

    if (volumeUnit == VolumeUnit.ML) {
        return caloriesPerOz * volume * ML_TO_OZ;
    } else {
        return caloriesPerOz * volume;
    }
}