import React, {ChangeEvent, memo, useCallback, useState} from 'react';
import {Popover, Typography} from "@mui/material";

type EditableSpanType = {
    title: string
    callBack: (newTitle: string) => void
}
export const EditableSpan = memo((props: EditableSpanType) => {
    const {title, callBack} = props
    const [edit, setEdit] = useState(false)
    let [newTitle, setNewTitle] = useState(title)
    let finalTitle

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }, [])

    const addTask = useCallback(() => {
        callBack(newTitle);

    }, [callBack, newTitle])

    const toggleHandler = useCallback(() => {
        setEdit(!edit)
        addTask()
    }, [addTask, edit])

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    if(title.length > 13){
        finalTitle = title.slice(0,13) + "..."
    } else{
        finalTitle = title
    }

    return (
        edit
            ? <input className={'EditableInput'} type={"text"} value={newTitle} onChange={onChangeHandler}
                     onBlur={toggleHandler} autoFocus/>
            :
            <span onDoubleClick={toggleHandler}
                  onMouseEnter={title.length > 13 ? handleClick : ()=>{}} onMouseLeave={handleClose}>
                {finalTitle}
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <Typography sx={{p: 2}}> {title} </Typography>
                </Popover>
            </span>
    );
});
