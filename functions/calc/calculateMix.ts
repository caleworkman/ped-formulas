import { ML_TO_OZ } from "../../assets/constants";
import { VolumeUnit } from "../formula/VolumeUnits";

export function calculateMix(
    volumeValue: number, 
    volumeUnit: VolumeUnit, 
    displacementValue: number, 
    displacementUnit: VolumeUnit, 
    outputUnit: VolumeUnit) {
        
    // Returns the unit in outputUnit

    if ((outputUnit != VolumeUnit.OZ) && (outputUnit != VolumeUnit.ML)) {
        console.error('Bad output unit in calculateMix.', outputUnit);
    }

    let volume = volumeValue;
    if ((volumeUnit == VolumeUnit.OZ) && (outputUnit == VolumeUnit.ML)) {
        volume = volume / ML_TO_OZ;
    } else if ((volumeUnit == VolumeUnit.ML) && (outputUnit == VolumeUnit.OZ)) {
        volume = ML_TO_OZ * volume;
    }
   
    let displacement = displacementValue;
    if ((displacementUnit == VolumeUnit.OZ) && (outputUnit == VolumeUnit.ML)) {
        displacement = displacement / ML_TO_OZ;
    } else if ((displacementUnit == VolumeUnit.ML) && (outputUnit == VolumeUnit.OZ)) {
        displacement = ML_TO_OZ * displacement;
    }

    return volume - displacement;
 }