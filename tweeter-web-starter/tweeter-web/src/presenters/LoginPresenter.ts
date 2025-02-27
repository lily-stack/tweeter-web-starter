import { UserService } from "../model/service/UserService";
import { AuthenticationPresenter, AuthenticationView } from "./AuthenticationPresenter";

export class LoginPresenter extends AuthenticationPresenter<AuthenticationView> {
    private userService: UserService;

    public constructor(view: AuthenticationView) {
        super(view);
        this.userService = new UserService();
    }

    public async doLogin (
        originalUrl: string | undefined,
        alias: string,
        password: string,
        rememberMe: boolean,
    ) {
        this.doFailureReportingOperation( async () => {
              this.doAuthenticationOperation( () => 
                this.userService.login(
                    alias, 
                    password
                ), this.view, rememberMe);
              this.navigation(originalUrl);
            }, "log user in");
        };
    }