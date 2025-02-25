import { NavigateFunction, useNavigate } from "react-router-dom";
import { User, AuthToken } from "tweeter-shared"
import { UserService } from "../model/service/UserService";
import { Presenter, View } from "./Presenter";

export interface LoginView extends View {
    updateUserInfo: (
        user: User,
        user2: User,
        authToken: AuthToken,
        rememberMe: boolean
    ) => void
}

export class LoginPresenter extends Presenter<LoginView> {
    private _navigate:NavigateFunction = useNavigate();
    private userService: UserService;

    public constructor(view: LoginView) {
        super(view);
        this.userService = new UserService();
    }

    protected get navigate() {
        return this._navigate;
    }

    public async doLogin (
        originalUrl: string | undefined,
        alias: string,
        password: string,
        rememberMe: boolean,
    ) {
        this.doFailureReportingOperation( async () => {
            const [user, authToken] = await this.userService.login(
                alias, 
                password
              );
        
              this.view.updateUserInfo(user, user, authToken, rememberMe);
    
                if (originalUrl) {
                    this.navigate(originalUrl!);
                } else {
                    this.navigate("/");
                }
        }, "log user in");
    }
}