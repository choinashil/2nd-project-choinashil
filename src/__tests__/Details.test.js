import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Details from '../components/Details';

configure({ adapter: new Adapter() });

describe('Details component', () => {
  let num = 1;
  const match = { params: '' };
  const details = { likeIds: [] };
  const userId = 'id';
  const getCourseDetails = jest.fn();
  const changeFavoritesData = jest.fn(() => num++ );

  const wrapper = shallow(
    <Details
      match={match}
      details={details}
      isFetching={false}
      userId={userId}
      changeFavoritesData={changeFavoritesData}
      getCourseDetails={getCourseDetails}
    />
  );

  it('should be rendered successfully', () => {
    expect(wrapper.length).toBe(1);
    expect(getCourseDetails).toHaveBeenCalled();
  });

  it('should render user name who uploaded course data', () => {
    const userName = wrapper.find('div.Details-section-name');
    expect(userName.exists()).toBe(true);
  });

  it('should call function when user clicks heart icon', () => {
    expect(changeFavoritesData).not.toHaveBeenCalled();
    wrapper.find('div.Details-section-heart').simulate('click');
    expect(changeFavoritesData).toHaveBeenCalled();
    expect(num).toBe(2);
  });
});



