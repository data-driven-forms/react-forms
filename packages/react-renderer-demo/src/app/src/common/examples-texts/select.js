import React from 'react';
import GenericComponentText from './generic-mui-component';
import Pf3Select from 'docs/components/pf3-select.md';
import Pf4Select from 'docs/components/pf4-select.md';

export default ({ activeMapper }) => activeMapper === 'pf3' ? <Pf3Select /> : activeMapper === 'pf4' ? <Pf4Select /> : <GenericComponentText />;
