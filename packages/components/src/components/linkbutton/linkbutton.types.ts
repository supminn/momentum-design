import type { ValueOf } from '../../utils/types';

import { SIZES } from './linkbutton.constants';

type LinkButtonSize = ValueOf<typeof SIZES>;
interface Events {
  onClickEvent: MouseEvent;
  onKeyDownEvent: KeyboardEvent;
  onKeyUpEvent: KeyboardEvent;
  onFocusEvent: FocusEvent;
}

export type { Events, LinkButtonSize };
