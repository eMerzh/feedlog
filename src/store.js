export default {
  debug: true,
  state: {
    feedItems: [
      {date: Math.trunc((new Date()).getTime() / 1000)- 60*60*6 - 64, side: 'left'},
      {date: Math.trunc((new Date()).getTime() / 1000) - 60*60*2 - 64, side: 'left'},
    ],
  },
  addFeedItem (item) {
    this.state.feedItems.push(item);
  },
}
