import { Meteor } from 'meteor/meteor';
import Resolutions from './resolutions-collection';

/**
 * If the Resolutions collection is empty on server start, and you'd like to
 * populate it with some data here is a handy spot.
 *
 * Example:
 * ```
 *  import Trucks from './trucks.jsx'
 *  if (Resolutions.find().count() === 0) {
 *      const data = JSON.parse(Assets.getText('resolutions.json')) || [ {} ];
 *      data.forEach((datum) => {
 *          Resolutions.insert(datum);
 *      });
 *  }
 *
 * ```
 * @memberof Server.Resolutions
 * @member Fixtures
 */
Meteor.startup(() => {

});
