var express = require('express');
var graphqlHTTP = require('express-graphql');
var graphql = require('graphql');

var fakeDAtabase = {
    'a': {
        id: 'a',
        name: 'alice'
    },
    'b': {
        id: 'b',
        name: 'bob'
    }
};

var userType = new graphql.GraphQLObjectType({
    name: 'User',
    fields: {
        id: {type: graphql.GraphQLString},
        name: {type: graphql.GraphQLString}
    }
});

var quertType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: userType,
            args: {
                id:{type: graphql.GraphQLString}
            },
            resolve: (_, {id}) => {
                return fakeDAtabase[id];
            }
        }
    }
});

var schema = new graphql.GraphQLSchema({query: quertType});

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql:true
}));

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');