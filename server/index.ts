import { PORT, app } from './server';

app.listen(PORT, function() {
  console.log(`Started api server at port ${PORT}`);
});
