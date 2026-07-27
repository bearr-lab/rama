/**
 * Basic Feature Flag Engine
 * Allows toggling features via environment variables or runtime overrides.
 */

export const FLAGS = {
  // Master switch for V2 architecture
  ENABLE_V2: process.env.NEXT_PUBLIC_ENABLE_V2 === 'true',

  // Specific feature toggles
  ENABLE_DECISION_LAB: process.env.NEXT_PUBLIC_ENABLE_DECISION_LAB === 'true',
  ENABLE_TRUST_PASSPORT:
    process.env.NEXT_PUBLIC_ENABLE_TRUST_PASSPORT === 'true',
} as const;

export type FlagName = keyof typeof FLAGS;

export function isFeatureEnabled(flag: FlagName): boolean {
  return FLAGS[flag] ?? false;
}
