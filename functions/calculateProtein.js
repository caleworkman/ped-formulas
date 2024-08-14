export function calculateProtein(calories, formula) {
    if (!formula) {
        return 0
    }
    
    return calories * formula?.g_protein_per_100_cal / 100;
}