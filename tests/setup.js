//import VueTestUtils from '@vue/test-utils';
import 'regenerator-runtime/runtime'

const VueTestUtils = require('@vue/test-utils')
VueTestUtils.config.mocks.$t = key => key;
