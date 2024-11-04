export class Formula {
    
    uuid: string;
    brand: string;
    name: string;
    g_protein_per_100_cal: number;

    scoop: FormulaUnit;
    cup: FormulaUnit;
    tbsp: FormulaUnit;
    tsp: FormulaUnit;

    constructor(fields) {
        this.uuid = fields.uuid || this.uuid;
        this.brand = fields.brand || this.brand;
        this.name = fields.name || this.name;
        this.g_protein_per_100_cal = fields.g_protein_per_100_cal || this.g_protein_per_100_cal;

        const scoop = fields.units.scoop || this.scoop;
        this.scoop = new FormulaUnit(scoop.calories, scoop.grams, scoop.displacement);

        const cup = fields.units.cup || this.cup;
        this.cup = new FormulaUnit(cup.calories, cup.grams, cup.displacement);

        const tbsp = fields.units.tbsp || this.tbsp;
        this.tbsp = new FormulaUnit(tbsp.calories, tbsp.grams, tbsp.displacement);

        const tsp = fields.units.tsp || this.tsp;
        this.tsp = new FormulaUnit(tsp.calories, tsp.grams, tsp.displacement);
    }
} 

class FormulaUnit {
    // Per cup, scoop, tbsp, or tsp
    calories: number;
    grams: number;
    displacement: number; // mL

    constructor(calories: number, grams: number, displacement: number) {
        this.calories = calories;
        this.grams = grams;
        this.displacement = displacement;
    }
}