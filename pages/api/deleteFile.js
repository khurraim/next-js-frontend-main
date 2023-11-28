import fs from 'fs';
import path from 'path';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { fileName } = req.body;

    try {
      // Define the file path relative to the root directory
      const filePath = path.join(process.cwd(), 'pages', fileName);

      // Delete the file
      fs.unlinkSync(filePath);

      return res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
      console.error('Error deleting file:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
};
