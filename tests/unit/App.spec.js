import { shallow, shallowMount, mount } from '@vue/test-utils'
import App from '@/App.vue'
import Header from '@/components/common/Header.vue'
import store from '@/store'

it('renders components when the component is created', () => {
  const wrapper = shallowMount(App, {
    stubs: ['router-link', 'router-view']
  })

  expect(wrapper.findAll('.Layout').exists()).toBeTruthy()
  expect(wrapper.findAll('.Body').exists()).toBeTruthy()
  expect(wrapper.findAll('.ContentContainer').exists()).toBeTruthy()
  
})

it('renders sub-components when the component is created', () => {
  const wrapper = mount(App, {
    stubs: ['router-link', 'router-view'],
    store
  })

  expect(wrapper.findAll('.Layout').exists()).toBeTruthy()
  expect(wrapper.findAll('.Header').exists()).toBeTruthy()
  expect(wrapper.findAll('.Body').exists()).toBeTruthy()
  expect(wrapper.findAll('.ContentContainer').exists()).toBeTruthy()
})

it('renders sub-components when the component is created', () => {
  const wrapper = shallowMount(Header, {
    store
  })

  expect(wrapper.findAll('.Header').exists()).toBeTruthy()
  
})
