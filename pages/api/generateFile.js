import fs from 'fs';
import path from 'path';
import axios from 'axios';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { title, description } = req.body;
    
    try {
      const checkTitle = await axios.get(`http://127.0.0.1:8000/api/pages/checkTitle/${title}`);
      if (checkTitle.data.message === 'Page title already exists') {
        return res.status(409).json({ error: 'Page title already exists in the database' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Format the title to remove spaces
    const formattedTitle = title.replace(/\s/g, '');

    // Replace line breaks with HTML <br> tags in the description
    const formattedDescription = description.replace('<br>', '<br/>');

    const jsCode = `
    import React from 'react';
    import Layout from "./layouts/Layout";
    // Define your React component here
    function ${formattedTitle}() {
      return (
        <Layout>
        
          <h1>${title}</h1>
          <div id="paragraph">${formattedDescription}</div>
        
        </Layout>
      );
    }

    export default ${formattedTitle};
  `;

    // Define the file path relative to the root directory
    const filePath = path.join(process.cwd(), 'pages', `${formattedTitle}.js`);

    try {
      // Write the JavaScript code to the file
      fs.writeFileSync(filePath, jsCode);

      return res.status(200).json({ message: 'File created successfully' });
    } catch (error) {
      console.error('Error creating file:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
};


