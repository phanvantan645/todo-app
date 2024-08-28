import { useState, useRef, useEffect } from 'react';

function Todo() {
    const [data, setData] = useState(
        JSON.parse(window.localStorage.getItem('todos'))
    );
    const [todo, setTodo] = useState('');

    const inputRef = useRef();

    useEffect(() => {
        window.localStorage.setItem('todos', JSON.stringify(data));
    }, [data]);

    const handleSubmit = () => {
        if (todo.trim()) {
            setData(prev => [
                ...prev,
                {
                    id: Math.random() * 100,
                    name: todo,
                },
            ]);
            setTodo('');
            inputRef.current.focus();
        }
    };

    const handleDelete = id => {
        setData(data.filter(item => item.id !== id));
    };

    const handleItemClick = id => {
        setTodo(data.find(item => item.id === id).name);
        handleDelete(id);
    };

    return (
        <div className='wrapper'>
            <h1 className='title'>Todo app</h1>
            <div className='container'>
                <div className='input-content'>
                    <input
                        ref={inputRef}
                        type='text'
                        placeholder='Enter your todo...'
                        className='todo-input'
                        onChange={e => setTodo(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                        value={todo}
                    />
                    <button
                        className='submit-btn'
                        onClick={handleSubmit}
                        disabled={todo.trim().length === 0}
                    >
                        Submit
                    </button>
                </div>
                <ul className='todo-list'>
                    {data &&
                        data.map(i => (
                            <li className='todo-item' key={i.id}>
                                <span
                                    className='todo-name'
                                    onClick={() => handleItemClick(i.id)}
                                >
                                    {i.name}
                                </span>
                                <button
                                    className='item-action'
                                    onClick={() => handleDelete(i.id)}
                                >
                                    X
                                </button>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
}

export default Todo;
