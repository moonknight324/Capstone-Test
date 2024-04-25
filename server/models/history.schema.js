const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
 title: {
    type: String,
    required: true,
 },
 url: {
    type: String,
    required: true,
 },
 caption: {
    type: String,
    required: true,
 },
 description: {
    type: String,
    required: true,
 },
});

const SpaceHistorySchema = new mongoose.Schema({
 history: {
    title: {
      type: String,
      required: true,
    },
    introduction: {
      type: String,
      required: true,
    },
    events: [EventSchema],
 },
});

const HistoryModel = mongoose.model('static_datas', SpaceHistorySchema);

module.exports = HistoryModel;
