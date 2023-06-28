import { EventEmitter } from '@angular/core';

export interface EventBus {
  name: string;
  data: any;
}

export interface EventBusEmitter {
  outgoingEvent: EventEmitter<EventBus>;

  incomingEvent?: EventBus['name'];
}

export interface EventBusReceiver {
  onEventBus: (event: EventBus) => void;

  sourceEventName?: EventBus['name'];
}
