import React, {ChangeEvent, memo, useCallback, useState} from 'react';

type EditableSpanType = {
    title: string
    callBack: (newTitle: string) => void
}
export const EditableSpan = memo((props: EditableSpanType) => {
    const {title, callBack} = props
    const [edit, setEdit] = useState(false)
    let [newTitle, setNewTitle] = useState(title)

    const onChangeHandler =useCallback( (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    },[])

    const addTask = useCallback(() => {
        callBack(newTitle);

    },[callBack,newTitle])

    const toggleHandler = useCallback(() => {
        setEdit(!edit)
        addTask()
    },[addTask,edit])

    return (
        edit
            ? <input type={"text"} value={newTitle} onChange={onChangeHandler} onBlur={toggleHandler} autoFocus/>
            : <span onDoubleClick={toggleHandler}> {title} </span>
    );
});
