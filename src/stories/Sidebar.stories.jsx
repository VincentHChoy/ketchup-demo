import React from "react";

import Sidebar from "../components/Sidebar/Sidebar";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: Sidebar,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Sidebar {...args} />;

export const Primary = Template.bind({});

Primary.args = {
};
