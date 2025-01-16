import { IconNames } from '../icon/icon.types';
import { VALIDATION } from './helperlabel.constants';
import { ValidationType } from './helperlabel.types';

const getHelperIcon = (type: ValidationType): IconNames | '' => {
  const helperIconSizeMap: Record<ValidationType, IconNames | ''> = {
    [VALIDATION.ERROR]: 'error-legacy-filled',
    [VALIDATION.WARNING]: 'warning-filled',
    [VALIDATION.SUCCESS]: 'check-circle-filled',
    [VALIDATION.PRIORITY]: 'priority-circle-filled',
    [VALIDATION.DEFAULT]: '',
  };
  return helperIconSizeMap[type] || '';
};

export { getHelperIcon };
