import utils from '../../utils/tag-name';

const TAG_NAME = utils.constructTagName('linkbutton');

const SIZES = {
  LARGE: 'large',
  MIDSIZE: 'midsize',
  SMALL: 'small',
} as const;

const DEFAULTS = {
  INLINE: false,
  INVERTED: false,
  SIZE: SIZES.MIDSIZE,
} as const;

export { TAG_NAME, DEFAULTS, SIZES };
