require("dotenv").config();
const mongoose = require("mongoose");

// mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.on("error", (err) => console.log(err));
// db.once("open", () => console.log("connected successfully"));

const eventSchema = mongoose.Schema({
  eventId: {
    type: Number,
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  eventDate: {
    type: Date,
  },
  roundIds: {
    type: Array,
  },
  participants: {
    type: Array,
  },
});

const roundSchema = mongoose.Schema({
  roundId: {
    type: Number,
    required: true,
  },
  roundName: {
    type: String,
    required: true,
  },
  roundType: {
    type: String,
  },
  totalScore: {
    type: Number,
    required: true,
  },
  questions: {
    type: Array,
  },
});

const questionSchema = mongoose.Schema({
  questionId: {
    type: Number,
    required: true,
  },
  questionName: {
    type: String,
    required: true,
  },
  answer: {
    type: Number,
    required: true,
  },
  questions: {
    type: Array(optionSchema),
  },
});
const optionSchema = mongoose.Schema({
  optionId: {
    type: Number,
    required: true,
  },
  optionName: {
    type: String,
    required: true,
  },
});




// module.exports={db};
