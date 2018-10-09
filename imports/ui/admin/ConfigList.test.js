import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';

import { notes } from '../fixtures/fixtures';
import { ConfigList } from './ConfigList';

if (Meteor.isClient) {
  describe('ConfigList', function () {

    it('should render ConfigListItem for each note', function () {
      const wrapper = mount(<ConfigList notes={notes}/>);

      expect(wrapper.find('ConfigListItem').length).toBe(2);
      expect(wrapper.find('ConfigListEmptyItem').length).toBe(0);
    });

    it('should render ConfigListEmptyItem if zero notes', function () {
      const wrapper = mount(<ConfigList notes={[]}/>);

      expect(wrapper.find('ConfigListItem').length).toBe(0);
      expect(wrapper.find('ConfigListEmptyItem').length).toBe(1);
    });

  });
}