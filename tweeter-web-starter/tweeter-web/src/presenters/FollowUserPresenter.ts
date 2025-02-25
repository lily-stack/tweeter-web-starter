import { AuthToken, User } from "tweeter-shared";
import { DisplayUserPresenter, DisplayUserView } from "./DisplayUserPresenter";
import { FollowService } from "../model/service/FollowService";

export class FollowUserPresenter extends DisplayUserPresenter {
    private followService: FollowService;

    public constructor(view: DisplayUserView) {
        super(view)
        this.followService = new FollowService();
    }

    public async updateDisplayUser(event: React.MouseEvent, authToken: AuthToken, displayedUser: User | null): Promise<void> {
        event.preventDefault();
        this.doFailureReportingOperation( async () => {
          this.view.setIsLoading(true);
            this.view.displayInfoMessage(`Following ${displayedUser!.name}...`, 0);
      
            const [followerCount, followeeCount] = await this.followService.follow(
              authToken!,
              displayedUser!
            );
      
            this.view.setIsFollower(true);
            this.view.setFollowerCount(followerCount);
            this.view.setFolloweeCount(followeeCount);
        }, "follow user");
        this.view.clearLastInfoMessage();
        this.view.setIsLoading(false);
      };
    
}