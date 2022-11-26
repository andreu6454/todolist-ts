import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import {EditableSpan} from "../Components/EditableSpan";
import {action} from "@storybook/addon-actions";

export default {
    title: "TODOLIST/EditableSpan",
    component: EditableSpan,
} as ComponentMeta<typeof EditableSpan>

const Template: ComponentStory<typeof EditableSpan> = (args ) => <EditableSpan {...args}/>;

export const EditableSpanStory = Template.bind({})

EditableSpanStory.args = {
    title: "Double click to change text",
    callBack: action("input type changed")
}