import { CSSResult, html, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import type { LinkSize } from '../link/link.types';
import { DEFAULTS as LINK_DEFAULTS } from '../link/link.constants';
import { IconNameMixin } from '../../utils/mixins/IconNameMixin';
import Buttonsimple from '../buttonsimple/buttonsimple.component';
import { ROLE } from '../../utils/roles';

import { DEFAULTS } from './linkbutton.constants';
import styles from './linkbutton.styles';
// import { LinkButtonSize } from './linkbutton.types';

/**
 * `mdc-linkbutton` combines the functional behavior of `mdc-buttonsimple` with the visual styling
 * of `mdc-link`. This component looks like a link but functions as a button.
 *
 * ### Features:
 * - Visually resembles a link (similar to `mdc-link` styling).
 * - Functionally behaves like a button (click handlers, no navigation).
 * - Supports link-like styling attributes (size, inline, inverted).
 * - Inherits accessibility and keyboard interaction support from `mdc-buttonsimple`.
 * - Supports disabled and soft-disabled states.
 *
 * @dependency mdc-icon
 *
 * @tagname mdc-linkbutton
 *
 * @slot - Text content of the linkbutton.
 *
 * @event click - (React: onClick) Fired when the user activates the linkbutton using a mouse or assistive technology.
 * @event keydown - (React: onKeyDown) Fired when the user presses a key while the linkbutton has focus.
 * @event focus - (React: onFocus) Fired when the linkbutton receives keyboard or mouse focus.
 * @event blur - (React: onBlur) Fired when the linkbutton loses keyboard or mouse focus.
 *
 * @cssproperty --mdc-link-border-radius - Border radius of the linkbutton.
 * @cssproperty --mdc-link-color-active - Color of the linkbutton in the active state.
 * @cssproperty --mdc-link-color-disabled - Color of the linkbutton in the disabled state.
 * @cssproperty --mdc-link-color-hover - Color of the linkbutton in the hover state.
 * @cssproperty --mdc-link-color-normal - Color of the linkbutton in the normal state.
 * @cssproperty --mdc-link-inverted-color-active - Color of the inverted linkbutton in the active state.
 * @cssproperty --mdc-link-inverted-color-disabled - Color of the inverted linkbutton in the disabled state.
 * @cssproperty --mdc-link-inverted-color-hover - Color of the inverted linkbutton in the hover state.
 * @cssproperty --mdc-link-inverted-color-normal - Color of the inverted linkbutton in the normal state.
 */
class Linkbutton extends IconNameMixin(Buttonsimple) {
  /**
   * Size of the linkbutton.
   * Acceptable values include:
   *
   * - 'small'
   * - 'midsize'
   * - 'large'
   *
   * @default large
   */
  @property({ type: String, reflect: true, attribute: 'link-size' })
  linkSize: LinkSize = LINK_DEFAULTS.LINK_SIZE;

  /**
   * When set to true, the linkbutton will be displayed inline with surrounding content.
   * By default, linkbuttons are displayed as block-level elements.
   *
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  inline: boolean = DEFAULTS.INLINE;

  /**
   * When set to true, the linkbutton will use inverted colors suitable for dark backgrounds.
   *
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  inverted: boolean = DEFAULTS.INVERTED;

  // @property({ type: String, reflect: true })
  // override size: LinkButtonSize = DEFAULTS.SIZE;

  public override update(changedProperties: PropertyValues): void {
    super.update(changedProperties);
  }

  override connectedCallback() {
    super.connectedCallback();
    this.role = ROLE.BUTTON;
    this.active = undefined as unknown as boolean;
  }

  public override render() {
    return html`<slot></slot>`;
  }

  public static override styles: Array<CSSResult> = [...Buttonsimple.styles, ...styles];
}

export default Linkbutton;
