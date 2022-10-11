import React, {ChangeEvent, memo, useState} from 'react';

type EditableSpanType = {
    title: string
    callBack: (newTitle: string) => void
}
export const EditableSpan = memo((props: EditableSpanType) => {
    console.log("lolol")
    const {title, callBack} = props
    const [edit, setEdit] = useState(false)
    let [newTitle, setNewTitle] = useState(title)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const addTask =() => {
        callBack(newTitle);

    }

    const toggleHandler = () => {
        setEdit(!edit)
        addTask()
    }

    return (
        edit
            ? <input type={"text"} value={newTitle} onChange={onChangeHandler} onBlur={toggleHandler} autoFocus/>
            : <span onDoubleClick={toggleHandler}> {title} </span>
    );
});
