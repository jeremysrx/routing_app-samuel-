const home = {}

home.init = () => {
    home.displayUsers();
};

home.saveUser = (event) => {
    event.preventDefault();
    const form = document.querySelector('#form-user');
    const firstname = document.querySelector('#firstname').value;
    const lastname = document.querySelector('#lastname').value;

    db.addUser({firstname, lastname});
    form.reset();
    home.displayUsers();
};

home.removeUser = async (userId) => {
    await db.removeUser(userId);
    await home.displayUsers();
};

home.displayUsers = async () => {
    const content = document.querySelector('#user-list tbody'); 
    const users = await db.getUsers();
    
    let data = '';
    for(let user  of users) {
        data += `
                <tr>
                    <th scope="row">${user.id}</th>
                    <td>${user.firstname}</td>
                    <td>${user.lastname}</td>
                    <td>
                        <button onclick="home.removeUser(${user.id})" class="btn btn-danger">S</button>
                    </td>
                </tr>
        `;
    }

    content.innerHTML = data;
} 


app.home = home;