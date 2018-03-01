import React from 'react';
import {shallow, mount} from 'enzyme';
import HotAndColdApp from './hot-and-cold-app';

describe('<HotAndColdApp />', () => {
  let seedNumbers = [];
  beforeAll(() => {
    for (let i = 0; i < 10; i++) {
      seedNumbers.push(Math.floor(Math.random() * 100) + 1); // Math.floor(Math.random() * max) + min;
    }
  });

  it('renders without crashing', () => {
    shallow(<HotAndColdApp />);
  });

  it('can add guessed numbers to the state', () => {
    const wrapper = shallow(<HotAndColdApp />);
    const instance = wrapper.instance();
    seedNumbers.forEach(instance.addGuessedNumber);
    expect(wrapper.state('guessedNumbers').length).toEqual(seedNumbers.length);
  });

  it('should generate a number to guess between min and max number', () => {
    const wrapper = shallow(<HotAndColdApp minNumber="1" maxNumber="100" />);
    expect(wrapper.state('numberToGuess')).toBeDefined();
  });
  
});