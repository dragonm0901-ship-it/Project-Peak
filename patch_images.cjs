const fs = require('fs');

let content = fs.readFileSync('src/App.jsx', 'utf8');

// Replace Image URLs
content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1600607686527-6fb886090705/g, 'https://images.unsplash.com/photo-1544735716-392fe2489ffa');
content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1616486338812-3dadae4b4ace/g, 'https://images.unsplash.com/photo-1585016495481-91613a3ab1bc');
content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1600585154340-be6161a56a0c/g, 'https://images.unsplash.com/photo-1572095945892-0b165b53e77f');
content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1600607687920-4e2a09cf159d/g, 'https://images.unsplash.com/photo-1506462945848-ac8ea6f609cc');

fs.writeFileSync('src/App.jsx', content);
