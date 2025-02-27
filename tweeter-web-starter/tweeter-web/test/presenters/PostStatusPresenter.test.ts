import { AuthToken, Status, User } from "tweeter-shared";
import { PostStatusPresenter, PostStatusView } from "../../src/presenters/PostStatusPresenter";
import { anything, capture, instance, mock, spy, verify, when } from "@typestrong/ts-mockito";
import { StatusService } from "../../src/model/service/StatusService";
import { MouseEvent as ReactMouseEvent } from "react";

describe("PostStatusPresenter", () => {
    let mockPostStatusPresenterView = mock<PostStatusView>();
    let postStatusPresenter: PostStatusPresenter;
    let mockStatusService: StatusService;

    const authToken = new AuthToken("abc123", Date.now());
    const event = {preventDefault: jest.fn()} as unknown as ReactMouseEvent<Element, MouseEvent>;
    const currentUser = new User("firstN", "lastN", "fake", "astrangeurl");
    const post = "a post froma  user is exciting";
    const status = new Status(post, currentUser!, Date.now());

    beforeEach(() => {
        mockPostStatusPresenterView = mock<PostStatusView>();
        const mockPostStatusPresenterViewInstance = instance(mockPostStatusPresenterView);

        const PostStatusPresenterSpy = spy(new PostStatusPresenter(mockPostStatusPresenterViewInstance));
        postStatusPresenter = instance(PostStatusPresenterSpy);

        mockStatusService = mock<StatusService>();
        const mockStatusServiceInstance = instance(mockStatusService);

        when(PostStatusPresenterSpy.statusService).thenReturn(mockStatusServiceInstance);
    });

    it("tells the view to display a posting status message", async () => {
        await postStatusPresenter.submitPost(
            event,
            authToken,
            currentUser,
            post);
        verify(mockPostStatusPresenterView.displayInfoMessage("Posting status...", 0));
    });

    it("calls postStatus on the post status service with the correct status string and auth Token", async () => {
        await postStatusPresenter.submitPost(
            event,
            authToken,
            currentUser,
            post);

        let [capturedStatus, capturedToken] = capture(mockStatusService.postStatus).last();
        expect(capturedStatus).toEqual(authToken);
        expect(capturedToken.post).toEqual(status.post);
        expect(capturedToken.user).toEqual(status.user);

    });

    it("Tells the view to clear the last info message, clear the post, and display a status posted message", async () => {
        await postStatusPresenter.submitPost(
            event,
            authToken,
            currentUser,
            post);

        verify(mockPostStatusPresenterView.clearLastInfoMessage()).once();
        verify(mockPostStatusPresenterView.setPost("")).once();
        verify(mockPostStatusPresenterView.displayInfoMessage("Status posted!", 2000)).once();
        verify(mockPostStatusPresenterView.displayErrorMessage(anything())).never();
        
    });

    it("displays error message and clears the last info message, but does not clear the post, or display a status posted message", async () => {
        const error = new Error("An error occurred");
        when(mockStatusService.postStatus(authToken, anything())).thenThrow(error);
        
        await postStatusPresenter.submitPost(
            event,
            authToken,
            currentUser,
            post);

        verify(mockPostStatusPresenterView.displayErrorMessage("Failed to post the status because of exception: An error occurred")).once();

        verify(mockPostStatusPresenterView.clearLastInfoMessage()).once();
        verify(mockPostStatusPresenterView.setPost(anything())).never();
        verify(mockPostStatusPresenterView.displayInfoMessage("Status posted!", 2000)).never();
    });

    
});