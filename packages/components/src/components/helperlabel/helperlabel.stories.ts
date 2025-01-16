import type { Meta, StoryObj, Args } from '@storybook/web-components';
import '.';
import { html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { classArgType, styleArgType } from '../../../config/storybook/commonArgTypes';
import { VALIDATION } from './helperlabel.constants';
import { ValidationType } from './helperlabel.types';

const render = (args: Args) =>
  html` <mdc-helperlabel
    label="${args.label}"
    label-info-text="${args['label-info-text']}"
    help-text-type="${args['help-text-type']}"
    help-text="${args['help-text']}"
    class="${args.class}"
    style="${args.style}"
    >${args.children}</mdc-helperlabel
  >`;

const meta: Meta = {
  title: 'Internal/helperlabel',
  tags: ['autodocs'],
  component: 'mdc-helperlabel',
  render,
  parameters: {
    badges: ['wip'],
  },
  argTypes: {
    ...classArgType,
    ...styleArgType,
    'help-text-type': {
      control: 'select',
      options: Object.values(VALIDATION),
    },
    id: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
    'label-info-text': {
      control: 'text',
    },
    'help-text': {
      control: 'text',
    },
  },
};

export default meta;

export const Example: StoryObj = {
  args: {
    label: 'Label (required)',
    'label-info-text': 'Label info text',
    'help-text': 'Helper text',
    'help-text-type': 'default',
    children: '[Child Component]',
  },
};

export const HelperTextTypes: StoryObj = {
  render: () =>
    html` <div style="display: flex; justify-content: space-evenly; align-items: center">
      ${repeat(
    Object.values(VALIDATION),
    (validation: ValidationType) => html`
          <mdc-helperlabel help-text-type="${validation}" label="Label" help-text="Helper text"
            >[Child component]</mdc-helperlabel
          >
        `,
  )}
    </div>`,
};
