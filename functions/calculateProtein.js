export function calculateProtein(calories, formula) {
    return calories * formula?.g_protein_per_100_cal / 100;
}