/*
 * Medicines and home safety: medication_schedule, steadi_fall_risk, when_to_call.
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
