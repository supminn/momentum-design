import { css } from 'lit';

const styles = css`
  :host {
    --mdc-themeprovider-color-default: var(--mds-color-theme-text-primary-normal);
    --mdc-themeprovider-font-family: var(--mds-font-family-primary);
    --mdc-themeprovider-font-weight: 400;
    /* adjusting Inter's letter spacing to better match the old CiscoSans */
    --mdc-themeprovider-letter-spacing-adjustment: -0.25px;
    /* Adjusting font feature settings for accessibility reasons */
    --mdc-themeprovider-font-feature-settings: "ss02" on;

    /* Custom scrollbar variables */
    --mdc-themeprovider-scrollbar-width: 1rem;
    --mdc-themeprovider-scrollbar-track-color: var(--mds-color-theme-background-secondary-normal);
    --mdc-themeprovider-scrollbar-thumb-color: var(--mds-color-theme-background-tertiary-normal);
    --mdc-themeprovider-scrollbar-thumb-hover-color: var(--mds-color-theme-background-tertiary-hover);
    --mdc-themeprovider-scrollbar-thumb-active-color: var(--mds-color-theme-background-tertiary-pressed);

    color: var(--mdc-themeprovider-color-default);
    font-family: var(--mdc-themeprovider-font-family);
    font-weight: var(--mdc-themeprovider-font-weight);
    letter-spacing: var(--mdc-themeprovider-letter-spacing-adjustment);

    font-feature-settings: var(--mdc-themeprovider-font-feature-settings);
  }
   
/* Scrollbar Theme */

  /* width */
  ::-webkit-scrollbar {
    width: var(--mdc-themeprovider-scrollbar-width);
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 100vh;
    background: var(--mdc-themeprovider-scrollbar-track-color);
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background-color: var(--mdc-themeprovider-scrollbar-thumb-color);
    border: 0.25rem solid transparent;
    border-radius: 0.5rem;
    background-clip: content-box;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: var(--mdc-themeprovider-scrollbar-thumb-hover-color);
    border: 0.25rem solid transparent;
    border-radius: 0.5rem;
    background-clip: content-box;
  }

  /* Handle on press */
  ::-webkit-scrollbar-thumb:active {
    background: var(--mdc-themeprovider-scrollbar-thumb-active-color);
    border: 0.25rem solid transparent;
    border-radius: 0.5rem;
    height: 6.25rem;
    background-clip: content-box;
  }

  /* Corner */
  ::-webkit-scrollbar-corner {
    background: inherit;
  }

  /* For Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: var(--mdc-themeprovider-scrollbar-thumb-color) var(--mdc-themeprovider-scrollbar-track-color);
  }
`;

export default [styles];
