import data from '../assets/formulaDetails.json';
import { Formula } from '../functions/formula/Formula';

export const formulas = data.formulas.map(f => new Formula(f));