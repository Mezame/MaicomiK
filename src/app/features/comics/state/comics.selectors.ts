import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Comic } from '../comic';

export const selectComics = createFeatureSelector<readonly Comic[]>('comics');

export const selectComic = (comicUrlSegment: string) =>
  createSelector(selectComics, (comics) =>
    comics.find((comic) => comic.metadata.urlSegment == comicUrlSegment)!
  );
