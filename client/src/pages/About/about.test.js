import * as React from "react";
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from "enzyme-to-json";
import About from './About';

Enzyme.configure({adapter: new Adapter()});

// it('CheckboxWithLabel changes the text after click', () => {
//   // Render a checkbox with label in the document
//   const about = shallow(<CheckboxWithLabel labelOn="On" labelOff="Off" />);

//   expect(checkbox.text()).toEqual('Off');

//   checkbox.find('input').simulate('change');

//   expect(checkbox.text()).toEqual('On');
// });

test("should render correctly", () => {
  const wrapper = shallow(<About />);
  expect(toJson(wrapper)).toMatchSnapshot();
});