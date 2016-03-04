import 'babel-polyfill';
import './index.html';
import './css/App.css';
import * as Elm from './Main';
const elm = Elm.fullscreen(Elm.Main, { swap: false });