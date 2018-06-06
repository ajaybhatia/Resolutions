import Resolutions from '../resolutions-collection';

export const resolvers = {
  Date: {
    __parseValue(value) {
      return new Date(value); // value from the client
    },
    __serialize(value) {
      return value.toISOString() // value sent to the client
    },
    __parseLiteral(ast) {
      return ast.value;
    }
  },
  Query: {
    resolutions(root, args, context) {
      return Resolutions.find({}).fetch();
    }
  },
  Mutation: {
    createResolution(root, { name, complete }, context) {
      const resolutionId = Resolutions.insert({
        name,
        complete: complete ? complete : false,
        createdAt: new Date()
      });
      return Resolutions.findOne(resolutionId);
    },
    removeResolution(root, { id }, context) {
      const resolution = Resolutions.findOne(id);
      Resolutions.remove(id);
      return resolution;
    },
    toggleComplete(root, { id }, context) {
      const resolution = Resolutions.findOne(id);
      const resolutionId = Resolutions.update(id, {
        $set: {
          complete: !resolution.complete
        }
      });
      return resolution;
    }
  }
};
