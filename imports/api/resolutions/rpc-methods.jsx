import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import Resolutions from './resolutions-collection.jsx';

/**
 * Using ValidatedMethod (maintained by MDG) is the best
 * practice by Meteor Development Group (MDG),
 * and as such is used here to validate that method
 * calls from the client are properly handled.
 *
 */

/**
 * Client side insert method.
 * *Disabled by default. Uncomment return of method to enable*
 *
 * @memberof Server.Resolutions
 * @method
 * @property { string }     name        String that defines the method.
 * @property { function }   validate    Is run before the main execution.
 * @property { function }   run         The main action that is executed.
 */
const insertResolutions = new ValidatedMethod({
  name: 'resolutions.insert',
  validate: null,
  run(doc) {
    return Resolutions.insert(doc);
  },
});

/**
 * Client side update method.
 * *Disabled by default. Uncomment return of method to enable*
 *
 * @memberof Server.Resolutions
 * @method
 * @property { string }     name        String that defines the method.
 * @property { function }   validate    Is run before the main execution.
 * @property { function }   run         The main action that is executed.
 */
const updateResolutions = new ValidatedMethod({
  name: 'resolutions.update',
  validate: null,
  run([docId, obj]) {
    return Resolutions.update(docId, { $set: obj });
  },
});

/**
 * Client side remove method.
 * *Disabled by default. Uncomment return of method to enable*
 *
 * @memberof Server.Resolutions
 * @method
 * @property { string }     name        String that defines the method.
 * @property { function }   validate    Is run before the main execution.
 * @property { function }   run         The main action that is executed.
 */
const removeResolutions = new ValidatedMethod({
  name: 'resolutions.remove',
  validate: null,
  run(docId) {
    return Resolutions.remove(docId);
  },
});

const RATE_LIMITED_METHODS = _.pluck([
  insertResolutions, updateResolutions, removeResolutions,
], 'name');

if (Meteor.isServer) {
  const OPERATIONS = 5;
  const PER_SECOND = 1 * 1000; // milliseconds
  // Only allow 5 list operations per connection per second.
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(RATE_LIMITED_METHODS, name);
    },

    // Rate limit per connection ID.
    connectionId() { return true; },
  }, OPERATIONS, PER_SECOND);
}
