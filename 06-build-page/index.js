const fsProm = require('fs/promises');
const path = require('path');
const pathToPage = './06-build-page';
const pethToStyles = path.join(pathToPage, 'styles');
const pathToProjectDist = path.join(pathToPage, 'project-dist');

const bundleCss = async (pathToProjectDist, pathToStyles) => {
  const styles = await fsProm.readdir(pathToStyles, { withFileTypes: true });
  let cssInner = '';

  for (let style of styles) {

    const pathToStyle = path.join(pathToStyles, style.name);
    const file = path.parse(pathToStyle);
    if (file.ext === '.css' && style.isFile()) {
      cssInner += await fsProm.readFile(pathToStyle);
    }
  }
  await fsProm.writeFile(path.join(pathToProjectDist, 'style.css'), cssInner);
};

const copyAssets = async (pathToFolder, pathToProjectDist, dirName) => {
  await fsProm.mkdir(path.join(pathToProjectDist, 'assets'), { recursive: true });
  const files = await fsProm.readdir(pathToFolder, { withFileTypes: true });
  let dir = dirName;
  for (let item of files) {
    if (item.isDirectory()) {
      await fsProm.mkdir(path.join(pathToProjectDist, 'assets', `${item.name}`), { recursive: true });
      await copyAssets(path.join(pathToFolder, `${item.name}`), pathToProjectDist, item.name);
    } else {
      await fsProm.copyFile(path.join(pathToFolder, `${item.name}`), path.join(pathToProjectDist, 'assets', dir, `${item.name}`));
    }
  }
};

let buildHTML = async (pathToPage, pathToProjectDist) => {

  await fsProm.mkdir(pathToProjectDist, { recursive: true });
  const text = await fsProm.readFile(path.join(pathToPage, 'template.html'), { encoding: 'utf-8' });
  const htmlFiles = await fsProm.readdir(path.join(pathToPage, 'components'));

  for (let htmlFile of htmlFiles) {
    const arr = htmlFile.split('.');
    const htmlFileInner = await fsProm.readFile(path.join(pathToPage, `/components/${htmlFile}`), { encoding: 'utf-8' });
    text = text.replaceAll(`{{${arr[0]}}}`, `${htmlFileInner}`);
  }

  await fsProm.writeFile(path.join(pathToProjectDist, 'index.html'), text);
};

const assembly = async (pathToPage, pathToProjectDist, pethToStyles) => {
  try {
    await buildHTML(pathToPage, pathToProjectDist);
    console.log('HTML is built');
  } catch(err) {
    console.log(err);
  }
  try {
    await copyAssets(path.join(pathToPage, 'assets'), pathToProjectDist);
    console.log('Assets is copied');
  } catch(err) {
    console.log(err);
  }
  try {
    await bundleCss(pathToProjectDist, pethToStyles);
    console.log('css files is converted to style.css');
  } catch(err) {
    console.log(err);
  }
};

assembly(pathToPage, pathToProjectDist, pethToStyles);