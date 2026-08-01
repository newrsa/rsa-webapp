const fs = require('fs');

const files = [
  'src/modules/dashboard/components/HomePage.tsx',
  'src/modules/dashboard/components/UntitledPathView.tsx',
  'src/modules/auth/components/SignInPage.tsx',
  'src/modules/auth/components/SignUpPage.tsx'
];

const replacements = [
  ['text-\\[#e6e6ee\\]', 'text-slate-800 dark:text-[#e6e6ee]'],
  ['text-\\[#f8f8fc\\]', 'text-slate-900 dark:text-[#f8f8fc]'],
  ['text-\\[#e8e8f2\\]', 'text-slate-900 dark:text-[#e8e8f2]'],
  ['text-\\[#9c9ca3\\]', 'text-slate-500 dark:text-[#9c9ca3]'],
  ['placeholder-\\[#6b6b76\\]', 'placeholder-slate-400 dark:placeholder-[#6b6b76]'],
  ['text-\\[#6b6b76\\]', 'text-slate-400 dark:text-[#6b6b76]'],
  ['bg-white', 'bg-slate-50 dark:bg-white'],
  ['bg-\\[#0f0f18\\]', 'bg-white dark:bg-[#0f0f18]'],
  ['bg-\\[#1a1a24\\]', 'bg-slate-100 dark:bg-[#1a1a24]'],
  ['bg-\\[#08080f\\]', 'bg-slate-50 dark:bg-[#08080f]'],
  ['bg-\\[#0e0f13\\]', 'bg-slate-50 dark:bg-[#0e0f13]'],
  ['bg-\\[#0B0F17\\]', 'bg-white dark:bg-[#0B0F17]'],
  ['bg-\\[#08081a\\]', 'bg-slate-50 dark:bg-[#08081a]'],
  ['bg-\\[#171721\\]', 'bg-slate-200 dark:bg-[#171721]'],
  ['border-\\[#23232f\\]', 'border-slate-200 dark:border-[#23232f]'],
  ['border-\\[#1e1e2a\\]', 'border-slate-200 dark:border-[#1e1e2a]'],
  ['border-\\[#272735\\]', 'border-slate-300 dark:border-[#272735]'],
  ['border-\\[#393948\\]', 'border-slate-300 dark:border-[#393948]']
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
