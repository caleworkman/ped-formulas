import { ML_TO_OZ } from "../../assets/constants";

export function calculateMix(volumeValue, volumeUnit, displacementValue, displacementUnit, outputUnit) {
    // Returns the unit in outputUnit

    if ((outputUnit.toLowerCase() != 'oz') || (outputUnit.toLowerCase() != 'ml')) {
        console.error('Bad output unit.');
    }

    let volume = volumeValue;
    if ((volumeUnit.toLowerCase() == 'oz') && (outputUnit.toLowerCase() == 'ml')) {
        volume = volume / ML_TO_OZ;
    } else if ((volumeUnit.toLowerCase() == 'ml') && (outputUnit.toLowerCase() == 'oz')) {
        volume = ML_TO_OZ * volume;
    }
   
    let displacement = displacementValue;
    if ((displacementUnit.toLowerCase() == 'oz') && (outputUnit.toLowerCase() == 'ml')) {
        displacement = displacement / ML_TO_OZ;
    } else if ((displacementUnit.toLowerCase() == 'ml') && (outputUnit.toLowerCase() == 'oz')) {
        displacement = ML_TO_OZ * displacement;
    }

    return volume - displacement;
 }