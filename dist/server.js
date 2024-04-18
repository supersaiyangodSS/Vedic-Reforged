import { app } from './app.js';
const port = 4000 || process.env.PORT;
app.listen(port, '0.0.0.0', () => console.log(`server running at port: ${port}`)); // ! remove local network
//# sourceMappingURL=server.js.map