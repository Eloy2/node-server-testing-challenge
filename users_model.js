const db = require("./config")

function get() {
    return db("users")
}

async function add(payload) {
    const [newitemid] = await db.insert(payload).into("users")
    const newItem = await db.first("*").from("users").where("id", newitemid)
    return newItem
}

async function del(id) {
    const deleted = await db.first("*").from("users").where("id", id)

    if (deleted) {
        await db("users").where("id", id).del()
        return deleted
    } else {
        return { message: "Not Found"}
    }

}

module.exports = {
    get,
    add,
    del,
}
