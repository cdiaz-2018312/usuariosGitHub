const API_URL = "https://api.github.com/users/";

const principal = document.getElementById("main");
const espacioBusqueda = document.getElementById("busqueda");

const getUser = async (usuario) => {
    try {
        const response = await fetch(API_URL + usuario);
        const data = await response.json();
        const card = `
    <div class="card">
            <div>
                <img src="${data.avatar_url}" alt="image" class="avatar">
            </div>
            <div class="usuario-inf">
                <h2>${data.name}</h2>
                <p>${data.bio}</p>
                <ul class="info">
                    <li>${data.public_repos}<strong>Repos</strong></li>
                </ul>

                <div id="repo"></div>
            </div>
        </div>
    `
        principal.innerHTML = card;
        getRepos(usuario);
        console.log(data);
    } catch (error) {
        console.log(error.response.status);
        if (error.response.status == 404) {
            cardDeError('No existe usuario con ese nombre :b');
        }
    }
}

// init call
getUser("cdiaz-2018312");

const getRepos = async (username) => {
    try {
        const repos = document.getElementById("repo");
        const response = await fetch(API_URL + username + "/repos");
        const data = await response.json();
        console.log(data);
        data.map((item) => {
            const elem = document.createElement("a");
            elem.classList.add("repo");
            elem.href = item.html_url;
            elem.innerText = item.name;
            elem.target = "_blank";
            repos.appendChild(elem);
        })
    } catch (error) {
        cardDeError('No existe usuario con ese nombre :b');
    }
}

const formSubmit = (e) => {
    if (espacioBusqueda.value != "") {
        getUser(espacioBusqueda.value);
        espacioBusqueda.value = "";
    }
    return false;
}

espacioBusqueda.addEventListener("focusout", () => {
    formSubmit();
})

const cardDeError = (msg) => {
    const cardHTML = `
        <div class="card">
            <h1>${msg}</h1>
        </div>
    `
    principal.innerHTML = cardHTML;
}