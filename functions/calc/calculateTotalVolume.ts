import { ML_TO_OZ } from "../../assets/constants";
import { VolumeUnit } from "../formula/VolumeUnits";

export function calculateTotalVolume(
    waterToMix: number, 
    waterToMixUnit: VolumeUnit, 
    displacementValue: number, 
    displacementUnit: VolumeUnit, 
    outputUnit: VolumeUnit) : number {

    // Returns the unit in outputUnit

    if ((outputUnit!= VolumeUnit.OZ) && (outputUnit != VolumeUnit.ML)) {
        console.error('Bad output unit in calculateTotalVolume.', outputUnit);
    }

    let mix = waterToMix;
    if ((waterToMixUnit == VolumeUnit.OZ) && (outputUnit == VolumeUnit.ML)) {
        mix = mix / ML_TO_OZ;
    } else if ((waterToMixUnit == VolumeUnit.ML) && (outputUnit == VolumeUnit.OZ)) {
        mix = ML_TO_OZ * mix;
    }
   
    let displacement = displacementValue;
    if ((displacementUnit == VolumeUnit.OZ) && (outputUnit == VolumeUnit.ML)) {
        displacement = displacement / ML_TO_OZ;
    } else if ((displacementUnit == VolumeUnit.ML) && (outputUnit == VolumeUnit.OZ)) {
        displacement = ML_TO_OZ * displacement;
    }

    return mix + displacement;
 }