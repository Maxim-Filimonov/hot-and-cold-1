import React from 'react';
import {shallow, mount} from 'enzyme';
import HotAndColdGame from './hot-and-cold-game';

describe('<HotAndColdGame />', () => {
  let seedNumbers = [];
  beforeAll(() => {
    for (let i = 0; i < 10; i++) {
      seedNumbers.push(Math.floor(Math.random() * 100) + 1); // Math.floor(Math.random() * max) + min;
    }
  });

  it('renders without crashing', () => {
    shallow(<HotAndColdGame />);
  });

  it('should generate a number to guess between min and max number', () => {
    const wrapper = shallow(<HotAndColdGame minNumber={1} maxNumber={100} />);
    expect(wrapper.state('numberToGuess')).toBeGreaterThanOrEqual(1);
    expect(wrapper.state('numberToGuess')).toBeLessThanOrEqual(100);
  });

  it('Can start a new game', () => {
    const wrapper = shallow(<HotAndColdGame />);
    wrapper.setState({
      guessedNumbers: [1, 2, 3, 4],
      numberToGuess: 43
    });
    wrapper.instance().onSubmitRestart();
    expect(wrapper.state('guessedNumbers')).toEqual([]);
    expect(wrapper.state('guessResultText')).toEqual('Make a Guess!');
    expect(wrapper.state('numberToGuess')).toBeGreaterThanOrEqual(0);
    expect(wrapper.state('numberToGuess')).toBeLessThanOrEqual(100);
  });

  it('Can make a guess that is cold', () => {
    const wrapper = shallow(<HotAndColdGame />);
    wrapper.setState({
      numberToGuess: 50
    });

    wrapper.instance().onSubmitGuessedNumber(25);
    expect(wrapper.state('guessedNumbers')).toEqual([25]);
    expect(wrapper.state('guessResultText')).toEqual('Brr ... Cold!');
    expect(wrapper.state('guessedCorrectly')).toEqual(false);
  });

  it('Can make a guess that is kinda hot', () => {
    const wrapper = shallow(<HotAndColdGame />);
    wrapper.setState({
      numberToGuess: 50
    });

    wrapper.instance().onSubmitGuessedNumber(60);
    expect(wrapper.state('guessedNumbers')).toEqual([60]);
    expect(wrapper.state('guessResultText')).toEqual('Kinda Hot ...');
    expect(wrapper.state('guessedCorrectly')).toEqual(false);
  });

  it('Can make a guess that is hot', () => {
    const wrapper = shallow(<HotAndColdGame />);
    wrapper.setState({
      numberToGuess: 50
    });

    wrapper.instance().onSubmitGuessedNumber(54);
    expect(wrapper.state('guessedNumbers')).toEqual([54]);
    expect(wrapper.state('guessResultText')).toEqual('Hot!');
    expect(wrapper.state('guessedCorrectly')).toEqual(false);
  });

  it('Can make a guess that is correct', () => {
    const wrapper = shallow(<HotAndColdGame />);
    wrapper.setState({
      numberToGuess: 50
    });

    wrapper.instance().onSubmitGuessedNumber(50);
    expect(wrapper.state('guessedNumbers')).toEqual([50]);
    expect(wrapper.state('guessResultText')).toEqual('You Won. Click Restart Game to play again.');
    expect(wrapper.state('guessedCorrectly')).toEqual(true);
  });

});