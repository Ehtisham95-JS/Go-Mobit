const url = '/api/v1';

const tableBody = document.querySelector('#row');
const userSearchName = document.querySelector('#users');
const searchForm = document.querySelector('#search-form');

// Get All Users in View User Menu
fetch(`${url}/users`)
    .then((response) => response.json())
    .then((data) => {
        const users = data.user;


        const allUser = users.map((item) => {

            return ` <tr>
                <td>${item._id}</td>
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td>${item.phone}</td>
                <td>${item.createdAt}</td>
                <td>
                    <button  id="delete-btn" onclick="btnClick('${item._id}')">Delete</button>
                </td>

            </tr>`;
        })


        const stringData = allUser.toString().replaceAll(',', '');
        tableBody.innerHTML = stringData

        const name = users.map((item) => {
            let options = document.createElement('option');
            options.value = item._id;
            options.textContent = item.name;
            return options;
        })

        userSearchName.append(...name);

    })
    .catch((error) => {
        console.log(error);
    })



// Get Single User From Drop Down
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    var e = document.getElementById("users");
    var value = e.value;
    var text = e.options[e.selectedIndex].text;

    fetch(`${url}/users/?_id=${value}`, {
        referrer: ' http://localhost:3000/users'
    })
        .then((response) => response.json())
        .then((data) => {
            const users = data.user

            const user = ` <tr>
                <td>${data.user[0]._id}</td>
                <td>${data.user[0].name}</td>
                <td>${data.user[0].email}</td>
                <td>${data.user[0].phone}</td>
                <td>${data.user[0].createdAt}</td>
                <td>
                    <button  id="delete-btn" onclick="btnClick('${data.user[0]._id}')">Delete</button>
                </td>

            </tr>`
            tableBody.innerHTML = user;

            if (users.length > 1) {
                const allUser = users.map((item) => {

                    return ` <tr>
                                <td>${item._id}</td>
                                <td>${item.name}</td>
                                <td>${item.email}</td>
                                <td>${item.phone}</td>
                                <td>${item.createdAt}</td>
                                <td>
                                    <button id="delete-btn" onclick="btnClick('${item._id}')">Delete</button>
                                </td>

                            </tr>`;
                })


                const stringData = allUser.toString().replaceAll(',', '');
                tableBody.innerHTML = stringData
            }
        })
})

// Delete User
function btnClick(_id) {
    return fetch(`${url}/users/delete/${_id}`, { method: "DELETE" })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            window.location.href = '/viewUser.html';
        })
        .catch((err) => {
            console.log(err);
        })
}