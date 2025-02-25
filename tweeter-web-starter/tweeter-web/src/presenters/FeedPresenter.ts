import { StatusItemPresenter, StatusItemView } from "./StatusItemPresenter";
import { StatusService } from "../model/service/StatusService";
import { AuthToken, Status } from "tweeter-shared";
import { PAGE_SIZE } from "./PagedItemPresenter";


export class FeedPresenter extends StatusItemPresenter {
    protected getMoreItems(authToken: AuthToken, userAlias: string): Promise<[Status[], boolean]> {
      return this.statusService.loadMoreFeedItems(
        authToken,
        userAlias,
        PAGE_SIZE,
        this.lastItem
      );
    }
    protected getItemDescription(): string {
      return "load feed items";
    }

    private statusService: StatusService;

    public constructor(view: StatusItemView) {
        super(view);
        this.statusService =  new StatusService(); 
    }
}