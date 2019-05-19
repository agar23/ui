import React from 'react';
import { shallow, mount } from 'enzyme';
import NoItems from './NoItems';

console.error = jest.fn();

describe('<NoItem /> component', () => {
  test('should load the component in default state', () => {
    const wrapper = shallow(<NoItems />);
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should set html from props', () => {
    const props = {
      text: 'This is a test string'
    };
    const wrapper = mount(<NoItems text={props.text} />);
    expect(wrapper.html()).toMatchSnapshot();
  });
});