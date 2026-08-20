'use client';

import { fieldComponents, useFormFields } from '@payloadcms/ui';
import type { ComponentType } from 'react';
import type { FieldClientComponent } from 'payload';

type ConditionRule = {
  sibling: string;
  equals?: unknown;
  notEquals?: unknown;
  truthy?: boolean;
  falsy?: boolean;
};

function siblingPath(path: string, siblingName: string): string {
  const segments = path.split('.');
  segments[segments.length - 1] = siblingName;
  return segments.join('.');
}

function isVisible(value: unknown, rule: ConditionRule): boolean {
  if ('equals' in rule) {
    return value === rule.equals;
  }

  if ('notEquals' in rule) {
    return value !== rule.notEquals;
  }

  if (rule.truthy) {
    return Boolean(value);
  }

  if (rule.falsy) {
    return !value;
  }

  return true;
}

function getRules(custom: Record<string, unknown>): ConditionRule[] {
  if (Array.isArray(custom.conditionRules)) {
    return custom.conditionRules as ConditionRule[];
  }

  if (typeof custom.conditionSibling === 'string') {
    return [
      {
        sibling: custom.conditionSibling,
        ...(Object.hasOwn(custom, 'conditionEquals') ? { equals: custom.conditionEquals } : {}),
        ...(Object.hasOwn(custom, 'conditionNotEquals')
          ? { notEquals: custom.conditionNotEquals }
          : {}),
        ...(custom.conditionTruthy ? { truthy: true } : {}),
        ...(custom.conditionFalsy ? { falsy: true } : {}),
      },
    ];
  }

  return [];
}

/**
 * Client-side show/hide so CMS fields update immediately on Vercel.
 * Payload `admin.condition` is evaluated on the server; production often
 * waits for a full reload before sibling fields appear.
 */
export const ClientConditionField: FieldClientComponent = (props) => {
  const field = props.field as {
    type: string;
    custom?: Record<string, unknown>;
    admin?: { custom?: Record<string, unknown> };
  };
  const custom = field.custom ?? field.admin?.custom ?? {};
  const rules = getRules(custom);
  const path = typeof props.path === 'string' ? props.path : '';
  const visible = useFormFields(([fields]) => {
    if (!rules.length) {
      return true;
    }

    return rules.every((rule) => {
      const value = fields[siblingPath(path, rule.sibling)]?.value;
      return isVisible(value, rule);
    });
  });

  if (!visible) {
    return null;
  }

  const Field = fieldComponents[field.type as keyof typeof fieldComponents] as
    ComponentType<Record<string, unknown>> | undefined;
  if (!Field) {
    return null;
  }

  return <Field {...(props as Record<string, unknown>)} />;
};
