import React, { Component, createRef } from 'react';
import clsx from 'clsx'

export default class Todo extends Component {

    state = {
        todoList: [{
            text: 'Hello Swamy',
            isChecked: false
        }],
        ref: createRef(),
        loading: true,
        filterStatus: 'All'
    }

    addTodo = () => {
        const todoText = this.state.ref.current.value;
        this.setState({ todoList: [...this.state.todoList, { text: todoText, isChecked: false }] }, () => this.state.ref.current.value = "");
        console.log('todoList', this.state.todoList);


        this.setState({ loading: true })

    };

    deleteTodo = (index) => {
        this.setState({
            todoList: [
                ...this.state.todoList.slice(0, index),
                ...this.state.todoList.slice(index + 1),
            ]
        })
    };

    updateTodo = (index) => {
        this.setState({
            todoList: [
                ...this.state.todoList.slice(0, index),
                { ...this.state.todoList[index], isChecked: !this.state.todoList[index].isChecked },
                ...this.state.todoList.slice(index + 1),
            ]
        })
    };

    onFilter = (status) => {
        this.setState({ filterStatus: status })
    }


    render() {
        const { todoList, ref, loading, filterStatus } = this.state;
        console.log('todoList', todoList)
        return (
            <div className='h-screen w-full flex flex-col'>
                <div className='flex items-center justify-center my-4'>
                    <input onChange={() => this.setState({ loading: false })} ref={ref} type="text" placeholder='Enter' className='block rounded-l-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />
                    <button disabled={loading} onClick={this.addTodo} className='rounded-r-md boredr bg-indigo-600 py-[14px] px-6 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:bg-slate-500 disabled:cursor-wait focus-visible:outline-indigo-600'>Add</button>
                </div>
                <div className='flex-1'>

                    {todoList.map((item, index) => {
                        if (filterStatus === "All" || (filterStatus === 'Pending' && item.isChecked === false) || (filterStatus === 'Completed' && item.isChecked === true)) {
                            return (
                                <div key={item.text + index} className='flex justify-between px-10 my-5'>
                                    <div className='flex items-center'>
                                        <input checked={item.isChecked} onChange={() => this.updateTodo(index)} type="checkbox" />
                                        <p className={clsx('mx-4', { 'line-through': item.isChecked })}>{item.text}</p>
                                    </div>
                                    <button onClick={() => this.deleteTodo(index)} className='rounded-md boredr bg-red-600 py-3 px-6 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600'>Delete</button>
                                </div>
                            )
                        } else {
                            return null
                        }
                    })}
                </div>
                <div className='w-full flex justify-between'>
                    <button onClick={() => this.onFilter("All")} className={clsx('bg-indigo-600 py-2 flex-1 border-r border-white text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600', {
                        'bg-orange-400 hover:bg-orange-500': filterStatus === "All"
                    })}>All</button>
                    <button onClick={() => this.onFilter("Pending")} className={clsx('bg-indigo-600 flex-1 py-2 border-r border-white text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600', {
                        'bg-orange-400 hover:bg-orange-500': filterStatus === "Pending"
                    })}>Pending</button>
                    <button onClick={() => this.onFilter("Completed")} className={clsx('bg-indigo-600 py-2 flex-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600', {
                        'bg-orange-400 hover:bg-orange-500': filterStatus === "Completed"
                    })}>Completed</button>
                </div>
            </div>
        )
    }
}
