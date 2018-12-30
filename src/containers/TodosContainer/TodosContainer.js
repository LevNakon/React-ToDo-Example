import React, { Component } from 'react';
import Todos from '../../components/Todos';
import ItemForm from '../../components/ItemForm';

class TodosContainer extends Component {
    render() {
        return (
            <div>
                <div><h1>Todo List</h1></div>
                <div className='for-items-container fl-l'>
                    <Todos/>
                </div>
                <div className='for-items-container fl-r'>
                    <ItemForm />
                </div>
            </div>
        );
    }

}

export default TodosContainer;