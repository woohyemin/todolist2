import React, { createContext, useReducer, useContext, useRef } from 'react';

const initialTodos = [ // 할 일 초기 세팅
    {
        id: 1,
        text: '프로젝트 생성하기',
        done: true,
    },
    {
        id: 2,
        text: '컴포넌트 스타일링하기',
        done: true,
    },
    {
        id: 3,
        text: 'Context 만들기',
        done: false,
    },
    {
        id: 4,
        text: '기능 구현하기',
        done: false,
    }
];

/*
    CREATE
    TOGGLE
    REMOVE
*/

function todoReducer(state, action) {
    switch (action.type) {
        case 'CREATE': // 생성
            return state.concat(action.todo); // state에 action.todo 합쳐서 리턴
        case 'TOGGLE': // 토글 (체크 아이콘)
            return state.map(
                todo => todo.id === action.id ? { ...todo, done: !todo.done } : todo
            ); // todo.id가 action.id와 같을 경우 기존 todo(할 일)에 done을 반대로 바꿔주고, 같지 않으면 기존 todo(할 일) 그대로 리턴
        case 'REMOVE': // 삭제
            return state.filter(todo => todo.id !== action.id); // action.id가 아닌 (= 삭제되지 않은) todo(할 일만) 리턴

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }

}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();


export function TodoProvider({ children }) {
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    const nextId = useRef(5); // 다음 id 값에 5 넣음
    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextId}>
                    {children}
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}

export function useTodoState() {
    const context = useContext(TodoStateContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider'); // context가 없을 경우 에러 처리
    }
    return context;
}

export function useTodoDispatch() {
    const context = useContext(TodoDispatchContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider'); // context가 없을 경우 에러 처리
    }
    return context;
}

export function useTodoNextId() {
    const context = useContext(TodoNextIdContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider'); // context가 없을 경우 에러 처리
    }
    return context;
}