const { checkUser } = require("./models/db");

async function output() {
    const isExist = await checkUser("Amand");
    console.log(isExist);
}
output();
