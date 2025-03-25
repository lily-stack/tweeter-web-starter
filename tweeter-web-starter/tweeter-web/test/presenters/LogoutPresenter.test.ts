import { AuthToken } from "tweeter-shared";
import { LogoutPresenter, LogoutView } from "../../src/presenters/LogoutPresenter"
import { capture, instance, mock, spy, verify, when } from "@typestrong/ts-mockito"
import { UserService } from "../../src/model/service/UserService";
import "isomorphic-fetch";
describe("LogoutPresenter", () => {
    let mockLogoutPresenterView = mock<LogoutView>();
    let logoutPresenter: LogoutPresenter;
    let mockUserService: UserService;

    const authToken = new AuthToken("abc123", Date.now());

    beforeEach(() => {
        mockLogoutPresenterView = mock<LogoutView>();
        const mockLogoutPresenterViewInstance = instance(mockLogoutPresenterView);

        const LogoutPresenterSpy = spy(new LogoutPresenter(mockLogoutPresenterViewInstance));
        logoutPresenter = instance(LogoutPresenterSpy);

        mockUserService = mock<UserService>();
        const mockUserServiceInstance = instance(mockUserService);

        when(LogoutPresenterSpy.userService).thenReturn(mockUserServiceInstance);
    });

    it("tells the view to display a logging out message", async () => {
        await logoutPresenter.logOut(authToken);
        verify(mockLogoutPresenterView.displayInfoMessage("Logging Out...", 0))
        
    });

    it("calls logout on the user service with the correct auth Token", async () => {
        await logoutPresenter.logOut(authToken);
        verify(mockUserService.logout(authToken)).once();
        
        // let [capturedAuthToken] = capture(mockUserService.logout).let();
        // expect(capturedAuthToken).toEqual(authToken);
    });

    it("Tells the view to clear the last info message, clear the user info, and navigate to the login page", async () => {
        await logoutPresenter.logOut(authToken);

        verify(mockLogoutPresenterView.clearLastInfoMessage()).once();
        verify(mockLogoutPresenterView.clearUserInfo()).once();
        
    });

    it("displays error message and does not clear the last info message, clears the user info, and navigates to the login page", async () => {
        const error = new Error("An error occurred");
        when(mockUserService.logout(authToken)).thenThrow(error);

        await logoutPresenter.logOut(authToken);

        verify(mockLogoutPresenterView.displayErrorMessage("Failed to log user out because of exception: An error occurred")).once();

        verify(mockLogoutPresenterView.clearLastInfoMessage()).never();
        verify(mockLogoutPresenterView.clearUserInfo()).never();
        
    });

    
});