import * as dotenv from 'dotenv';

import { app } from './server';

const { PORT } = dotenv.config().parsed;

app.listen(PORT, function() {
  console.log(`Started MoneyExchange.io server at port ${PORT}`);
});
