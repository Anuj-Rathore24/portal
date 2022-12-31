const { GraphQLSchema, GraphQLObjectType, GraphQLString,GraphQLList, GraphQLInt } = require("graphql");
let event = require("./eventData.json");


const individualEvent=new GraphQLObjectType({
    name:"User",
    description:"all information about events",
    fields:()=>({
        eventId:{type:GraphQLInt},
        eventName:{type:GraphQLString},
        eventDate:{type:GraphQLString}
    })
})

const eventSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: "Root",
      description:"Main Query Object",
      fields: () => ({
        event:{
            type: new GraphQLList(individualEvent),
            resolve: () => event,
        }
      }),
    }),
  });

module.exports={eventSchema}