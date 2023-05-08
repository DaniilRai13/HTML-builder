let fsProm = require('fs/promises');
let path = require('path');
let pathToPage = './06-build-page';
let pethToStyles = path.join(pathToPage, 'styles');
let pathToProjectDist = path.join(pathToPage, 'project-dist');

let bundleCss = async (pathToProjectDist, pathToStyles) => {
  let styles = await fsProm.readdir(pathToStyles, { withFileTypes: true });
  let cssInner = '';

  for (let style of styles) {

    let pathToStyle = path.join(pathToStyles, style.name);
    let file = path.parse(pathToStyle);
    if (file.ext === '.css' && style.isFile()) {
      cssInner += await fsProm.readFile(pathToStyle);
    }
  }
  await fsProm.writeFile(path.join(pathToProjectDist, 'style.css'), cssInner);
};

let copyAssets = async (pathToFolder, pathToProjectDist, dirName) => {
  await fsProm.mkdir(path.join(pathToProjectDist, 'assets'), { recursive: true });
  let files = await fsProm.readdir(pathToFolder, { withFileTypes: true });
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
  let text = await fsProm.readFile(path.join(pathToPage, 'template.html'), { encoding: 'utf-8' });
  let htmlFiles = await fsProm.readdir(path.join(pathToPage, 'components'));

  for (let htmlFile of htmlFiles) {
    let arr = htmlFile.split('.');
    let htmlFileInner = await fsProm.readFile(path.join(pathToPage, `/components/${htmlFile}`), { encoding: 'utf-8' });
    text = text.replace(`{{${arr[0]}}}`, `${htmlFileInner}`);
  }

  await fsProm.writeFile(path.join(pathToProjectDist, 'index.html'), text);
};

let assembly = async (pathToPage, pathToProjectDist, pethToStyles) => {
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