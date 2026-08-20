import type { Field } from 'payload';

export const CLIENT_CONDITION_FIELD = '/components/admin/ClientConditionField#ClientConditionField';

export type ClientConditionRule = {
  sibling: string;
  equals?: unknown;
  notEquals?: unknown;
  truthy?: boolean;
  falsy?: boolean;
};

function existingRules(custom: Record<string, unknown>): ClientConditionRule[] {
  if (Array.isArray(custom.conditionRules)) {
    return custom.conditionRules as ClientConditionRule[];
  }

  if (typeof custom.conditionSibling === 'string') {
    const rule: ClientConditionRule = { sibling: custom.conditionSibling };
    if (Object.hasOwn(custom, 'conditionEquals')) {
      rule.equals = custom.conditionEquals;
    }
    if (Object.hasOwn(custom, 'conditionNotEquals')) {
      rule.notEquals = custom.conditionNotEquals;
    }
    if (custom.conditionTruthy) {
      rule.truthy = true;
    }
    if (custom.conditionFalsy) {
      rule.falsy = true;
    }
    return [rule];
  }

  return [];
}

/** Replace server-only admin.condition with a client field that reacts instantly. */
export function withClientCondition(field: Field, rule: ClientConditionRule): Field {
  const existingCustom =
    'custom' in field && field.custom && typeof field.custom === 'object'
      ? (field.custom as Record<string, unknown>)
      : {};

  const custom: Record<string, unknown> = {
    ...existingCustom,
    conditionRules: [...existingRules(existingCustom), rule],
  };

  const admin = 'admin' in field && field.admin ? field.admin : {};
  const { condition: _condition, ...restAdmin } = admin;
  const existingAdminCustom =
    'custom' in restAdmin && restAdmin.custom && typeof restAdmin.custom === 'object'
      ? (restAdmin.custom as Record<string, unknown>)
      : {};

  return {
    ...field,
    custom,
    admin: {
      ...restAdmin,
      custom: {
        ...existingAdminCustom,
        conditionRules: custom.conditionRules,
      },
      components: {
        ...('components' in restAdmin ? restAdmin.components : {}),
        Field: CLIENT_CONDITION_FIELD,
      },
    },
  } as Field;
}
