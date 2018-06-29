import React from 'react';

import { View, Text, Button } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './store/actions';


const TodoList = ({ todos, addTodo }) => (
    <View>
        {
            todos.map(todo => <Text key={todo.id}>{todo.text}</Text>)
        }
        <Button title="Add todo" onPress={addTodo} />
    </View>
);

const mapStateToProps = state => ({
    todos: state.todos,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
