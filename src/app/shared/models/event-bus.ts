import { EventEmitter } from '@angular/core';

export interface EventBus {
  name: string;
  data: any;
}

export interface EventBusOptionals {
  eventSource?: EventBus;
  incomingEvent?: EventBus;
  outgoingEvent?: EventEmitter<EventBus>;
}

export interface EventBusEmitter extends EventBusOptionals {
  emitEvent: (event: EventBus) => void;
}

export interface EventBusReceiver extends EventBusOptionals {
  onEvent: (event: EventBus) => void;
}
