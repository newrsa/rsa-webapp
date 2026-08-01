const fs = require('fs');
const path = require('path');

function walk(dir) {
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (full.endsWith('.tsx')) {
      let c = fs.readFileSync(full, 'utf8');
      if (c.includes('dark:bg-white dark:')) {
        fs.writeFileSync(full, c.replace(/dark:bg-white dark:/g, 'dark:'));
        console.log('Fixed double dark class in ' + full);
      }
    }
  });
}

walk('./src');
