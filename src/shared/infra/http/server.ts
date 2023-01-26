import {app} from "./app";
import createConnection from "@shared/infra/typeorm/";
const port = 3333;
createConnection();
app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
});
