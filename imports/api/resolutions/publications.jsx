import { Meteor } from 'meteor/meteor';
import Resolutions from './resolutions-collection';

/**
 * Collection publications to the client.  Publications must
 * return a cursor object.
 *
 * @memberof Server.Resolutions
 * @member Publications
 */
Meteor.publish('resolutions.public', function resolutionsPublic() {
  const cursor = Resolutions.find({
    userId: { $exists: false },
  }, {
    fields: Resolutions.publicFields,
  });

  return cursor;
});

Meteor.publish('resolutions.private', function resolutionsPrivate() {
  if (!this.userId) {
    return this.ready();
  }

  const cursor = Resolutions.find({
    userId: this.userId,
  }, {
    fields: Resolutions.privateFields,
  });

  return cursor;
});
