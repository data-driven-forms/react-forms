import RawComponent from '../common/component/raw-component';

### Custom form buttons

If you need completely customized buttons, you can pass a component to form renderer via `renderFormButtons` prop.

<RawComponent source="form-controls/custom-buttons" />

#### Form Buttons render props

Your component will receive same props as provided by react-final-form FormSpy component. For most use cases you will need just a few of these which are listed below. If you require full list please visit [react-final-form documentation](https://github.com/final-form/final-form#formstate).

|Prop|Type|Description|
|----|----|-----------|
|dirty|bool|`true` if the form values are different from the values it was initialized with.|
|invalid|bool|`true` if any of the fields or the form has a validation or submission error.|
|pristine|bool|`true` if the form values are the same as the initial values.|
|submitting|bool|`true` if the form is currently being submitted asynchronously.|
|valid|bool|`true` if neither the form nor any of its fields has a validation or submission error.|
|validating|bool|`true` true if the form is currently being validated asynchronously.|
|values|object|The current values of the form.|
|form|object|reat final form [FormApi](https://github.com/final-form/final-form#formapi).|