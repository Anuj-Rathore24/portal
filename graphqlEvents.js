const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} = require("graphql");
let event = require("./data/eventData.json");
let Allrounds = require("./data/roundData.json");
let allQuestions = require("./data/questionsData.json");


// Options Object
const opt = new GraphQLObjectType({
  name: "optionsInfo",
  description: "",
  fields: () => ({
    optionsId: {type:GraphQLInt},
    option: {type:GraphQLString},
  }),
});

// Questions Object
const ques = new GraphQLObjectType({
  name: "QuestionsInfo",
  description: "",
  fields: () => ({
    questionId: { type: GraphQLInt },
    questionName: { type: GraphQLString },
    options: { type: new GraphQLList(opt) },
    answer: { type: GraphQLInt },
  }),
});

// Round Object
const round = new GraphQLObjectType({
  name: "RoundInfo",
  description: "",
  fields: () => ({
    roundId: { type: GraphQLInt },
    roundName: { type: GraphQLString },
    roundType: { type: GraphQLString },
    totalScore: { type: GraphQLInt },
    questions: { type: new GraphQLList(GraphQLInt) },
    questionsInfo: {
      type: ques,
      resolve: (q) => {
        return allQuestions.find((para) => para.id === q.id);
      },
    },
  }),
});

// Event Object
const individualEvent = new GraphQLObjectType({
  name: "event",
  description: "all information about events",
  fields: () => ({
    eventId: { type: GraphQLInt },
    eventName: { type: GraphQLString },
    eventDate: { type: GraphQLString },
    roundIds: { type: new GraphQLList(GraphQLInt) },
    participants: { type: new GraphQLList(GraphQLInt) },
    roundInfo: {
      type: round,
      resolve: (event) => {
        return Allrounds.find((round) => round.roundId === event.eventId);
      },
    },
  }),
});

const eventSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "EventQueries",
    description: "Main Query Object",
    fields: () => ({
      event: {
        type: new GraphQLList(individualEvent),
        resolve: () => event,
      },
    }),
  }),
});

module.exports = { eventSchema };
