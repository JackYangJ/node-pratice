let fs = require('fs');
let path = require('path');
let args = process.argv.splice(2);
let command = args.shift();

let taskDescription = args.join(' ');
let file = path.join(process.cwd(), '/.tasks');

switch(command) {
  case 'list':
    listTasks(file);
    break;
  case 'add':
    addTask(file, taskDescription);
    break;
  default: 
    console.log(`Usage ${process.argv[0]} list|add [taskDescription]`);
}


// 辅助函数
function loadOrInitializeTaskArray(file, cb) {
  fs.exists(file, exists => {
    if (exists) {
      fs.readFile(file, 'utf8', (err, data) => {
        if (err) throw err;
        data = data.toString();
        let tasks = JSON.parse(data || '[]');
        cb(tasks);
      });
    } else {
      cb([]);
    }
  });
}

// 列出任务的函数
function listTasks(file) {
  loadOrInitializeTaskArray(file, tasks => {
    for(let i in tasks) {
      console.log(tasks[i]);
    }
  });
}

//存放任务
function storeTasks(file, tasks) {
  fs.writeFile(file, JSON.stringify(tasks), 'utf8', err => {
    if (err) throw err;
    console.log('Save.');
  });
}

//添加一项任务
function addTask(file, taskDescription) {
  loadOrInitializeTaskArray(file, tasks => {
    tasks.push(taskDescription);
    storeTasks(file, tasks);
  });
}
