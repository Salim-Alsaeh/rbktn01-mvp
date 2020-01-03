const server = require('express');

const app = server();


app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));


const PORT = process.env.PORT || 6942;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
