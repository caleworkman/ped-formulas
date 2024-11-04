import { Formula } from "../../functions/formula/Formula";

export function calculateProtein(calories: number, formula: Formula) : number {
    if (!formula) {
        return 0
    }
    
    return calories * formula.g_protein_per_100_cal / 100;
}