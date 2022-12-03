import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import App from "../app/App";
import {ReduxStoreProviderDecorator} from "./Decorators/ReduxStoreProviderDecorator";

export default {
    title: "TODOLIST/App",
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>

const Template: ComponentStory<typeof App> = () =><App/>;

export const AppStory = Template.bind({})