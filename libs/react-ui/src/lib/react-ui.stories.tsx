import { Story, Meta } from '@storybook/react';
import { ReactUi, ReactUiProps } from './react-ui';

export default {
  component: ReactUi,
  title: 'ReactUi',
} as Meta;

const Template: Story<ReactUiProps> = (args) => <ReactUi {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
