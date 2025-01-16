import { css } from 'lit';
import { hostFitContentStyles, hostFocusRingStyles } from '../../utils/styles';

const styles = [hostFitContentStyles, css`

  :host {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  :host([disabled]) .mdc-label,
  :host([disabled]) .footer {
    color: var(--mds-color-theme-text-primary-disabled);
  }

  .header, .footer {
    font-size: var(--mds-font-size-body-midsize);
    line-height: var(--mds-font-lineheight-body-midsize);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .mdc-label{
    color: var(--mds-color-theme-text-primary-normal);
  }

  :host([helpTextType="error"]) .footer {
    color: var(--mds-color-theme-text-error-normal);
  }
  :host([helpTextType="warning"]) .footer {
    color: var(--mds-color-theme-text-warning-normal);
  }
  :host([helpTextType="success"]) .footer {
    color: var(--mds-color-theme-text-success-normal);
  }
  :host([helpTextType="priority"]) .footer {
    color: var(--mds-color-theme-text-accent-normal);
  }

`, ...hostFocusRingStyles(true)];

export default styles;
