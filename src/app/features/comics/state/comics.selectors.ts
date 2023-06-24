import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Comic } from '../models';

export const selectComics = createFeatureSelector<readonly Comic[]>('comics');

export const selectComic = (comicUrlSegment: string) =>
  createSelector(selectComics, (comics) => {
    let comic: Readonly<Comic>;

    comic = comics.find(
      (comic) => comic.metadata.urlSegment == comicUrlSegment
    )!;

    return comic;
  });
