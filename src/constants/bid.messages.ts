export abstract class Bid {
  public static readonly BID_PLACED: string =
    'Your bid has been sucessfullly placed.';

  public static readonly INVALID_AUCTION: string =
    'Looks like you are trying to bid on an invaild auction.';

  public static readonly FAILED_TO_PLACE_BID: string =
    'There was an error in submitting your bid. Please try again.';

  public static readonly BID_MUST_HIGHER: string =
    'Your bid amount can not be equal to or lower than the current auction bid.';
}
