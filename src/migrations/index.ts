import * as migration_20260721_080443_initial from './20260721_080443_initial';

export const migrations = [
  {
    up: migration_20260721_080443_initial.up,
    down: migration_20260721_080443_initial.down,
    name: '20260721_080443_initial',
  },
];
