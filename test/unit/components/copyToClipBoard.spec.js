/**
 * @prettier
 */

import React from 'react';
import { shallow } from 'enzyme';

import CopyToClipBoard from '../../../src/webui/components/CopyToClipBoard';
import { CopyIcon } from '../../../src/webui/components/CopyToClipBoard/styles';

describe('<CopyToClipBoard /> component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CopyToClipBoard text={'copy text'} />);
  });

  test('render the component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should call the DOM APIs for copy to clipboard utility', () => {
    const event = {
      preventDefault: jest.fn(),
    };

    global.getSelection = jest.fn(() => ({
      removeAllRanges: () => {},
      addRange: () => {},
    }));

    const { document, getSelection } = global;

    wrapper.find(CopyIcon).simulate('click', event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(document.createRange).toHaveBeenCalled();
    expect(getSelection).toHaveBeenCalled();
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });
});
