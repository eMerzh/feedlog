import localForage from "localforage";

export default {
  debug: true,
  state: {
    loaded: false,
    currentFeeding: undefined,
    feedItems: []
  },
  initLoad() {
    localForage.getItem("feedItems").then(value => {
      this.state.loaded = true;
      this.state.feedItems = value || [];
    });
  },
  commit() {
    return localForage.setItem("feedItems", this.state.feedItems);
  },
  startFeeding(side, startedTime) {
    this.addFeedItem({
      date: startedTime,
      side: side,
      duration: 0,
      isRunning: true
    });
  },
  stopFeeding(duration) {
    this.state.feedItems[this.state.feedItems.length - 1].duration = duration;
    this.state.feedItems[this.state.feedItems.length - 1].isRunning = false;
    this.commit();
  },
  addFeedItem(item) {
    this.state.feedItems.push(item);
    this.commit();
  },
  removeFeedRow(index) {
    this.state.feedItems.splice(index, 1);
    this.commit();
  },
  clearHistory() {
    this.state.feedItems = [];
    this.commit();
  },
  sort() {
    this.state.feedItems.sort(function(a, b) {
      return a.date - b.date;
    });
    this.commit();
  }
};
