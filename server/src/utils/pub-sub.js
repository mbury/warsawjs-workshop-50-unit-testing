// source: https://davidwalsh.name/pubsub-javascript
let topics = {};

const EventBus = {
  subscribe: function (topic, listener) {
    // Create the topic's object if not yet created
    if (!topics[topic]) topics[topic] = [];

    // Add the listener to queue
    var index = topics[topic].push(listener) - 1;

    // Provide handle back for removal of topic
    return {
      remove: function () {
        delete topics[topic][index];
      },
    };
  },
  publish: function (topic, info = {}) {
    // If the topic doesn't exist, or there's no listeners in queue, just leave
    if (!topics[topic]) return;

    // Cycle through topics queue, fire!
    topics[topic].forEach(function (callback) {
      callback(info);
    });
  },
};

module.exports = EventBus;
