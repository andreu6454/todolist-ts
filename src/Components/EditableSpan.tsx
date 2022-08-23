import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
    title: string
    callBack: (newTitle: string) => void
}
export const EditableSpan = (props: EditableSpanType) => {
    const {title, callBack} = props
    const [edit, setEdit] = useState(false)
    let [newTitle, setNewTitle] = useState(title)

    const toggleHandler = () => {
        setEdit(!edit)
        addTask()
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const addTask = () => {
        callBack(newTitle);

    }

    return (
        edit
            ? <input type={"text"} value={newTitle} onChange={onChangeHandler} onBlur={toggleHandler} autoFocus/>
            : <span onDoubleClick={toggleHandler}> {title} </span>
    );
};
