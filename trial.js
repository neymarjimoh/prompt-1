const a = [
  {
    eventType: "click",
    user: 1,
  },
  {
    eventType: "pageView",
    user: 2,
  },
  {
    eventType: "view",
    user: 1,
  },
  {
    eventType: "pageView",
    user: 1,
  },
  {
    eventType: "click",
    user: 1,
  },
  {
    eventType: "click",
    user: 2,
  },
  {
    eventType: "move",
    user: 3,
  },
  {
    eventType: "click",
    user: 3,
  },
  {
    eventType: "pageView",
    user: 2,
  },
];

const b = [
  {
    eventType: "click",
    user: 1,
  },
  {
    eventType: "pageView",
    user: 2,
  },
  {
    eventType: "view",
    user: 1,
  },
  {
    eventType: "pageView",
    user: 1,
  },
  {
    eventType: "click",
    user: 2,
  },
  {
    eventType: "move",
    user: 3,
  },
  {
    eventType: "click",
    user: 3,
  },
];

for (let event of b) {
    a.splice(
      a.findIndex(
        (e) => e.eventType == event.eventType && e.user == event.user
      ),
      1
    );
  }
// b.splice(b.findIndex(hs => hs.eventType === "click") , 1)
console.log(a.length)