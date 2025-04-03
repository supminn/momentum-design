import { CSSResult, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import styles from './card.styles';
import { Component } from '../../models';
import { CardOrientation, CardVariant } from './card.types';
import { DEFAULTS } from './card.constants';
import { IconNameMixin } from '../../utils/mixins/IconNameMixin';

/**
 * card component, which ...
 *
 * @tagname mdc-card
 *
 * @slot body - This slot is for passing the text content for the card
 *
 * @event click - (React: onClick) This event is a Click Event, update the description
 *
 * @cssproperty --custom-property-name - Description of the CSS custom property
 */
class Card extends IconNameMixin(Component) {
  @property({ type: String, attribute: 'card-title' })
  public cardTitle: string = '';

  @property({ type: String })
  public subtitle: string = '';

  @property({ type: String, attribute: 'image-src' })
  public imageSrc: string = '';

  @property({ type: String, attribute: 'image-alt' })
  public imageAlt: string = '';

  @property({ type: String })
  public variant: CardVariant = DEFAULTS.VARIANT;

  @property({ type: String, reflect: true })
  public orientation: CardOrientation = DEFAULTS.ORIENTATION;

  @property({ type: String, attribute: 'icon-aria-label' })
  public iconAriaLabel: string = '';

  public renderImage() {
    if (!this.imageSrc) {
      return nothing;
    }
    return html`<img part="image" src="${this.imageSrc}" alt="${this.imageAlt}"/>`;
  }

  public renderHeader() {
    if (!this.cardTitle) {
      return nothing;
    }
    return html`<div part="header">
      ${this.iconName ? html`<mdc-icon part="icon"
            size="${DEFAULTS.ICON_SIZE}" 
            length-unit="${DEFAULTS.ICON_LENGTH_UNIT}" 
            name="${this.iconName}"></mdc-icon>`
    : nothing}
      <div>
      <mdc-text part="title" type="${DEFAULTS.TITLE_TYPE}" tagname="${DEFAULTS.TAGNAME}">${this.cardTitle}</mdc-text>
      ${this.subtitle ? html`<mdc-text part="subtitle"
         type="${DEFAULTS.SUBTITLE_TYPE}" 
         tagname="${DEFAULTS.TAGNAME}">${this.subtitle}</mdc-text>` : nothing}
      </div>
    </div>`;
  }

  public override render() {
    return html`
    ${this.renderImage()}
      <div part="body">
      ${this.renderHeader()}
        <slot name="slot1"></slot>
        <slot name="body"></slot>
        <slot name="slot2"></slot>
      </div>
    `;
  }

  public static override styles: Array<CSSResult> = [...Component.styles, ...styles];
}

export default Card;
