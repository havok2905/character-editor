import bodyParser from 'body-parser';
import { characterToMarkdown } from './characterToMarkdown';
import { characterToPdf } from './characterToPdf';
import express from 'express';
import { getCharacter, saveCharacter } from './characterClient';
import { type ICharacter } from '../types/dnd/ICharacter';
import path from 'path';

const app = express();
const jsonParser = bodyParser.json();
const port = 3000;

app.use(express.static(path.join(__dirname, '../../build')));

app.get('/', function(_request, response) {
  response.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/api/character/:id', (request, response) => {
  const id = request.params.id;

  if (!id) {
    response.status(400).send();
  }

  const character = getCharacter(id);

  if (character) {
    response.json(character);
  } else {
    response.status(404).send();
  }
});

app.post('/api/character/:id', jsonParser, (request, response) => {
  const id = request.params.id;

  if (!id) {
    response.status(400).send();
  }

  const character = request.body.character as ICharacter;
  saveCharacter(id, character);
  response.json(character);
});

app.get('/character/:id/markdown', (request, response) => {
  const id = request.params.id;

  if (!id) {
    response.status(400).send();
  }

  const character = getCharacter(id);

  if (character) {
    const fileData = characterToMarkdown(character);
    const buffer = Buffer.from(fileData, 'utf8');
  
    response.set({
      'Cache-Control': 'no-cache',
      'Content-Type': 'text-plain',
      'Content-Disposition': 'attachment; filename=FOO.md',
    });
  
    response.send(buffer);
  } else {
    response.status(404).send();
  }
});

app.get('/character/:id/pdf', (request, response) => {
  const id = request.params.id;

  if (!id) {
    response.status(400).send();
  }

  const character = getCharacter(id);

  if (character) {
    const doc = characterToPdf(character);
    const data = doc.output();

    response.set({
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=FOO.pdf',
    });
  
    response.send(data);
  } else {
    response.status(404).send();
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
