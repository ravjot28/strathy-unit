import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import { Notes } from '../api/notes';
import ConfigListHeader from './ConfigListHeader';
import ConfigListItem from './ConfigListItem';
import ConfigListEmptyItem from './ConfigListEmptyItem';

export const ConfigList = (props) => {
  return (
    <div className="item-list">
      <ConfigListHeader/>
      { props.notes.length === 0 ? <ConfigListEmptyItem/> : undefined }
      {props.notes.map((note) => {
        return <ConfigListItem key={note._id} note={note}/>;
      })}
    </div>
  );
};

ConfigList.propTypes = {
  notes: React.PropTypes.array.isRequired
};

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  Meteor.subscribe('configurations');

  return {
    notes: Notes.find({}, {
      sort: {
        updatedAt: -1
      }
    }).fetch().map((note) => {
      return {
        ...note,
        selected: note._id === selectedNoteId
      };
    })
  };
}, ConfigList);