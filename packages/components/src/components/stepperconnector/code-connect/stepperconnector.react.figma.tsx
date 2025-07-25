import { Connector } from '../../../../dist/react';
import figma from '@figma/code-connect';

figma.connect('<FIGMA_CONNECTOR_URL>', {
  props: {},
  example: props => {
    return <Connector {...props} />;
  },
});
