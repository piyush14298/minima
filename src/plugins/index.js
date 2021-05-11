import text from './text';
import image from './images';

let plugins = [];

let registerPlugins = () => {
  plugins.push(text);
  plugins.push(image);

  return plugins;
}

export default registerPlugins;
