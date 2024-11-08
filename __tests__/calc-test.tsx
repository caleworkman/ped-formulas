import { calculateCalories, calculateCaloriesFromPerVolume } from "../functions/calc/calculateCalories";
import { calculateDisplacement } from "../functions/calc/calculateDisplacement";
import { calculateMix } from "../functions/calc/calculateMix";
import { calculateProtein } from "../functions/calc/calculateProtein";
import { calculateRatios } from "../functions/calc/calculateRatios";
import { calculateTotalVolume } from "../functions/calc/calculateTotalVolume";

import { Formula } from "../functions/formula/Formula";
import { VolumeUnit } from "../functions/formula/VolumeUnits";

const nutramigen_raw =         
{
    "uuid": "e528ec18-1d5a-4025-ac94-7887f23f7f40",
    "brand": "MEAD JOHNSON",
    "name": "Nutramigen (SE) (packed)",
    "g_protein_per_100_cal": 2.8,
    "units": {
        "scoop": {
            "calories": 45.0,
            "grams": 9.0,
            "displacement": 6.8
        },
        "cup": {
            "calories": 510.0,
            "grams": 102.0,
            "displacement": 79.6
        },
        "tbsp": {
            "calories": 31.9,
            "grams": 6.4,
            "displacement": 5.0
        },
        "tsp": {
            "calories": 10.6,
            "grams": 2.1,
            "displacement": 1.7
        }
    }
}

const nutramigen = new Formula(nutramigen_raw);

test('Calculate calories', () => {
    
    // per unit  
    expect(calculateCalories(0, 0, 0, 0, nutramigen)).toBeCloseTo(0);
    expect(calculateCalories(1, 0, 0, 0, nutramigen)).toBeCloseTo(510.0, 1); // cup
    expect(calculateCalories(0, 1, 0, 0, nutramigen)).toBeCloseTo(45.0, 1);  // scoop
    expect(calculateCalories(0, 0, 1, 0, nutramigen)).toBeCloseTo(31.9, 1);  // tbsp
    expect(calculateCalories(0, 0, 0, 1, nutramigen)).toBeCloseTo(10.6, 1);  // tsp

    // combinations
    expect(calculateCalories(1, 1, 1, 1, nutramigen)).toBeCloseTo(597.5, 1);
    expect(calculateCalories(6, 2, 5, 1, nutramigen)).toBeCloseTo(3320.1, 1);

    // bad inputs
    expect(calculateCalories(-1, 3, 5, 1, nutramigen)).toBe(0);
    expect(calculateCalories(1, -3, 5, 1, nutramigen)).toBe(0);
    expect(calculateCalories(1, 3, -5, 1, nutramigen)).toBe(0);
    expect(calculateCalories(1, 3, 5, -1, nutramigen)).toBe(0);

});

test('Calculate calories from per oz', () => {
    expect(calculateCaloriesFromPerVolume(100, 10, VolumeUnit.OZ)).toBe(1000);
    expect(calculateCaloriesFromPerVolume(100, 295.735, VolumeUnit.ML)).toBeCloseTo(1000, 1);
})

