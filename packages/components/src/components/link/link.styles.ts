import { css } from 'lit';
import { hostFitContentStyles, hostFocusRingStyles } from '../../utils/styles';

const styles = [hostFitContentStyles, css`

  :host {

    --mdc-link-border-radius: 0.25rem;
    --mdc-link-color-active: var(--mds-color-theme-text-accent-active);
    --mdc-link-color-disabled: var(--mds-color-theme-text-primary-disabled);
    --mdc-link-color-hover: var(--mds-color-theme-text-accent-hover);
    --mdc-link-color-normal: var(--mds-color-theme-text-accent-normal);
    --mdc-link-icon-margin-left: 0.25rem;
    --mdc-link-inverted-color-active: var(--mds-color-theme-inverted-text-accent-active);
    --mdc-link-inverted-color-disabled: var(--mds-color-theme-inverted-text-primary-disabled);
    --mdc-link-inverted-color-hover: var(--mds-color-theme-inverted-text-accent-hover);
    --mdc-link-inverted-color-normal: var(--mds-color-theme-inverted-text-accent-normal);
    --mdc-link-text-decoration-disabled: underline;
  }

  :host::part(link-container){
    border-radius: var(--mdc-link-border-radius);
    color: var(--mdc-link-color-normal);
  }

  ::slotted(a) {
    outline: none;
    align-items: center;
    color: inherit;
    display: flex;
    gap: var(--mdc-link-icon-margin-left);
    text-decoration: inherit;
    text-underline-offset: auto;
    text-underline-position: from-font;
  }

  :host(:hover)::part(link-container) {
    color: var(--mdc-link-color-hover);
  }

  :host(:active)::part(link-container) {
    color: var(--mdc-link-color-active);
  }

  :host([inline]) {
    display: inline-flex;
  }

  :host([inverted])::part(link-container) {
    color: var(--mdc-link-inverted-color-normal);
  }

  :host([inverted]:hover)::part(link-container) {
    color: var(--mdc-link-inverted-color-hover);
  }

  :host([inverted]:active)::part(link-container) {
    color: var(--mdc-link-inverted-color-active);
  }

  :host([size="large"])::part(link-container) {
    font-size: var(--mds-font-apps-body-large-regular-font-size);
    font-weight: var(--mds-font-apps-body-large-regular-font-weight);
    line-height: var(--mds-font-apps-body-large-regular-line-height);
    text-decoration: var(--mds-font-apps-body-large-regular-text-decoration);
    text-transform: var(--mds-font-apps-body-large-regular-text-case);
  }

  :host([size="midsize"])::part(link-container) {
    font-size: var(--mds-font-apps-body-midsize-regular-font-size);
    font-weight: var(--mds-font-apps-body-midsize-regular-font-weight);
    line-height: var(--mds-font-apps-body-midsize-regular-line-height);
    text-decoration: var(--mds-font-apps-body-midsize-regular-text-decoration);
    text-transform: var(--mds-font-apps-body-midsize-regular-text-case);
  }

  :host([size="small"])::part(link-container) {
    font-size: var(--mds-font-apps-body-small-regular-font-size);
    font-weight: var(--mds-font-apps-body-small-regular-font-weight);
    line-height: var(--mds-font-apps-body-small-regular-line-height);
    text-decoration: var(--mds-font-apps-body-small-regular-text-decoration);
    text-transform: var(--mds-font-apps-body-small-regular-text-case);
  }

  :host([size="large"]:hover)::part(link-container),
  :host([size="large"]:active)::part(link-container),
  :host([size="large"][inline])::part(link-container) {
    font-size: var(--mds-font-apps-body-large-regular-underline-font-size);
    font-weight: var(--mds-font-apps-body-large-regular-underline-font-weight);
    line-height: var(--mds-font-apps-body-large-regular-underline-line-height);
    text-decoration: var(--mds-font-apps-body-large-regular-underline-text-decoration);
    text-transform: var(--mds-font-apps-body-large-regular-underline-text-case);
  }

  :host([size="midsize"]:hover)::part(link-container),
  :host([size="midsize"]:active)::part(link-container),
  :host([size="midsize"][inline])::part(link-container) {
    font-size: var(--mds-font-apps-body-midsize-regular-underline-font-size);
    font-weight: var(--mds-font-apps-body-midsize-regular-underline-font-weight);
    line-height: var(--mds-font-apps-body-midsize-regular-underline-line-height);
    text-decoration: var(--mds-font-apps-body-midsize-regular-underline-text-decoration);
    text-transform: var(--mds-font-apps-body-midsize-regular-underline-text-case);
  }

  :host([size="small"]:hover)::part(link-container),
  :host([size="small"]:active)::part(link-container),
  :host([size="small"][inline])::part(link-container) {
    font-size: var(--mds-font-apps-body-small-regular-underline-font-size);
    font-weight: var(--mds-font-apps-body-small-regular-underline-font-weight);
    line-height: var(--mds-font-apps-body-small-regular-underline-line-height);
    text-decoration: var(--mds-font-apps-body-small-regular-underline-text-decoration);
    text-transform: var(--mds-font-apps-body-small-regular-underline-text-case);
  }

  :host([disabled])::part(link-container) {
    color: var(--mdc-link-color-disabled);
    pointer-events: none;
  }

  :host([inverted][disabled])::part(link-container) {
    color: var(--mdc-link-inverted-color-disabled);
  }
`, ...hostFocusRingStyles(true),
css`
  :host(:active)::part(link-container) {
    box-shadow: none;
  }
`];

export default styles;
