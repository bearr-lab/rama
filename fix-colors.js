const fs = require('fs');
let content = fs.readFileSync('components/discover/discover-client.tsx', 'utf8');

const replacements = [
  // Typography & Colors
  [/text-stone-900/g, 'text-fjord'],
  [/text-stone-800/g, 'text-fjord-hover'],
  [/text-stone-500/g, 'text-muted'],
  [/text-stone-400/g, 'text-muted/70'],
  [/text-stone-100/g, 'text-white'],
  [/text-stone-50/g, 'text-white'],
  
  // Backgrounds
  [/bg-stone-950/g, 'bg-fjord'],
  [/bg-stone-900/g, 'bg-fjord-hover'],
  [/bg-stone-800/g, 'bg-fjord-hover/80'],
  [/bg-stone-300/g, 'bg-border'],
  [/bg-stone-200/g, 'bg-surface-subtle'],
  [/bg-stone-100/g, 'bg-surface-subtle/50'],
  [/bg-stone-50/g, 'bg-surface'],
  
  // Borders
  [/border-stone-900/g, 'border-fjord'],
  [/border-stone-800/g, 'border-border-strong'],
  [/border-stone-700/g, 'border-border'],
  [/border-stone-300/g, 'border-border'],
  [/border-stone-200/g, 'border-border/60'],
  
  // Rings
  [/ring-stone-900/g, 'ring-fjord'],
  [/ring-stone-800/g, 'ring-border-strong'],
];

for (const [pattern, replacement] of replacements) {
  content = content.replace(pattern, replacement);
}

// Custom deduplication / fixing specific known conflicts
content = content.replace('dark:bg-surface-subtle/50 dark:bg-surface-subtle', 'dark:bg-surface-subtle');
content = content.replace('dark:bg-fjord-hover dark:bg-fjord', 'dark:bg-fjord');
content = content.replace('dark:bg-fjord-hover/80/5 dark:bg-fjord-hover/80/15', 'dark:bg-fjord-hover/10');
content = content.replace('dark:bg-surface-subtle/50 dark:bg-surface-subtle', 'dark:bg-surface-subtle');

// Deduplicate all classNames
content = content.replace(/className=(["'])(.*?)\1/g, (match, quote, classNames) => {
  const classes = classNames.split(/\s+/).filter(Boolean);
  const unique = [...new Set(classes)].join(' ');
  return \className=\\\\;
});

// Deduplicate dynamic classNames with cn()
content = content.replace(/'(.*?)'/g, (match, classNames) => {
  // Only process if it looks like a list of tailwind classes
  if (classNames.includes(' ') && (classNames.includes('bg-') || classNames.includes('text-') || classNames.includes('border-') || classNames.includes('dark:'))) {
    const classes = classNames.split(/\s+/).filter(Boolean);
    const unique = [...new Set(classes)].join(' ');
    return \'\'\;
  }
  return match;
});

// Write back
fs.writeFileSync('components/discover/discover-client.tsx', content, 'utf8');
