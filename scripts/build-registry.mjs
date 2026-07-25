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

  // write item json
  fs.writeFileSync(path.join(registryDir, `${name}.json`), JSON.stringify(item, null, 2));

  items.push({
    name,
    type: 'registry:ui',
    title: name.charAt(0).toUpperCase() + name.slice(1),
    description: `A ${name} component.`,
    files: [`components/ui/${file}`]
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
