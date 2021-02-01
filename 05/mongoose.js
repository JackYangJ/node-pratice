let mongoose = require('mongoose');
let db = mongoose.connect('mongodb://localhost/tasks');
let Schema = mongoose.Schema;
let Tasks = new Schema({
  project: String,
  description: String
});
mongoose.model('Task', Tasks);
// let Task = mongoose.model('Task');
// let task = new Task();
// task.project = 'Bikeshed';
// task.description = 'Paint the bikeshed red. ';
// task.save(function (err) {
//   if (err) throw err;
//   console.log('Task saved');
// });

let Task = mongoose.model('Task');
Task.find({'project': 'Bikeshed'}, function(err, tasks) {
  for(let i = 0; i < tasks.length; i++) {
    console.log('ID: ' + tasks[i].id);
    console.log(tasks[i].description);
  }
});

// let Task = mongoose.model('Task');
// Task.update(
//   {_id: '5e6f30cbb1509e3abc96b29e'},
//   {description: 'Paint the bikeshed green. '},
//   {multi: false},
//   (err, rows_updated) => {
//     if (err) throw err;
//     console.log('Updated.');
//     console.log(rows_updated);
//   }
// )

// let Task = mongoose.model('Task');
// Task.findById('5e6f30cbb1509e3abc96b29e', (err, task) => {
//   task.remove();
// });