import { render, screen } from "@testing-library/react";
import { instance, mock, verify } from "@typestrong/ts-mockito";
import { MemoryRouter } from "react-router-dom";
import { PostStatusPresenter } from "../../../../src/presenters/PostStatusPresenter";
import {userEvent} from "@testing-library/user-event";
import React from "react";
import PostStatus from "../../../../src/components/postStatus/PostStatus"
import "@testing-library/jest-dom"
import userInfoHook from "../../../../src/components/userInfo/UserInfoHook";
import { AuthToken, User } from "tweeter-shared";
import { MouseEvent as ReactMouseEvent } from "react";

jest.mock("../../../../src/components/userInfo/UserInfoHook", () => ({
    ...jest.requireActual("../../../../src/components/userInfo/UserInfoHook"),
    __esModule: true,
    default: jest.fn(),
}));  

describe("PostStatusComponent", () => {

    let mockAuthToken = mock<AuthToken>();
    let mockUser = mock<User>();

    const authToken = new AuthToken("abc123", Date.now());
    const event = {preventDefault: jest.fn()} as unknown as ReactMouseEvent<Element, MouseEvent>;
    const currentUser = new User("firstN", "lastN", "fake", "astrangeurl");
    const post = "a post froma  user is exciting";

    beforeAll(() => {
        mockAuthToken = mock<AuthToken>();
        const mockAuthTokenInstance = instance(mockAuthToken);

        mockUser = mock<User>();
        const mockUserInstance = instance(mockUser);

        (userInfoHook as jest.Mock).mockReturnValue({
            currentUser: mockUserInstance,
            authToken: mockAuthTokenInstance,
        });  
    });

    it("start with the Post Status and Clear buttons disabled", () => {
        const { postStatusButton, clearButton } = renderPostStatusAndGetElement();
        expect(postStatusButton).toBeDisabled();
        expect(clearButton).toBeDisabled();
    });

    it("Both Post Status and Clear buttons are enabled when the text field has text", async () => {
        const { postStatusButton, clearButton, textArea, user } = renderPostStatusAndGetElement();
        
        await user.type(textArea, "a");

        expect(postStatusButton).toBeEnabled();
        expect(clearButton).toBeEnabled();
    })

    it("disables post status and clear button if the text field is cleared", async () => {
        const { postStatusButton, clearButton, textArea, user } = renderPostStatusAndGetElement();
        
        await user.type(textArea, "a");

        expect(postStatusButton).toBeEnabled();
        expect(clearButton).toBeEnabled();

        await user.clear(textArea);
        expect(postStatusButton).toBeDisabled();
        expect(clearButton).toBeDisabled();

        await user.type(textArea, "1");
        expect(postStatusButton).toBeEnabled();
        expect(clearButton).toBeEnabled();
    })

    it("calls the presenters postStatus method with correct parameters when the post status button is pressed", async () => {
        const mockPresenter = mock<PostStatusPresenter>();
        const mockPresenterInstance = instance(mockPresenter);

        const { postStatusButton, clearButton, textArea, user } = renderPostStatusAndGetElement();

        await user.type(textArea,"a");
        await user.click(postStatusButton);

        await user.click(postStatusButton);

        verify(mockPresenter.submitPost(event, authToken, currentUser, post)).once()

        
    })

    
});

const renderPostStatus = () => {
    return render(
        <MemoryRouter>
            <PostStatus/>
        </MemoryRouter>
    );
};

const renderPostStatusAndGetElement = () => {
    const user = userEvent.setup();

    renderPostStatus();

    const postStatusButton = screen.getByLabelText("Post Status");
    const clearButton = screen.getByLabelText("Clear");
    const textArea = screen.getByLabelText("postStatus text");

    return {postStatusButton, clearButton, textArea, user}
}