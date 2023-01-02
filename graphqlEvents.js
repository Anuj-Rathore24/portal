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
    optionsId: { type: GraphQLInt },
    option: { type: GraphQLString },
  }),
});

// Questions Object
const questionObject = new GraphQLObjectType({
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
const roundObject = new GraphQLObjectType({
  name: "RoundInfo",
  description: "",
  fields: () => ({
    roundId: { type: GraphQLInt },
    roundName: { type: GraphQLString },
    roundType: { type: GraphQLString },
    totalScore: { type: GraphQLInt },
    questionIds: { type: new GraphQLList(GraphQLInt) },
    multipleQuestions: {
      type: new GraphQLList(questionObject),
      resolve: (ro) => {
        let ourList=[];
        // get question object for every quesion's ids
        ro.questions.forEach(element => {
          ourList.push(allQuestions.find(r=>r.questionId===element))
        });
        return ourList;
      },
    },
    question:{
      type:questionObject,
      args:{
        questionId: { type: GraphQLInt },
      },
      resolve:(parent,args)=>{
        // match question with parent's list of question and then question in data list
        if(parent.questions.find(p=>p===args.questionId)!=undefined) return allQuestions.find(q=>q.questionId===args.questionId)
        return null;
      }
    }
  }),
});

// Event Object
const eventObject = new GraphQLObjectType({
  name: "event",
  description: "all information about events",
  fields: () => ({
    eventId: { type: GraphQLInt },
    eventName: { type: GraphQLString },
    eventDate: { type: GraphQLString },
    roundIds: { type: new GraphQLList(GraphQLInt) },
    participants: { type: new GraphQLList(GraphQLInt) },
    multipleRound: {
      type: new GraphQLList(roundObject),
      resolve: (event) => {
        let ourList=[];
        // get round object for every round's ids
        event.roundIds.forEach(element => {
          ourList.push(Allrounds.find(r=>r.roundId===element))
        });
        return ourList;
      },
    },
    round:{
      type:roundObject,
      args:{
        roundId: { type: GraphQLInt },
      },
      resolve:(parent,args)=>{
        // if round exists in parent event then display list or display null
        if(parent.roundIds.find(p=>p===args.roundId)!=undefined) return Allrounds.find(r=>r.roundId===args.roundId)
        return null;
      }
    },
  }),
});

const eventSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "EventQueries",
    description: "Main Query Object",
    fields: () => ({
      multipleEvent: {
        type: new GraphQLList(eventObject),
        description:"For all events",
        resolve: () => event,
      },
      event: {
        type: eventObject,
        description: "a single event information",
        args: {
          eventId: { type: GraphQLInt },
        },
        resolve: (parent, args) =>
          event.find((e) => e.eventId === args.eventId),
      },
    }),
  }),
});

module.exports = { eventSchema };


// schema : Events object->round object ->question object ->options object (-> : means references!)