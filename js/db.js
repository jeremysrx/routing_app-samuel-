const db = {
    instance: new Dexie("routing"),
}

db.init = () => {
    db.instance.version(1).stores({
        users:`
        ++id,
        firstname,
        lastname`,
        address:`
        userId,
        street,
        number,
        zipCode,
        city,
        country
        `
    });
};


db.addUser = (user) => {
    return db.instance.users.add(user)
};

db.removeUser = (userId) => {
    return db.instance.users.delete(userId)
};


db.getUsers = () => {
    return db.instance.users.toArray()
}