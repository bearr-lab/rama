export type TransactionState =
  | 'DRAFT'
  | 'VIEWING_SCHEDULED'
  | 'OFFER_MADE'
  | 'OFFER_ACCEPTED'
  | 'CONTRACT_DRAFTED'
  | 'NOC_REQUESTED'
  | 'TRANSFER_PENDING'
  | 'COMPLETED'
  | 'CANCELLED';

export interface TransitionEvent {
  type: string;
  payload?: any;
}

/**
 * State Machine for Offers & Transactions (Epic 15.2)
 * Ensures transactions strictly follow DLD legal flows.
 */
export class TransactionMachine {
  private state: TransactionState;

  constructor(initialState: TransactionState = 'DRAFT') {
    this.state = initialState;
  }

  public transition(event: TransitionEvent): TransactionState {
    switch (this.state) {
      case 'DRAFT':
        if (event.type === 'SCHEDULE_VIEWING') this.state = 'VIEWING_SCHEDULED';
        break;
      case 'VIEWING_SCHEDULED':
        if (event.type === 'MAKE_OFFER') this.state = 'OFFER_MADE';
        break;
      case 'OFFER_MADE':
        if (event.type === 'ACCEPT_OFFER') this.state = 'OFFER_ACCEPTED';
        if (event.type === 'REJECT_OFFER') this.state = 'CANCELLED';
        break;
      // ... further state transitions
    }
    return this.state;
  }

  public getState() {
    return this.state;
  }
}
