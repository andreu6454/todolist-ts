import {Button, TextField} from '@mui/material';
import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';

type AddItemProps = {
    callBack: (title: string) => void
}
export const AddItemForm = memo((props: AddItemProps) => {
    const {callBack} = props
    let [title, setTitle] = useState("")
    let [error, setError] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error){
            setError(false);
        }
        if (e.charCode === 13) {
            addTask();
        }
    }

    const addTask = () => {
        if (title.trim() !== "") {
            callBack(title.trim());
            setTitle("");
        } else {
            setError(true);
        }
    }

    return (
        <div>
            <TextField
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={error}
                id="outlined-basic"
                label={error ? "Title is required" : "Add title"}
                variant="outlined"
                size="small"
            />
            <Button
                variant={'contained'}
                style={{
                    maxWidth: '38px',
                    maxHeight: '38px',
                    minWidth: '38px',
                    minHeight: '38px',
                    background: "#3b3939"
                }}
                size={'small'}
                onClick={addTask}>+</Button>
        </div>
    );
});