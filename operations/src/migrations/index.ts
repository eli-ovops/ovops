import * as migration_20260725_075553_lead_foundation from './20260725_075553_lead_foundation';
import * as migration_20260725_081200_security_guards from './20260725_081200_security_guards';

export const migrations = [
  {
    up: migration_20260725_075553_lead_foundation.up,
    down: migration_20260725_075553_lead_foundation.down,
    name: '20260725_075553_lead_foundation'
  },
  {
    up: migration_20260725_081200_security_guards.up,
    down: migration_20260725_081200_security_guards.down,
    name: '20260725_081200_security_guards'
  },
];
