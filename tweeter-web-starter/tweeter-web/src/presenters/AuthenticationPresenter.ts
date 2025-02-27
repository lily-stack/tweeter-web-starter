import { AuthToken, User } from "tweeter-shared";
import { Presenter, View } from "./Presenter";
import { NavigateFunction, useNavigate } from "react-router-dom";

export interface AuthenticationView extends View {
    updateUserInfo: (
            user: User,
            user2: User,
            authToken: AuthToken,
            rememberMe: boolean
        ) => void
}

export abstract class AuthenticationPresenter<V extends AuthenticationView> extends Presenter<V> {
    private navigate: NavigateFunction = useNavigate();
    
    protected async doAuthenticationOperation(authenticationFunc: () => Promise<[User, AuthToken]>, view: AuthenticationView, rememberMe: boolean):Promise<void> {
        const [user, authToken] = await authenticationFunc();
    
        view.updateUserInfo(user, user, authToken, rememberMe);

    };

    protected navigation(originalUrl?: string) {
        if (originalUrl) {
            this.navigate(originalUrl!);
        } else {
            this.navigate("/");
        }
    }
}
