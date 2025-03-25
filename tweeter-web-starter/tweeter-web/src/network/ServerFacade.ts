import {
  PagedStatusItemRequest,
    PagedStatusItemResponse,
    PagedUserItemRequest,
    PagedUserItemResponse,
    PostStatusRequest,
    Status,
    TweeterResponse,
    User,
    UserDto,
  } from "tweeter-shared";
  import { ClientCommunicator } from "./ClientCommunicator";
  
  export class ServerFacade {
    private SERVER_URL = "https://zpc80o55m6.execute-api.us-west-2.amazonaws.com/dev";
  
    private clientCommunicator = new ClientCommunicator(this.SERVER_URL);
  
    public async getMoreFollowees(
      request: PagedUserItemRequest
    ): Promise<[User[], boolean]> {
      const response = await this.clientCommunicator.doPost<
        PagedUserItemRequest,
        PagedUserItemResponse
      >(request, "/followee/list");
  
      // Convert the UserDto array returned by ClientCommunicator to a User array
      const items: User[] | null =
        response.success && response.items
          ? response.items.map((dto) => User.fromDto(dto) as User)
          : null;
  
      // Handle errors    
      if (response.success) {
        if (items == null) {
          throw new Error(`No followees found`);
        } else {
          return [items, response.hasMore];
        }
      } else {
        console.error(response);
        throw new Error(response.message);
      }
    }

    public async getMoreStatusItems(
      request: PagedStatusItemRequest,
      path: string
    ): Promise<[Status[], boolean]> {
      const response = await this.clientCommunicator.doPost<
        PagedStatusItemRequest,
        PagedStatusItemResponse
      >(request, path);
  
      // Convert the StatusDto array returned by ClientCommunicator to a User array
      const items: Status[] | null =
        response.success && response.items
          ? response.items.map((dto) => Status.fromDto(dto) as Status)
          : null;
  
      // Handle errors    
      if (response.success) {
        if (items == null) {
          throw new Error(`No status items found`);
        } else {
          return [items, response.hasMore];
        }
      } else {
        console.error(response);
        throw new Error(response.message);
      }
    }

    public async postStatus(
      request: PostStatusRequest,
    ): Promise<void>  {
      const response = await this.clientCommunicator.doPost<
        PostStatusRequest,
        TweeterResponse
      >(request, "/postStatus");
      // Handle errors    
      if (response.success) {
          return;
      } else {
        console.error(response);
        throw new Error(response.message);
      }
    }
  }