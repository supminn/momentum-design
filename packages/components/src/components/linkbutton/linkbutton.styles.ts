// AI-Assisted
import { css } from 'lit';

import { hostFitContentStyles, hostFocusRingStyles } from '../../utils/styles';

const styles = [
  hostFitContentStyles,
  css`
    :host {
      --mdc-link-border-radius: 0.25rem;
      --mdc-link-color-active: var(--mds-color-theme-text-accent-active);
      --mdc-link-color-disabled: var(--mds-color-theme-text-primary-disabled);
      --mdc-link-color-hover: var(--mds-color-theme-text-accent-hover);
      --mdc-link-color-normal: var(--mds-color-theme-text-accent-normal);
      --mdc-link-inverted-color-active: var(--mds-color-theme-inverted-text-accent-active);
      --mdc-link-inverted-color-disabled: var(--mds-color-theme-inverted-text-primary-disabled);
      --mdc-link-inverted-color-hover: var(--mds-color-theme-inverted-text-accent-hover);
      --mdc-link-inverted-color-normal: var(--mds-color-theme-inverted-text-accent-normal);

      border-radius: var(--mdc-link-border-radius);
      color: var(--mdc-link-color-normal);
      text-underline-offset: auto;
      text-underline-position: from-font;
      cursor: pointer;
      gap: 0.25rem;

      /* Remove button-like styles inherited from buttonsimple */
      background: none;
      border: none;
      box-shadow: none;
      padding: 0;

      /* based on default link size (large) */
      line-height: var(--mds-font-apps-body-large-regular-line-height);
    }

    :host([inline]) {
      display: inline-flex;
    }

    :host([inverted]) {
      color: var(--mdc-link-inverted-color-normal);
    }

    :host(:hover) {
      color: var(--mdc-link-color-hover);
      background: none;
      box-shadow: none;
    }

    :host(:active) {
      color: var(--mdc-link-color-active);
      box-shadow: none;
      background: none;
    }

    :host([inverted]:hover) {
      color: var(--mdc-link-inverted-color-hover);
    }

    :host([inverted]:active) {
      color: var(--mdc-link-inverted-color-active);
    }

    :host([disabled]) {
      color: var(--mdc-link-color-disabled);
      pointer-events: none;
      background: none;
      box-shadow: none;
    }

    :host([inverted][disabled]) {
      color: var(--mdc-link-inverted-color-disabled);
    }

    :host([soft-disabled]) {
      color: var(--mdc-link-color-disabled);
      background: none;
      box-shadow: none;
    }

    :host([inverted][soft-disabled]) {
      color: var(--mdc-link-inverted-color-disabled);
    }

    /* Link size styles */

    :host([link-size='large']) {
      font-size: var(--mds-font-apps-body-large-regular-font-size);
      font-weight: var(--mds-font-apps-body-large-regular-font-weight);
      line-height: var(--mds-font-apps-body-large-regular-line-height);
      text-decoration: var(--mds-font-apps-body-large-regular-text-decoration);
      text-transform: var(--mds-font-apps-body-large-regular-text-case);
    }

    :host([link-size='midsize']) {
      font-size: var(--mds-font-apps-body-midsize-regular-font-size);
      font-weight: var(--mds-font-apps-body-midsize-regular-font-weight);
      line-height: var(--mds-font-apps-body-midsize-regular-line-height);
      text-decoration: var(--mds-font-apps-body-midsize-regular-text-decoration);
      text-transform: var(--mds-font-apps-body-midsize-regular-text-case);
    }

    :host([link-size='small']) {
      font-size: var(--mds-font-apps-body-small-regular-font-size);
      font-weight: var(--mds-font-apps-body-small-regular-font-weight);
      line-height: var(--mds-font-apps-body-small-regular-line-height);
      text-decoration: var(--mds-font-apps-body-small-regular-text-decoration);
      text-transform: var(--mds-font-apps-body-small-regular-text-case);
    }

    :host([link-size='large']:hover),
    :host([link-size='large']:active),
    :host([link-size='large'][inline]) {
      font-size: var(--mds-font-apps-body-large-regular-underline-font-size);
      font-weight: var(--mds-font-apps-body-large-regular-underline-font-weight);
      line-height: var(--mds-font-apps-body-large-regular-underline-line-height);
      text-decoration: var(--mds-font-apps-body-large-regular-underline-text-decoration);
      text-transform: var(--mds-font-apps-body-large-regular-underline-text-case);
    }

    :host([link-size='midsize']:hover),
    :host([link-size='midsize']:active),
    :host([link-size='midsize'][inline]) {
      font-size: var(--mds-font-apps-body-midsize-regular-underline-font-size);
      font-weight: var(--mds-font-apps-body-midsize-regular-underline-font-weight);
      line-height: var(--mds-font-apps-body-midsize-regular-underline-line-height);
      text-decoration: var(--mds-font-apps-body-midsize-regular-underline-text-decoration);
      text-transform: var(--mds-font-apps-body-midsize-regular-underline-text-case);
    }

    :host([link-size='small']:hover),
    :host([link-size='small']:active),
    :host([link-size='small'][inline]) {
      font-size: var(--mds-font-apps-body-small-regular-underline-font-size);
      font-weight: var(--mds-font-apps-body-small-regular-underline-font-weight);
      line-height: var(--mds-font-apps-body-small-regular-underline-line-height);
      text-decoration: var(--mds-font-apps-body-small-regular-underline-text-decoration);
      text-transform: var(--mds-font-apps-body-small-regular-underline-text-case);
    }

    /* Default hover/active/inline styles for when no specific size is set */
    :host(:hover),
    :host(:active),
    :host([inline]) {
      font-size: var(--mds-font-apps-body-large-regular-underline-font-size);
      font-weight: var(--mds-font-apps-body-large-regular-underline-font-weight);
      line-height: var(--mds-font-apps-body-large-regular-underline-line-height);
      text-decoration: var(--mds-font-apps-body-large-regular-underline-text-decoration);
      text-transform: var(--mds-font-apps-body-large-regular-underline-text-case);
    }
  `,
  ...hostFocusRingStyles(),
];

export default styles;
// End AI-Assisted
