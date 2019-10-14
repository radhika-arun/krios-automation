'use strict';

const fs = require('fs-extra');
const xml2js = require('xml2js');
const _ = require('lodash');

const parser = new xml2js.Parser();

console.log(`==========================================================================\n`);
console.log(`Removing the page object mapping files\n`);
console.log(`==========================================================================\n`);
fs.removeSync(__dirname + '/e2e/Inksfot/page_objects/krios/krios.po.json');

/**
 * Generate json page object specific file
 * @param fileName
 * @param dirName
 * @returns void
 */
function generatePageObject(fileName, dirName) {
  fs.readFile(__dirname + '/e2e/krios/page_objects/' + dirName + '/' + fileName + '.po.xml', function (err, data) {
    parser.parseString(data, function (err, result) {
      const page = result.root.page;
      let pobj = {};
      for (let i = 0; i < page.length; i++) {
        if (pobj[page[i].$.name] === undefined) {
          pobj[page[i].$.name] = {};
        }
        for (let j = 0; j < page[i].obj.length; j++) {
          if (page[i].obj[j].$.attr === 'id') {
            pobj[page[i].$.name][page[i].obj[j].$.name] = '#' + page[i].obj[j].$.value;
          } else {
            pobj[page[i].$.name][page[i].obj[j].$.name] = page[i].obj[j].$.value;
          }
        }
      }
      fs.writeFile(__dirname + '/e2e/krios/page_objects/' + dirName + '/' + fileName + '.po.json', JSON.stringify(pobj, null, 2), function () {
        console.log(`${fileName} page object genereated successfully\n`);
      });
    });
  });
}

generatePageObject('krios', 'krios');
