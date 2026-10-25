/*
 * Heart, blood pressure, sugar, breathing, weight and lab results: bp_log_summary, glucose_log_pattern, peak_flow_zone, hf_weight_zone, lab_result_reader.
 * `export const TOOLS = { <key>: definition }`. The definition interface is documented at the top of tools.js
 * (fields, toInputs, render, toText, validate, fromInputs, send, secondary, log, print, guide, timer, live).
 * Example of the smallest working definition (replace with the real tools):
 *
 *   example_key: {
 *     fields: [{ name: 'value', label: 'Value', type: 'number', required: true, min: 0, max: 10 }],
 *     toInputs: values => ({ value: values.value }),
 *     render: result => ({ summary: result.summary, cannot: 'What this does not tell you.' }),
 *     toText: result => `Result: ${result.summary}`,
 *   }
 */
export const TOOLS = {};
