import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

export const Configurations = new Mongo.Collection('configurations');

if (Meteor.isServer) {
    Meteor.publish('configurations', function () {
      return Configurations.find({});
    });
}

Meteor.methods({

    'configurations.insert'(value) {
        if (!this.userId) {
          throw new Meteor.Error('not-authorized');
        }

        new SimpleSchema({
            key: {
              type: String,
              required: true
            },
            value: {
              type: String,
              required: true
            }
          }).validate({
            ...value
          });
    
        return Configurations.insert({
          ...value,
          userId: this.userId,
          updatedAt: moment().valueOf()
        });
    },
    'configurations.update'(updates) {
        if (!this.userId) {
          throw new Meteor.Error('not-authorized');
        }
    
        new SimpleSchema({
            key: {
                type: String,
                required: true
            },
            value: {
                type: String,
                required: true
            }
        }).validate({
          ...updates
        });
    
        Configurations.update({
            key:updates.key
        }, {
          $set: {
            updatedAt: moment().valueOf(),
            value:updates.value
          }
        });
      }

});