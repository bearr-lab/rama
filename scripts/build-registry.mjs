import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uiDir = path.join(__dirname, '../components/ui');
const registryDir = path.join(__dirname, '../public/registry');

// Create registry directory if it doesn't exist
if (!fs.existsSync(registryDir)) {
  fs.mkdirSync(registryDir, { recursive: true });
}

const files = fs.readdirSync(uiDir).filter(f => f.endsWith('.tsx'));
const items = [];

for (const file of files) {
  const name = file.replace('.tsx', '');
  const content = fs.readFileSync(path.join(uiDir, file), 'utf8');
  
  // Basic dependency extraction
  const deps = [];
  if (content.includes('@base-ui/react')) deps.push('@base-ui/react');
  if (content.includes('class-variance-authority')) deps.push('class-variance-authority');
  if (content.includes('lucide-react')) deps.push('lucide-react');
  
  const item = {
    name,
    type: 'registry:ui',
    dependencies: deps,
    files: [
      {
        path: `components/ui/${file}`,
        content,
        type: "registry:ui"
      }
    ]
  };

  if (content.includes('@/lib/utils')) {
    item.files.push({
      path: 'lib/utils.ts',
      content: fs.readFileSync(path.join(process.cwd(), 'lib/utils.ts'), 'utf8'),
      type: 'registry:lib'
    });
  }

  // write item json
  fs.writeFileSync(path.join(registryDir, `${name}.json`), JSON.stringify(item, null, 2));

  const article = ['a', 'e', 'i', 'o', 'u'].includes(name.charAt(0).toLowerCase()) ? 'An' : 'A';
  items.push({
    name,
    type: 'registry:ui',
    title: name.charAt(0).toUpperCase() + name.slice(1),
    description: `${article} ${name} component.`,
    files: [
      {
        path: `components/ui/${file}`,
        type: 'registry:ui',
      },
    ],
  });
}

// write registry.json
const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "rama-registry",
  homepage: "http://localhost:3000",
  items
};

fs.writeFileSync(path.join(__dirname, '../public/registry.json'), JSON.stringify(registry, null, 2));
console.log('Registry built successfully!');
