import { NavLink } from 'react-router-dom';
import RawComponent from '../common/component/raw-component';

### Field Array Provider

Simillarly to <NavLink to='/renderer/field-provider'>FieldProvider</NavLink> Data driven forms provide an option how to inlude <a href='https://github.com/final-form/react-final-form-arrays'>React Final Form Arrays</a> in your form.

<b>Please visit their documentation to learn about functionality.</b>

#### Using FieldArrayProvider

Each component receives as a prop `FieldArrayProvider`. You can wrap you component into it and they you have an access to all functionallity.

<RawComponent source="field-array/form-fields-mapper" />