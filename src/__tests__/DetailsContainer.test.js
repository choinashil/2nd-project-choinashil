import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import DetailsContainer from '../containers/DetailsContainer';

configure({ adapter: new Adapter() });

describe('DetailsContainer component', () => {
  const mockStore = configureMockStore();
  let store;

  beforeEach(() => {
    const initialState = {
      isFetching: false
    }
    store = mockStore(initialState);
  });

  const wrapper = shallow(<DetailsContainer store={store} />);

  it('should be rendered successfully', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
