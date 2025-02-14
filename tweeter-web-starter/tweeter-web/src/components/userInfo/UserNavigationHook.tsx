import userInfoHook from "./UserInfoHook";
import useToastListener from "../toaster/ToastListenerHook";
import { UserNavigationPresenter, UserNavigationView } from "../../presenters/UserNavigationPresenter";

const useUserNavigationHook = () => {
    const { setDisplayedUser, authToken, currentUser } = userInfoHook();
    const { displayErrorMessage } = useToastListener();

    const listener: UserNavigationView = {
        displayErrorMessage: displayErrorMessage,
        setDisplayedUser: setDisplayedUser
    }
    const presenter = new UserNavigationPresenter(listener);

    const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
        presenter.navigateToUser(event, authToken, currentUser);
    };
      
    return (
        {navigateToUser: navigateToUser}
    );
}

export default useUserNavigationHook;