//Nodes
const container = document.querySelector(".container");
const searchForm = document.getElementById("searchForm");
const tbxSearch = document.getElementById("tbxSearch");
const btnSearch = document.getElementById("btnSearch");
const tblRepos = document.getElementById("tblRepos");
const searchedUsersSection = document.getElementById("searchedUsers");
const btnClearUsers = document.getElementById("btnClearUsers");

//Services
const _githubDal = new GithubDal();
const _uiManager = new UIManager();
const _storageServices = new StorageServices();


searchForm.addEventListener("submit", (e) => {

    const userName = tbxSearch.value;
    //User Info
    _githubDal.GetUserInfo(userName)
        .then((data) => {

            if (data.message != null) {
                _uiManager.CreateAlert("danger", "The username you specified does not exist.")
            } else {
                _uiManager.AddUserInfo(data);

                //User Repos
                _githubDal.GetUserRepos(userName)
                    .then((data) => {

                        document.getElementById("userRepos").style.visibility = "visible"
                        tblRepos.innerHTML = "";
                        data.forEach((repo) => {
                            _uiManager.AddUserRepo(repo);
                        });
                    })
                    .catch(err => console.error(err))

                if (!_storageServices.IsUserExist(userName)) {
                    _uiManager.AddSearchedUser(userName);
                }
                _storageServices.AddSearchedUser(userName)//Add to Storage
                _uiManager.CreateAlert("success", "The user infomations has been found.");
            }
        })
        .catch((err) => {

            console.error(err);

        });

    e.preventDefault();
})

this.addEventListener("DOMContentLoaded", (e) => {

    //Last Searched 10 Users
    _storageServices.GetSearchedUsers().forEach((user, index) => {
        if (index < 10) {
            _uiManager.AddSearchedUser(user)
        } else {
            return;
        }
    });

})
searchedUsersSection.addEventListener("click", (e) => {

    if (e.target.className.includes("badge")) {
        //Load searched user to UI.
        tbxSearch.value = e.target.textContent;
        btnSearch.click();


    }
    else if (e.target.className.includes("fa-remove")) {
        const userName = e.target.parentElement
        console.log(userName)
        _storageServices.DeleteSearchedUser(userName.textContent);//Delete searched user from storage.
        _uiManager.DeleteSearchedUserFromUI(userName);//Delete searched user from UI.
    }

})

btnClearUsers.addEventListener("click", (e) => {

    if (confirm("Are you sure you want to delete all searched users?")) {

        _storageServices.ClearSearchedUser();
        _uiManager.ClearUser();

    }

})