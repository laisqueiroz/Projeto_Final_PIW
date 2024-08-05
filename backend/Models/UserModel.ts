export class User{
    private id: number;
    private login: string;
    private role: string;
    private password: string;

    constructor(id: number , login: string , role: string,  password: string) {
        this.id = id;
        this.login = login;
        this.role = role;
        this.password = password;
    }

    public getLogin(): string {
        return this.login;
    }

    public setLogin(login: string): void {
        if (login.trim().length === 0) {
            throw new Error('O nome não pode ser vazio.');
        }
        this.login = login;
    }

    public getRole(): string {
        return this.role;
    }

    public setRole(role: string): void {
        if (role === 'admin' || role === 'medVet' || role === 'funcionario') {
            this.role = role
        }else{
            this.role = 'unregisteredUser';
        }
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        if (password.trim().length === 0) {
            throw new Error('O senha não pode ser vazio.');
        }
        this.password = password;
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

}