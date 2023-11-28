// // pages/api/editFile.js
// import fs from 'fs/promises';
// import path from 'path';

// export default async (req, res) => {
//   if (req.method === 'POST') {

//     const { fileName, content } = req.body;

//     try {
//       const filePath = path.join(process.cwd(), 'pages', `${fileName}.js`);
//       await fs.writeFile(filePath, content);
//       res.status(200).json({ message: 'File updated successfully' });
//     } catch (error) {
//       console.error('Error updating file:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   } else {
//     res.status(405).json({ error: 'Method Not Allowed' });
//   }
// };







// pages/api/editFile.js
import fs from 'fs/promises';
import path from 'path';
import axios from 'axios';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { fileName, title, description } = req.body; // Destructure title and description

    try {
      const checkTitle = await axios.get(`http://127.0.0.1:8000/api/pages/checkTitle/${title}`);
      if (checkTitle.data.message === 'Page title already exists') {
        return res.status(409).json({ error: 'Page title already exists in the database' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    
    // Replace line breaks with HTML <br> tags in the description
    const formattedDescription = description.replace('<br>', '<br/>');

    try {
      const filePath = path.join(process.cwd(), 'pages', `${fileName}.js`);
      const jsCode = `
        import React from 'react';
        import Layout from "./layouts/Layout";
        
        function ${fileName}() {
          return (
            <Layout>
              <h1>${title}</h1>
              <div id="paragraph">${formattedDescription}</div>
            </Layout>
          );
        }
        
        export default ${fileName};
      `;

      await fs.writeFile(filePath, jsCode);
      res.status(200).json({ message: 'File updated successfully' });
    } catch (error) {
      console.error('Error updating file:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};





