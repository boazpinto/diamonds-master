//user class
export default class User {
    constructor(parseUser) {
        this.id = parseUser.id;
        this.fname = parseUser.get("fname");
        this.lname = parseUser.get("lname");
        this.email = parseUser.get("email");
        this.username = parseUser.get("username");
        this.isLogin = parseUser.get("isLogin");
        this.lastLogout=parseUser.get("lastLogout");
        this.pic=parseUser.get("pic");
        this.cart=parseUser.get("cart");
    }
}


export function userDetails(id,allUsers){
    for (var i=0;i<allUsers.length;i++){
        if (id===allUsers[i].id) return allUsers[i];
    }
    return null;
}