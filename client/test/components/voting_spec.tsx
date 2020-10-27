
import Vote from "../../src/components/Vote";
import {shallow} from "enzyme";
import { expect } from "chai";
import React from "react";
import Adapter from 'enzyme-adapter-react-16'

import Enzyme from 'enzyme';
Enzyme.configure({
    adapter: new Adapter(),
})
describe("Voting", () => {

    it('renders a pair of buttons', () => {
        const wrapper = shallow(
            <Vote pair={["Borat", "Fight Club"]}/>
        );
        expect(wrapper.contains(<h1>{"Borat"}</h1>)).to.equal(true);
        expect(wrapper.contains(<h1>{"Fight Club"}</h1>)).to.equal(true);
    });

    it('does a callback whena  button is clicked', () => {
        let votedWith;
        const vote = (entry: string) => votedWith = entry;
        const wrapper = shallow(
            <Vote pair={["Borat", "Fight Club"]} vote={vote}/>
        )
        const buttons = wrapper.find("button");
        buttons.at(0).simulate("click");
        expect(votedWith).to.equal("Borat");
    });
});