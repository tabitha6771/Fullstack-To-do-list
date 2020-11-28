const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    todo_name: {
        type: String
    },
    todo_completed: {
        type: Boolean
    }
});

const Todo = (module.exports = mongoose.model('Todo', todoSchema));

module.exports.get = function (callback, limit) {
    Todo.find(callback).limit(limit);
};

module.exports.getTodo = function (todo_name) {
    return Todo.findOne({ todo_name })
        .then((todo) => {
            return todo;
        });
};
