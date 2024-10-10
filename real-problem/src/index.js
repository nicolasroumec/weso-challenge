const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', require('./routes/apiRoutes'));

app.use((err, res) => {
  console.error(err.stack);
  res.status(500).send('Error');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});