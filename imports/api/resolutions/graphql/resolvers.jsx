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
      if (context.userId) {
        return Resolutions.find({ userId: context.userId }, { sort: { createdAt: -1 }}).fetch();
      } else {
        throw new Error("Unauthorized Access");
      }
    }
  },
  Mutation: {
    createResolution(root, { name, complete }, context) {
      if (context.userId) {
        const resolutionId = Resolutions.insert({
          name,
          complete: complete ? complete : false,
          createdAt: new Date(),
          userId: context.userId
        });
        return Resolutions.findOne(resolutionId);
      } else {
        throw new Error("Unauthorized Access");
      }
    },
    removeResolution(root, { id }, context) {
      if (context.userId) {
        const resolution = Resolutions.findOne(id);
        Resolutions.remove(id);
        return resolution;
      } else {
        throw new Error("Unauthorized Access");
      }
    },
    toggleComplete(root, { id }, context) {
      if (context.userId) {
        const resolution = Resolutions.findOne(id);
        const resolutionId = Resolutions.update(id, {
          $set: {
            complete: !resolution.complete
          }
        });
        return resolution;
      } else {
        throw new Error("Unauthorized Access");
      }
    }
  }
};
