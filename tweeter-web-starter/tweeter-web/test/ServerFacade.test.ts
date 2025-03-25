import "isomorphic-fetch";
import { Buffer } from "buffer";
import { ServerFacade } from "../src/network/ServerFacade";
import { FollowRequest, PagedUserItemRequest, RegisterRequest, UserDto } from "tweeter-shared";


describe('StatusService', () => {
  let serverFacade: ServerFacade;
  beforeAll(() => {
    serverFacade = new ServerFacade();
  });
  
  it(' registers new users with a first name, last name, alias, password, and a profile photo ', async () => {
    const userImage = new Uint8Array([1,2,3,4,5,6,7,8]);
    const imageStringBase64: string =
		  Buffer.from(userImage).toString("base64");
    const registerRequest: RegisterRequest = {
        token : "token1234",
        alias : "@hillbilly77",
        password : "aCoolPassword",
        firstName : "billy bob",
        lastName : "Smith",
        userImageBytes : imageStringBase64,
        imageFileExtension : "anExtension"
    }

    const [ user, authToken ] = await serverFacade.register(registerRequest);
    expect(user).toBeDefined();
    expect(authToken).toBeDefined();
  });

  it(' gets the followers of a user ', async () => {
    const getFollowerRequest: PagedUserItemRequest = {
        token : "token1234",
        userAlias : "@hillbilly77",
        pageSize : 10,
        lastItem : null
    }

    const [ user, hasMore ] = await serverFacade.getMoreFollows(getFollowerRequest, "/follower/list");
    expect(user).toBeDefined();
    expect(hasMore).toBeDefined();
  });

  it(' gets number of people a user follows (followee count) ', async () => {
    const userDto: UserDto = {
        firstName: "Matilda",
        lastName: "Knox",
        alias: "@magicEverywhere",
        imageUrl: "thisIsAUrl"
    }

    const getFolloweeRequest: FollowRequest = {
        token : "token1234",
        user: userDto
    }

    const followeeCount = await serverFacade.getFolloweeCount(getFolloweeRequest);
    expect(followeeCount).toBeGreaterThan(-1);
  });
});