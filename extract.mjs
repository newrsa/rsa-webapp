import fs from 'fs';
import zlib from 'zlib';

try {
  const html = fs.readFileSync('BlueBook.html', 'utf8');
  
  // Find the template
  const templateMatch = html.match(/<script type="__bundler\/template">\n(.*?)\n<\/script>/s);
  if (templateMatch) {
    fs.writeFileSync('extracted_template.html', JSON.parse(templateMatch[1]));
    console.log('Saved extracted_template.html');
  }

  // Find the manifest
  const manifestMatch = html.match(/<script type="__bundler\/manifest">\n(.*?)\n<\/script>/s);
  if (manifestMatch) {
    const manifest = JSON.parse(manifestMatch[1]);
    for (const [uuid, entry] of Object.entries(manifest)) {
      if (entry.mime === 'text/javascript' || entry.mime === 'text/jsx' || entry.mime === 'application/javascript') {
        const buf = Buffer.from(entry.data, 'base64');
        const decompressed = entry.compressed ? zlib.gunzipSync(buf).toString('utf8') : buf.toString('utf8');
        fs.writeFileSync(`extracted_${uuid}.tsx`, decompressed);
        console.log(`Saved extracted_${uuid}.tsx`);
      }
    }
  } else {
    console.log('No manifest found in HTML');
  }
} catch (e) {
  console.error('Error:', e.message);
}
