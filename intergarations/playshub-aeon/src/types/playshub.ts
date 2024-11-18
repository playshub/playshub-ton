export interface PlayshubCheckInPayload {
  userId: string;
  timestamp: number;
}

export interface PlayshubPurchaseItemPayload {
  userId: string;
  itemId: string;
  amount: string;
}

export interface PlayshubGameCheckInPayload {
  account_id: string;
}

export interface PlayshubGamePurchaseItemPayload {
  account_id: string;
  item_id: string;
}
