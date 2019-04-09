import register from 'ignore-styles';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@babel/polyfill';

register(['.css', '.sass', '.scss']);
configure({ adapter: new Adapter() });
global.fetch = require('jest-fetch-mock');
