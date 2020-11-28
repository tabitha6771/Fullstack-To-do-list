const apiRouter = require('express').Router();
const { indexTodo, addTodo, updateTodo, idTodo, deleteTodo } = require('../controllers/Todo');

apiRouter.route('/')
    .get(indexTodo)
    .post(addTodo);

apiRouter.route('/update/:id')
    .post(updateTodo);

apiRouter.route('/:id')
    .get(idTodo);

apiRouter.route('/delete/:id')
    .delete(deleteTodo)

module.exports = apiRouter;
