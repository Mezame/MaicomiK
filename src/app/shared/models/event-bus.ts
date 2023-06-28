import { EventEmitter } from '@angular/core';

export interface EventBus {
  name: string;
  data: any;
}

export interface EventBusEmitter {
  eventBus: EventEmitter<EventBus>;
}

export interface EventBusReceiver {
  onEventBus: (event: EventBus) => void;
}
