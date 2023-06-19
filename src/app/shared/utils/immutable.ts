import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Immutable {
  /*https://javascript.plainenglish.io/how-to-deep-copy-objects-and-arrays-in-javascript-7c911359b089*/
  deepCopy(items: any): any {
    let deepCopied: any;

    if (typeof items !== 'object' || items === null) {
      return items;
    }

    deepCopied = Array.isArray(items) ? [] : {};

    for (const key in items) {
      const value = items[key];

      deepCopied[key] = this.deepCopy(value);
    }

    return deepCopied;
  }
}
