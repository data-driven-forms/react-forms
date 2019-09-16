import React from 'react';
import Wizard from 'docs/components/wizard.md';
import Pf3Wizard from 'docs/components/pf3-wizard.md';
import Pf4Wizard from 'docs/components/pf4-wizard.md';

export default ({ activeMapper }) => activeMapper === 'pf3' ? <Pf3Wizard /> : activeMapper === 'pf4' ? <Pf4Wizard /> : <Wizard />;
