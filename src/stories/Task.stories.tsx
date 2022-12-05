import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import TaskItem from "../features/TodolistsList/TaskItem/TaskItem";
import {ReduxStoreProviderDecorator} from "./Decorators/ReduxStoreProviderDecorator";

export default {
    title: "TODOLIST/TaskItem",
    component: TaskItem,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof TaskItem>

const Template: ComponentStory<typeof TaskItem> = (args ) => <TaskItem {...args}/>;

// export const TaskIsDone = Template.bind({})
//
// TaskIsDone.args = {
//     task: {id: "aaa", isDone: true, title: "ASD"},
//     todolistId: "string"
// }
// export const TaskIsNotDone = Template.bind({})
//
// TaskIsNotDone.args = {
//     task: {id: "aaa", isDone: false, title: "ASD"},
//     todolistId: "string"
// }