import React from 'react';
import styled from 'styled-components';
import { useTodoState } from '../TodoContext';

const TodoHeadBolck = styled.div`
    padding-top: 48px;
    padding-left: 32px;
    padding-right: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid #e9ecef;
    h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
    }
    .day {
    margin-top: 4px;
    color: #868e96;
    font-size: 21px;
    }
    .tasks-left {
    color: #43608E;
    font-size: 18px;
    margin-top: 40px;
    font-weight: bold;
    }
`;


function TodoHead() {
return (
    <TodoHeadBolck>
        <h1>2021년 7월 5일</h1>
        <div className="day">월요일</div>
        <div className="tasks-left">할 일 2개 남음</div>
    </TodoHeadBolck>
)

}

export default TodoHead;