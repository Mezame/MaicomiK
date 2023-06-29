import { EventEmitter } from '@angular/core';

export interface EventBus {
  name: string;
  data: any;
}

export interface EventBusEmitter {
  emitEvent: (event: EventBus) => void;

  incomingEvent?: EventBus['name'];
  outgoingEvent?: EventEmitter<EventBus>;
}

export interface EventBusReceiver {
  onEvent: (event: EventBus) => void;

  eventNameSource?: EventBus['name'];
}
