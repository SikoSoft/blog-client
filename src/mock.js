import axios from "axios";
import axisMockAdapter from "axios-mock-adapter";

const mock = new axisMockAdapter(axios);

const entries = [
  {
    created: 1564948499,
    title: "testing 123",
    body: [
      { insert: "Fuck off" },
      { attributes: { header: 1 }, insert: "\n" },
      { insert: "\n" },
      { attributes: { italic: true }, insert: "pretentious" },
      { insert: "\n\n" },
      { attributes: { underline: true }, insert: "blah" },
      { insert: "\n" }
    ],
    tags: ["testing", "blog", "poop"]
  }
].map(entry => {
  const date = new Date(entry.created * 1000);
  return {
    ...entry,
    id: `${date.getFullYear()}-${date.getMonth() +
      1}-${date.getDate()}/${entry.title.toLowerCase().replace(/ /g, "-")}`
  };
});

mock.onGet("/entries").reply(200, {
  entries
});

mock.onGet("/user").reply(200, {
  role: 1
});

mock.onGet("/roles").reply(200, {
  roles: [
    { id: 0, name: "guest", rights: ["r"] },
    { id: 1, name: "admin", rights: ["c", "r", "u", "d"] }
  ]
});

mock.onGet("/tags").reply(200, {
  tags: entries
    .map(entry => entry.tags)
    .reduce((accumulator = [], tags) => [accumulator, tags])
});

mock.onGet(/\/tag\/\w+/).reply(config => {
  const tag = config.url.replace(/\/tag\//, "");
  return [200, { entries: entries.filter(entry => entry.tags.includes(tag)) }];
});
