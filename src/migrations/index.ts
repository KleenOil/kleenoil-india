import * as migration_20260721_080443_initial from './20260721_080443_initial';
import * as migration_20260721_103007_add_layout_preset from './20260721_103007_add_layout_preset';
import * as migration_20260721_104908_remove_layout_preset from './20260721_104908_remove_layout_preset';
import * as migration_20260725_094436_add_products_and_templates from './20260725_094436_add_products_and_templates';
import * as migration_20260725_100711_pdp_hero_gallery_multiselect from './20260725_100711_pdp_hero_gallery_multiselect';
import * as migration_20260725_102037_pdp_hero_quick_spec_counter from './20260725_102037_pdp_hero_quick_spec_counter';

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
  {
    up: migration_20260725_094436_add_products_and_templates.up,
    down: migration_20260725_094436_add_products_and_templates.down,
    name: '20260725_094436_add_products_and_templates',
  },
  {
    up: migration_20260725_100711_pdp_hero_gallery_multiselect.up,
    down: migration_20260725_100711_pdp_hero_gallery_multiselect.down,
    name: '20260725_100711_pdp_hero_gallery_multiselect',
  },
  {
    up: migration_20260725_102037_pdp_hero_quick_spec_counter.up,
    down: migration_20260725_102037_pdp_hero_quick_spec_counter.down,
    name: '20260725_102037_pdp_hero_quick_spec_counter',
  },
];
