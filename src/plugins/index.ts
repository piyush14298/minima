import text from './text/index';
import image from './images/index';
import button from './buttons/index';

let plugins: any = [];

let registerPlugins = () => {
  plugins.push(text);
  plugins.push(image);
  plugins.push(button);

  return plugins;
}
export default registerPlugins;
