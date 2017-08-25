# firebase-express

Serve Firebase project with Express server.


## Installation

    npm install firebase-express


## Usage

```js
import * as express from 'express';
import { serve } from 'firebase-express';

const app = express();
app.get('/', (req, res) => res.send('Hello World'));

serve(app);
```