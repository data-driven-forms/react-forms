import React from 'react';
import { Button } from 'patternfly-react';

const ButtonOverride = (props) => <Button style={{ marginLeft: 3 }} { ...props } />;

export default ButtonOverride;
