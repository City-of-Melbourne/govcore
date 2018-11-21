let makeExecutableSchema = require('graphql-tools').makeExecutableSchema;

let typeDefs = `
type document {
    id: String!
    title: String!
    thumbnail: String
    content: String
}
`;

let getAlldocuments = (obj, args, context, info) => {
    // the args object contains the GraphQL-parameters of the function

    // do database stuff
    const limitInput = args.limit || '10';
    const limit = parseInt(limitInput);

    const array = [];
    for (let i = 0; i < limit; i++) {
        array.push({
            id: i,
            title: 'document no. ' + i,
            content: 'Some boring content...',
            thumbnail: 'some URL'
        });
    }
    return array;
};

let getdocument = (obj, args, context, info) => {
    // the args object contains the GraphQL-parameters of the function

    // do database stuff
    return {
        id: args.id,
        title: 'document no. ' + args.id,
        content: 'Some boring content...',
        thumbnail: 'some URL'
    };
};

let addocument = (obj, args, context, info) => {
    // the args object contains the GraphQL-parameters of the function

    // do database stuff
    return args.post;
};

let resolvers = {
    Query: {
        documents: getAlldocuments,
        document: getdocument
    },
    Mutation: {
        addocument: addocument
    }
};

module.exports = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
});