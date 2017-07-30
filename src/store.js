import localForage from "localforage";

export default {
  debug: true,
  state: {
    loaded: false,
    feedItems: [],
  },
  initLoad() {
    localForage
      .getItem('feedItems')
      .then((value) => {
        this.state.loaded = true;
        this.state.feedItems = value || [];
      });
  },
  commit() {
    return localForage.setItem('feedItems', this.state.feedItems);
  },
  addFeedItem (item) {
    this.state.feedItems.push(item);
    this.commit();
  },
};

