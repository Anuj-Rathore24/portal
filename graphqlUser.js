const { GraphQLSchema, GraphQLObjectType, GraphQLString,GraphQLList, GraphQLInt } = require("graphql");
let userInfo = require("./userData.json");


const userEvents=new GraphQLObjectType({
    name:"userEvents",
    description:"Description of events user took part in",
    fields:()=>({
        eventId:{type:GraphQLInt},
        eventName:{type:GraphQLString},
    })
})

const user=new GraphQLObjectType({
    name:"User",
    description:"all information about user",
    fields:()=>({
        userId:{type:GraphQLInt},
        username:{type:GraphQLString},
        events:{type:new GraphQLList(userEvents)}
    })
})

const userSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: "Root",
      description:"Main Query Object",
      fields: () => ({
        user:{
            type: new GraphQLList(user),
            resolve: () => userInfo,
        }
      }),
    }),
  });

module.exports={userSchema}