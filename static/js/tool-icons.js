import { ArrowLeft, Moon, Pause, Phone, Pill, Play, Plus, Save, Sun, Sunrise, Sunset, Syringe, Trash2, Utensils } from 'lucide';
import { inner } from './icons.js';

/** Lucide icons used only by the patient tools. Values are inner SVG markup; wrap with `svg()` from icons.js. */
export const TOOL_ICON = Object.fromEntries(Object.entries({
  back: ArrowLeft, moon: Moon, pause: Pause, phone: Phone, pill: Pill, play: Play, plus: Plus, save: Save,
  sun: Sun, sunrise: Sunrise, sunset: Sunset, syringe: Syringe, trash: Trash2, utensils: Utensils,
}).map(([key, value]) => [key, inner(value)]));
