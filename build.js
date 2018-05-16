// run this file to generate omikuji_vn.html from omikuji_vn_base.html and Omikuji.png
var fs = require('fs');
var path = require('path');
var jsdom = require('jsdom');
const { JSDOM } = jsdom;
var baseFile = "./materials/omikuji_vn_base.html";
var destFile = "./index.html"
var imgFile = "./materials/Omikuji.png";
fs.readFile(imgFile, async (err, data) => {
  if (err != null) return console.error(err);
  let extensionName = path.extname(imgFile);
  let base64Image = new Buffer(data, 'binary').toString('base64');
  let imgSrcString = `data:image/${extensionName.split('.').pop()};base64,${base64Image}`;
  var dom = await JSDOM.fromFile(baseFile);
  var base64Img = dom.window.document.getElementById('base64Img');
  base64Img.innerHTML = `
    #target {
      background-image: url('${imgSrcString}');
    }
  `;
  fs.writeFile(destFile, dom.serialize(), (err) => {
    if (err != null) return console.error(err);
  });
});