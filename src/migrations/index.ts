import * as migration_20260721_080443_initial from './20260721_080443_initial';
import * as migration_20260721_103007_add_layout_preset from './20260721_103007_add_layout_preset';
import * as migration_20260721_104908_remove_layout_preset from './20260721_104908_remove_layout_preset';

export const migrations = [
  {
    up: migration_20260721_080443_initial.up,
    down: migration_20260721_080443_initial.down,
    name: '20260721_080443_initial',
  },
  {
    up: migration_20260721_103007_add_layout_preset.up,
    down: migration_20260721_103007_add_layout_preset.down,
    name: '20260721_103007_add_layout_preset',
  },
  {
    up: migration_20260721_104908_remove_layout_preset.up,
    down: migration_20260721_104908_remove_layout_preset.down,
    name: '20260721_104908_remove_layout_preset',
  },
];
