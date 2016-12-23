export class User {
    public anonymous: boolean;
    public email: string;
    public emailVerified: boolean;
    public name: string;
    public profileImageURL: string;
    public refreshToken: string;
    public uid: string;

    constructor(anonymous: boolean,
                email: string,
                emailVerified: boolean,
                name: string,
                profileImageURL: string,
                refreshToken: string,
                uid: string) {
        this.anonymous = anonymous;
        this.email = email;
        this.emailVerified = emailVerified;
        this.name = name;
        this.profileImageURL = profileImageURL;
        this.refreshToken = refreshToken;
        this.uid = uid;
    }
}