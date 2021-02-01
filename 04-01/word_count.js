const fs = require('fs');
let completedTasks = 0;
let tasks = [];
let wordCounts = {};
const filesDir = './text';

let checkIfComplete = () => {
  completedTasks++;
  if (completedTasks == tasks.length) {
    for (let index in wordCounts) {
      console.log(index + ':' + wordCounts[index]);
    }
  }
}

let countWordsInText = (text) => {
  let words = text
              .toString()
              .toLowerCase()
              .split(/\W+/)
              .sort();
  for(let index in words) {
    let word = words[index];
    if (word) {
      wordCounts[word] = (wordCounts[word]) ? wordCounts[word] + 1 : 1;
    }
  }
}

fs.readdir(filesDir, (err, files) => {
  if (err) throw err;
  for (let index in files) {
    let task = ((file) => {
      return () => {
        fs.readFile(file, function(err, text) {
          if (err) throw err;
          countWordsInText(text);
          checkIfComplete();
        });
      }
    })(filesDir + '/' + files[index]);
    tasks.push(task);
  }
  for (let task in tasks) {
    tasks[task]();
  }
});