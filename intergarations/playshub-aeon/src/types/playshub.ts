export interface PlayshubCheckInPayload {
  userId: string;
  timestamp: number;
}

export interface PlayshubPurchaseItemPayload {
  userId: string;
  itemId: string;
  amount: string;
}
