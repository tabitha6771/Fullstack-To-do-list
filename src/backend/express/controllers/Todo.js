const { getTodo } = require('../../db/models/Todo');
const Todo = require('../../db/models/Todo');

exports.addTodo = function (req, res, next) {
    const { todo_name, todo_completed } = req.body;
    Todo.findOne({ todo_name }, (err, todo) => {
        if (err) return next(err);
        if (todo)
            res.status(201).json({ message: { msgBody: "Todo already exists", msgError: true } });
        else {
            const newTodo = new Todo({ todo_name, todo_completed });
            newTodo.save(err => {
                if (err) return next(err)
                else
                    res.status(201).json({ message: { msgBody: "Todo successfully added", msgError: false } });
            })
        }
    });
}

exports.indexTodo = function (req, res, next) {
    Todo.get(function (err, todos) {
        if (err) return next(err);
        res.json({
            status: "success",
            message: "Todos retrieved successfully",
            data: todos
        });
    });
};

exports.idTodo = function (req, res, next) {
    let id = req.params.id;
    Todo.findById(id, function (err, todo) {
        res.json(todo)
    });
};

exports.updateTodo = function (req, res, next) {
    Todo.findById(req.params.id, function (err, todo) {
        if (!todo)
            res.status(404).send("data is not found");
        else {
            todo.todo_name = req.body.todo_name;
            todo.todo_completed = req.body.todo_completed;
        }

        todo.save().then(todo => {
            res.json('Todo updated!');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    })
}

exports.deleteTodo = function (req, res, next) {
    Todo.findByIdAndRemove(req.params.id, function (err, todo) {
        if (!todo)
            res.status(404).send("data is not found");
        else {
            res.send(todo)
        }
    })
}
