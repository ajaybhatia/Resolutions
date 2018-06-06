
import { resolvers as resolutionsResolvers } from '/imports/api/resolutions/graphql/resolvers.jsx'

import { typeDefs as resolutionsTypeDefs } from '/imports/api/resolutions/graphql/typeDefs.jsx'
import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

const typeList = [];
const resolverList = [];

typeList.push(resolutionsTypeDefs);

resolverList.push(resolutionsResolvers);
if (typeList.length > 0 && resolverList.length > 0) {
  const typeDefs = mergeTypes(typeList);
  const resolvers = mergeResolvers(resolverList);
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });
  createApolloServer({ schema });
}

import './register-resolutions-api.jsx';