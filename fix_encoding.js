const fs = require('fs');
const path = require('path');

const map = {
  'Ã£': 'ã',
  'Ã§': 'ç',
  'Ãµ': 'õ',
  'Ã©': 'é',
  'Ãª': 'ê',
  'Ã¡': 'á',
  'Ã³': 'ó',
  'Ãº': 'ú',
  'Ã­': 'í', 
  'Ã¢': 'â',
  'Ã€': 'À',
  'Ã ': 'à',
  'Ã‰': 'É',
  'ÃŠ': 'Ê',
  'Ã“': 'Ó',
  'Ã”': 'Ô'
};

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;
      for (const [bad, good] of Object.entries(map)) {
        if (content.includes(bad)) {
          content = content.split(bad).join(good);
          modified = true;
        }
      }
      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Fixed:', fullPath);
      }
    }
  }
}

try {
  processDir(path.join(__dirname, 'src'));
  console.log('Encoding fixed.');
} catch (e) {
  console.error(e);
}
