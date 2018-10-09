import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

export const ConfigListHeader = (props) => {
  return (
    <div className="item-list__header">
      <button className="button" onClick={() => {
        props.meteorCall('configurations.insert', (err, res) => {
          if (res) {
            props.Session.set('selectedNoteId', res);
          }
        });
      }}>Create Note</button>
    </div>
  );
};

ConfigListHeader.propTypes = {
  meteorCall: React.PropTypes.func.isRequired,
  Session: React.PropTypes.object.isRequired
};

export default createContainer(() => {
  return {
    meteorCall: Meteor.call,
    Session
  };
}, ConfigListHeader);