import app from 'app';

const port = 4000 || process.env.PORT;

app.listen(port, () => console.log(`server running at port: ${port}`));
