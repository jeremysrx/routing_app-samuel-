const home = {}

home.saveUser = () => {
        const form = document.querySelector('#form-user');
        const firstname = document.querySelector('#firstname').value;
        const lastname = document.querySelector('#lastname').value;

        db.addUser({firstname, lastname});
        form.reset();
};