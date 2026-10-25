import { syringe } from './charts.js';

/*
 * Babies and children: child_dose_check, growth_percentile, ors_planner.
 * `export const TOOLS = { <key>: definition }`. The definition interface is documented at the top of tools.js
 * (fields, toInputs, render, toText, validate, fromInputs, send, secondary, log, print, guide, timer, live).
 * Only child_dose_check exists so far, as a minimal working example of the Part A contract
 * (POST /api/tools/child_dose_check, inputs: medicine, concentration, weight, weight_units, age_months).
 */
const CONCENTRATIONS = {
  acetaminophen: [['160mg/5mL', "Children's liquid 160 mg per 5 mL"]],
  ibuprofen: [['100mg/5mL', "Children's liquid 100 mg per 5 mL"], ['50mg/1.25mL', 'Infant drops 50 mg per 1.25 mL']],
};

export const TOOLS = {
  child_dose_check: {
    intro: 'Looks up the amount printed on US labels for your child\u2019s weight band. It does not work out a dose.',
    submitLabel: 'Show the label amount',
    fields: [
      { name: 'medicine', label: 'Medicine', type: 'radio', required: true, options: [['acetaminophen', 'Acetaminophen (paracetamol)'], ['ibuprofen', 'Ibuprofen']] },
      { name: 'concentration', label: 'Product strength on the label', type: 'select', required: true, hint: 'Read it from the Drug Facts box. Do not guess.',
        options: Object.values(CONCENTRATIONS).flat() },
      { name: 'weight', label: 'Child\u2019s weight', type: 'number', required: true, units: ['kg', 'lb'], bounds: { kg: [2, 60], lb: [4.4, 132] } },
      { name: 'age_years', label: 'Age in years', type: 'number', required: true, min: 0, max: 17, step: 1 },
      { name: 'age_extra_months', label: 'And months', type: 'number', required: true, min: 0, max: 11, step: 1, value: 0 },
    ],
    toInputs: v => ({ medicine: v.medicine, concentration: v.concentration, weight: v.weight, weight_units: v.weight_unit, age_months: v.age_years * 12 + v.age_extra_months }),
    fromInputs: i => ({ medicine: i.medicine, concentration: i.concentration, weight: { value: i.weight, unit: i.weight_units }, age_years: Math.floor(i.age_months / 12), age_extra_months: i.age_months % 12 }),
    render(r) {
      if (r.hard_stop) return { summary: r.hard_stop.title ? `${r.hard_stop.title}. ${r.hard_stop.text}` : r.hard_stop.text, caveat: { text: r.hard_stop.text, urgent: true }, cannot: CANNOT };
      const notes = [r.recommendation, r.combination_warning].flat().filter(Boolean);
      const figure = r.syringe ? { html: syringe({ amount: r.syringe.amount_ml, capacity: r.syringe.capacity_ml, title: `Oral syringe marked at ${r.syringe.amount_ml} mL`, desc: `An oral syringe with the plunger at ${r.syringe.amount_ml} mL, the label amount for this weight band.` }), caption: 'Oral syringe \u00B7 the mark shows the label amount for this weight band \u00B7 not a picture of your product.' } : null;
      return { summary: r.summary, figure, rows: r.band_low_lb == null ? [] : [['Label weight band', `${r.band_low_lb}\u2013${r.band_high_lb} lb (${r.band_low_kg}\u2013${r.band_high_kg} kg)`]], notes, cannot: CANNOT, sources: r.source ? [{ label: 'Label source', url: r.source }] : [] };
    },
    toText: r => (r.hard_stop ? `Result: no amount shown. ${r.hard_stop.text}` : `Result: ${r.summary}`),
  },
};

const CANNOT = 'This is the amount printed on US labels for this weight band (AAP/FDA). It is not a dose chosen for your child, it does not cover prescription products, and it cannot tell you whether medicine is needed or why the child has a fever.';
