import { characterToMarkdown } from './characterToMarkdown';
import { characterToPdf } from './characterToPdf';
import { defaultValue } from './data';
import express from 'express';
import path from 'path';

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../../build')));

app.get('/', function(_request, response) {
  response.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/api/character/:id', (_request, response) => {
  response.json(defaultValue);
});

app.get('/character/:id/markdown', (_request, response) => {
  const fileData = characterToMarkdown(defaultValue);
  const buffer = Buffer.from(fileData, 'utf8');

  response.set({
    'Cache-Control': 'no-cache',
    'Content-Type': 'text-plain',
    'Content-Disposition': 'attachment; filename=FOO.md',
  });

  response.send(buffer);
});

app.get('/character/:id/pdf', (_request, response) => {
  const doc = characterToPdf(defaultValue);
  const data = doc.output();

  response.set({
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'attachment; filename=FOO.pdf',
  });

  response.send(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
