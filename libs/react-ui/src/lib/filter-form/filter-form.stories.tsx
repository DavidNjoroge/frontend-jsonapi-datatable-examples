import { Story, Meta } from '@storybook/react';
import { FilterForm, FilterFormProps } from './filter-form';

export default {
  component: FilterForm,
  title: 'FilterForm',
} as Meta;

const Template: Story<FilterFormProps> = (args) => <FilterForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
