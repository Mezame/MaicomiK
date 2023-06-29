import { EventEmitter } from '@angular/core';

export interface EventBus {
  name: string;
  data: any;
}

export interface EventBusEmitter {
  outgoingEvent: EventEmitter<EventBus>;
  emitEvent: (event: EventBus) => void;

  incomingEvent?: EventBus['name'];
}

export interface EventBusReceiver {
  onEvent: (event: EventBus) => void;

  eventNameSource?: EventBus['name'];
}
