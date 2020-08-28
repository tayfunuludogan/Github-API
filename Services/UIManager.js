class UIManager {

    constructor() {
        this.userInfo = document.getElementById("userInfo");
        this.searchedUsers = document.getElementById("searchedUsers");
        this.tblRepos = document.getElementById("tblRepos");
        this.searchedUsers = document.getElementById("searchedUsers");
    }

    ClearUser() {
        while (this.searchedUsers.lastElementChild != null) {
            this.searchedUsers.lastElementChild.remove();
        }
    }

    AddUserInfo(user) {

        this.userInfo.innerHTML = `

            <div class="card card-body mt-2">
                <div class="row d-flex">
                    <div class="card-img-top col-md-3 text-center mb-3">
                        <a id="profileLink" href="${user.html_url}" target="_blank">
                            <img id="profilePicture" class="img-thumbnail" src="${user.avatar_url}" alt=""
                                srcset="" style="width: 13rem;">
                        </a>
                        <hr>
                        <h5>${user.name}</h4>
                        <span class="text-muted">${user.bio}</span>
                    </div>

                    <div class="col-md-9">
                        
                            <a class="btn btn-dark text-white" >
                                Followers <span class="badge badge-light">${user.followers} </span>
                            </a>
                            <a class="btn btn-info text-white" >
                                Following <span class="badge badge-light">${user.following}</span>
                            </a>
                            <a class="btn btn-danger text-white">
                                Repos <span class="badge badge-light">${user.public_repos}</span>
                            </a>
                        

                        <div class="mt-3">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">
                                    <img src="images/mail.png" width="30px" alt="">
                                    <span>${user.email}</span>
                                </li>
                                <li class="list-group-item">
                                    <img src="images/location.png" width="30px" alt="">
                                    <span>${user.location}</span>
                                </li>
                                <li class="list-group-item">
                                    <img src="images/company.png" width="30px" alt="">
                                    <span>${user.company}</span>
                                </li>
                                <li class="list-group-item">
                                    <img src="images/twitter.png" width="30px" alt="">
                                    <span>${user.twitter_username}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
    `;
    }

    AddUserRepo(repo) {

        this.tblRepos.innerHTML += `
        
        <tr>
             <td>
                <a href="${repo.html_url}" target="_blank" style="font-size: 1.2rem;">${repo.name}</a>
            </td>
            <td>
                <span class="btn btn-success">${repo.stargazers_count}</span>
            </td>
            <td>
                <span class="btn btn-info">${repo.forks_count}</span>
            </td>
        </tr>
        `;
    }

    CreateAlert(alertType, message) {

        const alert = document.createElement("div");
        alert.className = `alert alert-${alertType} my-3`;
        alert.textContent = message;
        document.getElementById("firstCB").appendChild(alert);

        setTimeout(function () {
            alert.remove();
        }, 2000)
    }

    AddSearchedUser(userName) {
        const spanName = document.createElement("span")
        spanName.className = "badge badge-dark mx-1";
        spanName.textContent = userName;
        spanName.style.cursor="pointer";
        
        const icon = document.createElement("i");
        icon.className = "fa fa-remove ml-2";
        // icon.onclick = (e)=>{e.target.parentElement.remove()}
        spanName.appendChild(icon);
        this.searchedUsers.insertBefore(spanName,this.searchedUsers.childNodes[0]);
    }

    DeleteSearchedUserFromUI(node){
        node.remove();
    }



}
