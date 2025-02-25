import { NavigateFunction, useNavigate } from "react-router-dom";
import { AuthToken, User } from "tweeter-shared";

export interface View {
    displayErrorMessage: (message: string) => void
}

export interface MessageView extends View {
    displayInfoMessage: (message: string, duration: number, bootstrapClasses?: string) => void;
    clearLastInfoMessage: () => void;
}

export interface AuthenticationView extends View {
    updateUserInfo: (
        user: User,
        user2: User,
        authToken: AuthToken,
        rememberMe: boolean
    ) => void
}

export class Presenter<V extends View> {
    private _view: V;
    private navigate: NavigateFunction = useNavigate();

    protected constructor(view: V) {
        this._view = view;
    }

    protected get view(): V {
        return this._view;
    }

    protected async doFailureReportingOperation(operation: () => Promise<void>, operationDescription: string): Promise<void> {
        try {

            await operation();

        } catch (error) {
            this.view.displayErrorMessage(
            `Failed to load ${operationDescription} because of exception: ${error}`
            );
        }
    }

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