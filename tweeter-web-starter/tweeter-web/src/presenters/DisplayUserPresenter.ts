import { AuthToken, User } from "tweeter-shared";
import { Presenter, MessageView } from "./Presenter";

export interface DisplayUserView extends MessageView{
    setIsLoading: (value: React.SetStateAction<boolean>) => void;
    setIsFollower: (value: React.SetStateAction<boolean>) => void;
    setFollowerCount: (value: React.SetStateAction<number>) => void;
    setFolloweeCount: (value: React.SetStateAction<number>) => void;
}

export abstract class DisplayUserPresenter extends Presenter {

    public constructor (view: DisplayUserView) {
        super(view);
    }

    public get view(): DisplayUserView {
        return super.view as DisplayUserView;
    }

    public abstract updateDisplayUser(
        event: React.MouseEvent,
        authToken: AuthToken,
        displayedUser: User | null
    ): Promise<void>

}