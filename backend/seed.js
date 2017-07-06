// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

const db = require("./models");

const tutorialList =[
  {
    name: 'React Tutorial Series',
    url: 'https://www.youtube.com/watch?v=MhkGQAoc7bc&list=PLoYCgNOIyGABj2GQSlDRjgvXtqfDxKm5b',
  },
  {
    name: 'GA LA React Tutorial',
    url: 'https://www.youtube.com/watch?v=CTRke-_WxUM',
  },
  {
    name: 'Redux Tutorial Series',
    url: 'https://www.youtube.com/watch?v=1w-oQ-i1XB8',
  },
  {
    name: 'Webpack Cheat Sheet',
    url: 'https://www.youtube.com/watch?v=9kJVYpOqcVU',
  }
];

db.Tutorial.remove({}, function(err, tutorials){
  db.Tutorial.create(tutorialList, function(err, tutorials){
    if (err) { return console.log('ERROR', err); }
    console.log("all tutorials:", tutorials);
    console.log("created", tutorials.length, "tutorials");

    process.exit();
  });

});
