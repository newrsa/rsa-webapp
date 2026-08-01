const fs = require('fs');

const files = [
  'src/modules/dashboard/components/HomePage.tsx',
  'src/modules/dashboard/components/UntitledPathView.tsx'
];

const replacements = [
  // Backgrounds
  ['bg-\\[#0e0f13\\]', 'bg-slate-50 dark:bg-[#0e0f13]'],
  ['bg-\\[#0f0f18\\]', 'bg-white dark:bg-[#0f0f18]'],
  ['bg-\\[#08080f\\]', 'bg-slate-50 dark:bg-[#08080f]'],
  ['bg-\\[#1a1a24\\]', 'bg-slate-100 dark:bg-[#1a1a24]'],
  ['bg-black', 'bg-white dark:bg-black'],
  
  // Borders
  ['border-\\[#1e1e2a\\]', 'border-slate-200 dark:border-[#1e1e2a]'],
  ['border-\\[#23232f\\]', 'border-slate-200 dark:border-[#23232f]'],
  ['border-\\[#272735\\]', 'border-slate-300 dark:border-[#272735]'],
  ['border-\\[#2b2b3a\\]', 'border-slate-300 dark:border-[#2b2b3a]'],
  ['border-\\[#3a3a48\\]', 'border-slate-400 dark:border-[#3a3a48]'],
  
  // Texts
  ['text-white', 'text-slate-900 dark:text-white'],
  ['text-\\[#9090b0\\]', 'text-slate-600 dark:text-[#9090b0]'],
  ['text-\\[#e6e6ee\\]', 'text-slate-800 dark:text-[#e6e6ee]'],
  ['text-\\[#6b6b76\\]', 'text-slate-400 dark:text-[#6b6b76]']
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  replacements.forEach(([from, to]) => {
    // Only replace if it doesn't already have dark: in front of it
    const regex = new RegExp(`(?<!dark:)${from}`, 'g');
    content = content.replace(regex, to);
  });
  
  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
});
