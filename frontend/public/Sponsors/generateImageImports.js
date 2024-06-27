const fs = require('fs');
const path = require('path');

// Adjust the path to point to the correct directory
const imagesDir = path.join(__dirname, '..', 'Sponsors'); // Adjust as needed
const outputFile = path.join(imagesDir, 'imageImports.js');

fs.readdir(imagesDir, (err, files) => {
  if (err) throw err;

  const imageImports = files
    .filter(file => /\.(png|jpe?g|svg|gif)$/.test(file))
    .map((file, index) => `import img${index} from './${file}';`)
    .join('\n');

  const exports = `export default [\n${files
    .filter(file => /\.(png|jpe?g|svg|gif)$/.test(file))
    .map((file, index) => `  img${index}`)
    .join(',\n')}\n];`;

  const content = `${imageImports}\n\n${exports}`;

  fs.writeFile(outputFile, content, 'utf8', err => {
    if (err) throw err;
    console.log('Image imports generated successfully.');
  });
});
