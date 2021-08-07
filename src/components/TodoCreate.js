import React, { useState } from 'react';
import styled, {css} from 'styled-components';
import { MdAdd } from 'react-icons/md';
import { useTodoDispatch, useTodoNextId } from '../TodoContext';

const CircleButton = styled.button`
    background: #43608E;
    &:hover {
        background: #4B6B9D;
    }
    &:active {
        background: #355280;
    }

    z-index: 5;
    cursor: pointer;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    left: 50%;
    bottom: 0px;
    transform: translate(-50%, 50%);

    font-size: 60px;
    color: white;
    border-radius: 40px;

    border: none;
    outline: none;
    
    transition: 0.125s all ease-in;
    ${props => props.open && css`
    background: #C14A4A;
    &:hover {
        background: #D15656;
    }
    &:active {
        background: #B53F3F;
    }
    transform: translate(-50%, 50%) rotate(45deg);

    `}
`;

const InsertFormPositioner = styled.div`
    width: 100%;
    bottom: 0;
    left:0;
    position: absolute;
`;

// div 말고 form으로 하면 onSubmit 가능
const InsertForm = styled.form`
    background: #f8f9fa;
    padding: 32px;
    padding-bottom: 72px;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    border-top: 1px solid #e9ecef;

`;

const Input = styled.input`
    padding: 16px;
    border-radius: 4px;
    border: 1px solid #dee2e6;
    width: 100%;
    outline: none;
    font-size: 18px;
    box-sizing: border-box;
`;

function TodoCreate() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const dispatch = useTodoDispatch();
    const nextId = useTodoNextId();

    const onToggle = () => setOpen(!open);
    const onChange = e => setValue(e.target.value);
    const onSubmit = e => {
        e.preventDefault();
        dispatch({
            type: 'CREATE',
            todo: {
                id: nextId.current,
                text: value,
                done: false,
            }
            
        });
        setValue('');
        setOpen(false);
        nextId.current += 1;
    };



    
    return (
        <>
            {open && (
                <InsertFormPositioner>
                    <InsertForm onSubmit={onSubmit}>
                        <Input
                        placeholder="할 일을 입력 후, Enter를 누르세요"
                        autoFocus
                        onChange={onChange}
                        value={value}
                        />
                    </InsertForm>
                </InsertFormPositioner>
            )}
            <CircleButton onClick={onToggle} open={open}>
            <MdAdd />
            </CircleButton>
        </>
    );
}

export default React.memo(TodoCreate);
//React.memo를 넣어주면 컴포넌트 최적화 가능(해당되지 않는 부분들은 리렌더링되지 않음)