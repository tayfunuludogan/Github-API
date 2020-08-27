class StorageServices {

    constructor() {
        this.key = 'searchedUsers';
    }
    
    
    GetSearchedUsers() {

        let users;
        if (localStorage.getItem(this.key) === null) {
            users = [];
        } else {
            users = JSON.parse(localStorage.getItem(this.key))
        }
        return users;
    }

    AddSearchedUser(userName) {
        let value = this.GetSearchedUsers();
        
        if (value.indexOf(userName) === -1) {
            value.push(userName);
            localStorage.setItem(this.key, JSON.stringify(value));
        }
        console.log(value)
    }

    DeleteSearchedUser(userName) {
        let value = this.GetSearchedUsers();
        if (value.indexOf(userName) != -1) {
            value.splice(value.indexOf(userName), 1);
            localStorage.setItem(this.key,JSON.stringify(value));
        }
    }

    ClearSearchedUser() {
        localStorage.removeItem(this.key);
    }

    IsUserExist(userName){
        return this.GetSearchedUsers().includes(userName);
    }

}