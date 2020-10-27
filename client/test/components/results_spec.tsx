import React from 'react';
import ReactDOM from 'react-dom';
import {List, Map} from 'immutable';
import {shallow} from "enzyme";
import Results from '../../src/components/Results';
import {expect} from 'chai';

import Adapter from 'enzyme-adapter-react-16'

import Enzyme from 'enzyme';
Enzyme.configure({
    adapter: new Adapter(),
});

describe("Results", () => {
    it('calls next when next button is clicked', () => {
        //TODO use mount from enzyme
    });
});