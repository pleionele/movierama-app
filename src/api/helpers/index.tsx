export const replaceMovieId = (url: string, id: string) => {
  return url.replace('{movie_id}', id);
};
