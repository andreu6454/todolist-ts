import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import {AddItemForm} from "../Components/AddItemForm/AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
    title: "TODOLIST/AddItemForm",
    component: AddItemForm,
    argTypes: {
        callBack: {
            description: 'Clicked'
        }
    }

} as ComponentMeta<typeof AddItemForm>

const Template: ComponentStory<typeof AddItemForm> = (args ) => <AddItemForm {...args}/>;

export const AddItemFormStory = Template.bind({})

AddItemFormStory.args = {
    callBack: action('Clicked Button')
}