test('Calculate displacement', () => {
    // per unit  
    // oz
    expect(calculateDisplacement(0, 0, 0, 0, nutramigen, VolumeUnit.OZ)).toBe(0);
    expect(calculateDisplacement(1, 0, 0, 0, nutramigen, VolumeUnit.OZ)).toBeCloseTo(2.7, 1); // cup
    expect(calculateDisplacement(0, 1, 0, 0, nutramigen, VolumeUnit.OZ)).toBeCloseTo(0.2, 1); // scoop
    expect(calculateDisplacement(0, 0, 1, 0, nutramigen, VolumeUnit.OZ)).toBeCloseTo(0.2, 1); // tbsp
    expect(calculateDisplacement(0, 0, 0, 1, nutramigen, VolumeUnit.OZ)).toBeCloseTo(0.1, 1); // tsp

    // mL
    expect(calculateDisplacement(0, 0, 0, 0, nutramigen, VolumeUnit.ML)).toBe(0);
    expect(calculateDisplacement(1, 0, 0, 0, nutramigen, VolumeUnit.ML)).toBeCloseTo(79.6, 1); // cup
    expect(calculateDisplacement(0, 1, 0, 0, nutramigen, VolumeUnit.ML)).toBeCloseTo(6.8, 1);  // scoop
    expect(calculateDisplacement(0, 0, 1, 0, nutramigen, VolumeUnit.ML)).toBeCloseTo(5.0, 1);  // tbsp
    expect(calculateDisplacement(0, 0, 0, 1, nutramigen, VolumeUnit.ML)).toBeCloseTo(1.7, 1);  // tsp

    // combinations
    expect(calculateDisplacement(1, 1, 1, 1, nutramigen, VolumeUnit.OZ)).toBeCloseTo(3.1, 1);
    expect(calculateDisplacement(6, 2, 5, 1, nutramigen, VolumeUnit.OZ)).toBeCloseTo(17.5, 1)

    // bad inputs
    expect(calculateDisplacement(-1, 3, 5, 1, nutramigen, VolumeUnit.OZ)).toBe(0);
    expect(calculateDisplacement(1, -3, 5, 1, nutramigen, VolumeUnit.OZ)).toBe(0);
    expect(calculateDisplacement(1, 3, -5, 1, nutramigen, VolumeUnit.OZ)).toBe(0);
    expect(calculateDisplacement(1, 3, 5, -1, nutramigen, VolumeUnit.OZ)).toBe(0);
})

test('Calculate water to mix', () => {
    expect(calculateMix(10, VolumeUnit.OZ, 3, VolumeUnit.OZ, VolumeUnit.OZ)).toBe(7);
    expect(calculateMix(10, VolumeUnit.OZ, 88.7, VolumeUnit.ML, VolumeUnit.OZ)).toBeCloseTo(7, 1);
    expect(calculateMix(295.7, VolumeUnit.ML, 88.7, VolumeUnit.ML, VolumeUnit.OZ)).toBeCloseTo(7, 1);

    expect(calculateMix(100, VolumeUnit.ML, 30, VolumeUnit.ML, VolumeUnit.ML)).toBe(70);
    expect(calculateMix(100, VolumeUnit.ML, 1.01, VolumeUnit.OZ, VolumeUnit.ML)).toBeCloseTo(70.1, 1);
    expect(calculateMix(3.38, VolumeUnit.OZ, 30, VolumeUnit.ML, VolumeUnit.ML)).toBeCloseTo(70, 1);
})

test('Calculate protein', () => {
    expect(calculateProtein(0, nutramigen)).toBe(0)
    expect(calculateProtein(100, nutramigen)).toBe(2.8)
    expect(calculateProtein(200, nutramigen)).toBe(5.6)
})

test('Calculate servings', () => {
    let { numCups, numScoops, numTbsps, numTsps } = calculateRatios(220, nutramigen);
    expect(numCups).toBe(0);
    expect(numScoops).toBe(4);
    expect(numTbsps).toBe(1);
    expect(numTsps).toBe(0);

    ({ numCups, numScoops, numTbsps, numTsps } = calculateRatios(2173, nutramigen));
    expect(numCups).toBe(4);
    expect(numScoops).toBe(2);
    expect(numTbsps).toBe(1);
    expect(numTsps).toBe(1);
})

test('Calculate total volume', () => {
    expect(calculateTotalVolume(10, VolumeUnit.OZ, 3, VolumeUnit.OZ, VolumeUnit.OZ)).toBe(13);
    expect(calculateTotalVolume(10, VolumeUnit.OZ, 88.7, VolumeUnit.ML, VolumeUnit.OZ)).toBeCloseTo(12.9, 0);
    expect(calculateTotalVolume(295.7, VolumeUnit.ML, 88.7, VolumeUnit.ML, VolumeUnit.OZ)).toBeCloseTo(13, 1);

    expect(calculateTotalVolume(100, VolumeUnit.ML, 30, VolumeUnit.ML, VolumeUnit.ML)).toBe(130);
    expect(calculateTotalVolume(100, VolumeUnit.ML, 1.01, VolumeUnit.OZ, VolumeUnit.ML)).toBeCloseTo(129.9, 1);
    expect(calculateTotalVolume(3.38, VolumeUnit.OZ, 30, VolumeUnit.ML, VolumeUnit.ML)).toBeCloseTo(130, 1);
})