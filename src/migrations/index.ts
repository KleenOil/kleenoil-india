import * as migration_20260721_080443_initial from './20260721_080443_initial';
import * as migration_20260721_103007_add_layout_preset from './20260721_103007_add_layout_preset';
import * as migration_20260721_104908_remove_layout_preset from './20260721_104908_remove_layout_preset';
import * as migration_20260725_094436_add_products_and_templates from './20260725_094436_add_products_and_templates';
import * as migration_20260725_100711_pdp_hero_gallery_multiselect from './20260725_100711_pdp_hero_gallery_multiselect';
import * as migration_20260725_102037_pdp_hero_quick_spec_counter from './20260725_102037_pdp_hero_quick_spec_counter';
import * as migration_20260803_194920_featured_products_manual_cards from './20260803_194920_featured_products_manual_cards';
import * as migration_20260803_195401_featured_products_custom_engineering_card from './20260803_195401_featured_products_custom_engineering_card';
import * as migration_20260817_180000_add_about_page_blocks from './20260817_180000_add_about_page_blocks';
import * as migration_20260818_101000_process_story_spec from './20260818_101000_process_story_spec';
import * as migration_20260818_164100_featured_cards from './20260818_164100_featured_cards';
import * as migration_20260818_165000_featured_case_study_cards from './20260818_165000_featured_case_study_cards';
import * as migration_20260819_080000_distribution_network_show_map from './20260819_080000_distribution_network_show_map';

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
  {
    up: migration_20260803_194920_featured_products_manual_cards.up,
    down: migration_20260803_194920_featured_products_manual_cards.down,
    name: '20260803_194920_featured_products_manual_cards',
  },
  {
    up: migration_20260803_195401_featured_products_custom_engineering_card.up,
    down: migration_20260803_195401_featured_products_custom_engineering_card.down,
    name: '20260803_195401_featured_products_custom_engineering_card',
  },
  {
    up: migration_20260817_180000_add_about_page_blocks.up,
    down: migration_20260817_180000_add_about_page_blocks.down,
    name: '20260817_180000_add_about_page_blocks',
  },
  {
    up: migration_20260818_101000_process_story_spec.up,
    down: migration_20260818_101000_process_story_spec.down,
    name: '20260818_101000_process_story_spec',
  },
  {
    up: migration_20260818_164100_featured_cards.up,
    down: migration_20260818_164100_featured_cards.down,
    name: '20260818_164100_featured_cards',
  },
  {
    up: migration_20260818_165000_featured_case_study_cards.up,
    down: migration_20260818_165000_featured_case_study_cards.down,
    name: '20260818_165000_featured_case_study_cards',
  },
  {
    up: migration_20260819_080000_distribution_network_show_map.up,
    down: migration_20260819_080000_distribution_network_show_map.down,
    name: '20260819_080000_distribution_network_show_map',
  },
];
