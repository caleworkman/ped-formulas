import { ML_TO_OZ } from "../../assets/constants";

export function calculateTotalVolume(
    waterToMix: number, 
    waterToMixUnit: string, 
    displacementValue: number, 
    displacementUnit: string, 
    outputUnit: string) : number {

    // Returns the unit in outputUnit

    if ((outputUnit.toLowerCase() != 'oz') && (outputUnit.toLowerCase() != 'ml')) {
        console.error('Bad output unit in calculateTotalVolume.', outputUnit);
    }

    let mix = waterToMix;
    if ((waterToMixUnit.toLowerCase() == 'oz') && (outputUnit.toLowerCase() == 'ml')) {
        mix = mix / ML_TO_OZ;
    } else if ((waterToMixUnit.toLowerCase() == 'ml') && (outputUnit.toLowerCase() == 'oz')) {
        mix = ML_TO_OZ * mix;
    }
   
    let displacement = displacementValue;
    if ((displacementUnit.toLowerCase() == 'oz') && (outputUnit.toLowerCase() == 'ml')) {
        displacement = displacement / ML_TO_OZ;
    } else if ((displacementUnit.toLowerCase() == 'ml') && (outputUnit.toLowerCase() == 'oz')) {
        displacement = ML_TO_OZ * displacement;
    }

    return mix + displacement;
 }