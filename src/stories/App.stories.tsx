import React from "react";
import App from "../app/App";
import {BrowserRouterDecorator, ReduxStoreProviderDecorator} from "./Decorators/ReduxStoreProviderDecorator";

export default {
    title: "TODOLIST/App",
    component: App,
    decorators: [ReduxStoreProviderDecorator,BrowserRouterDecorator]
} as ComponentMeta<typeof App>

export const AppStory = () => {
    return (<App/>)
}