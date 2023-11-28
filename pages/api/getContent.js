import fs from 'fs/promises';
import path from 'path';
import cheerio from 'cheerio';

export default async (req, res) => {
  const { fileName } = req.query;

  try {
    const filePath = path.join(process.cwd(), 'pages', `${fileName}.js`);
    const fileContent = await fs.readFile(filePath, 'utf-8');

    // Use cheerio to parse the JSX/HTML content
    const $ = cheerio.load(fileContent);

    // Extract the title (h1) and the description content (inside the div)
    const title = $('h1').text();
    const description = $('#paragraph').text();

    res.status(200).json({ title, description });
  } catch (error) {
    console.error('Error reading file:', error);
    res.status(500).json({ error: 'Error reading file' });
  }
};
