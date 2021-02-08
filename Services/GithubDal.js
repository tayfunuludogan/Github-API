class GithubDal{

    constructor(){
        this.endpoint = "https://api.github.com/users"
    }
    
    async GetUserInfo(userName){
        const response = await fetch(this.endpoint+`/${userName}`);
        const data = await response.json();
        return data;
    }

    async GetUserRepos(userName){
        const response = await fetch(this.endpoint+`/${userName}/repos`);
        const data = await response.json();
        return data;
    }
}
