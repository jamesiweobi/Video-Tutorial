const app = require('./src/app');
require('dotenv').config();

app.listen(process.env.PORT, () => {
    console.log(`Server Running on port: ${process.env.PORT}`);
});
