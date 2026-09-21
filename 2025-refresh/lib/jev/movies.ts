export type JevMovie = {
  id: string;
  title: string;
  year: number;
  poster: string;
  tags: string[];
};

export const jevMovies: JevMovie[] = [
  { id: "inception", title: "Inception", year: 2010, poster: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg", tags: ["mind-bending", "sci-fi", "dreams", "thriller"] },
  { id: "interstellar", title: "Interstellar", year: 2014, poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", tags: ["mind-bending", "sci-fi", "space", "time"] },
  { id: "matrix", title: "The Matrix", year: 1999, poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg", tags: ["mind-bending", "sci-fi", "simulation", "action"] },
  { id: "arrival", title: "Arrival", year: 2016, poster: "https://image.tmdb.org/t/p/w500/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg", tags: ["mind-bending", "sci-fi", "aliens", "time"] },
  { id: "eternal-sunshine", title: "Eternal Sunshine of the Spotless Mind", year: 2004, poster: "https://image.tmdb.org/t/p/w500/5MwkWH9tYHv3mV9OdYTMR5qreIz.jpg", tags: ["mind-bending", "romance", "memory", "sci-fi"] },
  { id: "primer", title: "Primer", year: 2004, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/xEoq2WmDzpzxhkHEsmOYOg6BPg6.jpg", tags: ["mind-bending", "sci-fi", "time", "indie"] },
  { id: "moon", title: "Moon", year: 2009, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/35IU0Mq0zFsN1mYwDGts5mKc77n.jpg", tags: ["sci-fi", "space", "isolation", "thriller"] },
  { id: "blade-runner", title: "Blade Runner 2049", year: 2017, poster: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg", tags: ["sci-fi", "future", "neo-noir", "thriller"] },
  { id: "ex-machina", title: "Ex Machina", year: 2014, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/dmJW8IAKHKxFNiUnoDR7JfsK7Rp.jpg", tags: ["sci-fi", "ai", "thriller", "mind-bending"] },
  { id: "coherence", title: "Coherence", year: 2013, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/ezUtb9m5DeLwL2gxi4gktzNCvQv.jpg", tags: ["mind-bending", "sci-fi", "parallel-worlds", "thriller"] },
  { id: "memento", title: "Memento", year: 2000, poster: "https://image.tmdb.org/t/p/w500/yuNs09hvpHVU1cBTCAk9zxsL2oW.jpg", tags: ["mind-bending", "memory", "thriller", "mystery"] },
  { id: "parasite", title: "Parasite", year: 2019, poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", tags: ["drama", "thriller", "satire"] },
  { id: "whiplash", title: "Whiplash", year: 2014, poster: "https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg", tags: ["drama", "music", "intense"] },
  { id: "spirited-away", title: "Spirited Away", year: 2001, poster: "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg", tags: ["animation", "fantasy", "coming-of-age"] },
  { id: "dark-knight", title: "The Dark Knight", year: 2008, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/qJ2tW6WMUDux911r6m7haRef0WH.jpg", tags: ["action", "crime", "thriller"] },
  { id: "godfather", title: "The Godfather", year: 1972, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/3bhkrj58Vtu7enYsRolD1fZdja1.jpg", tags: ["crime", "drama", "mafia"] },
  { id: "pulp-fiction", title: "Pulp Fiction", year: 1994, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg", tags: ["crime", "thriller", "dark-comedy"] },
  { id: "shawshank", title: "The Shawshank Redemption", year: 1994, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg", tags: ["drama", "prison", "friendship"] },
  { id: "fight-club", title: "Fight Club", year: 1999, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/jSziioSwPVrOy9Yow3XhWIBDjq1.jpg", tags: ["drama", "thriller", "identity"] },
  { id: "forrest-gump", title: "Forrest Gump", year: 1994, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/Cw4hIUIAmSYfK9QfaUW5igp9La.jpg", tags: ["drama", "romance", "feelgood"] },
  { id: "fellowship", title: "The Fellowship of the Ring", year: 2001, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg", tags: ["fantasy", "adventure", "epic"] },
  { id: "two-towers", title: "The Two Towers", year: 2002, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/5VTN0pR8gcqV3EPUHHfMGnJYN9L.jpg", tags: ["fantasy", "adventure", "epic"] },
  { id: "return-king", title: "The Return of the King", year: 2003, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg", tags: ["fantasy", "adventure", "epic"] },
  { id: "goodfellas", title: "GoodFellas", year: 1990, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/9OkCLM73MIU2CrKZbqiT8Ln1wY2.jpg", tags: ["crime", "drama", "mafia"] },
  { id: "schindlers-list", title: "Schindler's List", year: 1993, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg", tags: ["drama", "history", "war"] },
  { id: "se7en", title: "Se7en", year: 1995, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/191nKfP0ehp3uIvWqgPbFmI4lv9.jpg", tags: ["crime", "thriller", "mystery"] },
  { id: "psycho", title: "Psycho", year: 1960, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/yz4QVqPx3h1hD1DfqqQkCq3rmxW.jpg", tags: ["horror", "thriller", "mystery"] },
  { id: "gladiator", title: "Gladiator", year: 2000, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/wN2xWp1eIwCKOD0BHTcErTBv1Uq.jpg", tags: ["action", "drama", "history"] },
  { id: "star-wars", title: "Star Wars", year: 1977, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/fai0rspsNeJCS69wHNjOdWxcI7P.jpg", tags: ["sci-fi", "adventure", "space"] },
  { id: "empire-strikes-back", title: "The Empire Strikes Back", year: 1980, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/nNAeTmF4CtdSgMDplXTDPOpYzsX.jpg", tags: ["sci-fi", "adventure", "space"] },
  { id: "return-jedi", title: "Return of the Jedi", year: 1983, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/jQYlydvHm3kUix1f8prMucrplhm.jpg", tags: ["sci-fi", "adventure", "space"] },
  { id: "raiders", title: "Raiders of the Lost Ark", year: 1981, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/ceG9VzoRAVGwivFU403Wc3AHRys.jpg", tags: ["action", "adventure", "history"] },
  { id: "saving-private-ryan", title: "Saving Private Ryan", year: 1998, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/uqx37cS8cpHg8U35f9U5IBlrCV3.jpg", tags: ["drama", "war", "history"] },
  { id: "toy-story", title: "Toy Story", year: 1995, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg", tags: ["animation", "comedy", "adventure"] },
  { id: "cars", title: "Cars", year: 2006, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/2Touk3m5gzsqr1VsvxypdyHY5ci.jpg", tags: ["animation", "comedy", "adventure"] },
  { id: "up", title: "Up", year: 2009, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/mFvoEwSfLqbcWwFsDjQebn9bzFe.jpg", tags: ["animation", "comedy", "adventure"] },
  { id: "coco", title: "Coco", year: 2017, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/6Ryitt95xrO8KXuqRGm1fUuNwqF.jpg", tags: ["animation", "music", "family"] },
  { id: "lion-king", title: "The Lion King", year: 1994, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg", tags: ["animation", "drama", "family"] },
  { id: "totoro", title: "My Neighbor Totoro", year: 1988, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/rtGDOeG9LzoerkDGZF9dnVeLppL.jpg", tags: ["animation", "fantasy", "family"] },
  { id: "princess-mononoke", title: "Princess Mononoke", year: 1997, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/cMYCDADoLKLbB83g4WnJegaZimC.jpg", tags: ["animation", "fantasy", "adventure"] },
  { id: "howls-moving-castle", title: "Howl's Moving Castle", year: 2004, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/13kOl2v0nD2OLbVSHnHk8GUFEhO.jpg", tags: ["animation", "fantasy", "romance"] },
  { id: "grave-fireflies", title: "Grave of the Fireflies", year: 1988, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/k9tv1rXZbOhH7eiCk378x61kNQ1.jpg", tags: ["animation", "drama", "war"] },
  { id: "alien", title: "Alien", year: 1979, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg", tags: ["sci-fi", "horror", "space"] },
  { id: "aliens", title: "Aliens", year: 1986, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/r1x5JGpyqZU8PYhbs4UcrO1Xb6x.jpg", tags: ["sci-fi", "action", "space"] },
  { id: "terminator", title: "The Terminator", year: 1984, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/qvktm0BHcnmDpul4Hz01GIazWPr.jpg", tags: ["sci-fi", "action", "time"] },
  { id: "terminator-2", title: "Terminator 2: Judgment Day", year: 1991, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/jFTVD4XoWQTcg7wdyJKa8PEds5q.jpg", tags: ["sci-fi", "action", "time"] },
  { id: "back-future", title: "Back to the Future", year: 1985, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/vN5B5WgYscRGcQpVhHl6p9DDTP0.jpg", tags: ["sci-fi", "comedy", "time"] },
  { id: "jurassic-park", title: "Jurassic Park", year: 1993, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/d9mtMGQDLANKieb9PbD3yK7xxzo.jpg", tags: ["sci-fi", "adventure", "thriller"] },
  { id: "jaws", title: "Jaws", year: 1975, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/lxM6kqilAdpdhqUl2biYp5frUxE.jpg", tags: ["horror", "thriller", "adventure"] },
  { id: "thing", title: "The Thing", year: 1982, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/tzGY49kseSE9QAKk47uuDGwnSCu.jpg", tags: ["sci-fi", "horror", "thriller"] },
  { id: "heat", title: "Heat", year: 1995, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/umSVjVdbVwtx5ryCA2QXL44Durm.jpg", tags: ["crime", "drama", "action"] },
  { id: "departed", title: "The Departed", year: 2006, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/nT97ifVT2J1yMQmeq20Qblg61T.jpg", tags: ["crime", "drama", "thriller"] },
  { id: "prestige", title: "The Prestige", year: 2006, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/Ag2B2KHKQPukjH7WutmgnnSNurZ.jpg", tags: ["mystery", "drama", "thriller"] },
  { id: "django", title: "Django Unchained", year: 2012, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/7oWY8VDWW7thTzWh3OKYRkWUlD5.jpg", tags: ["drama", "western", "revenge"] },
  { id: "inglourious-basterds", title: "Inglourious Basterds", year: 2009, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/aupnPtagH9JVBuMrGEanf4iqXEQ.jpg", tags: ["drama", "war", "thriller"] },
  { id: "lala-land", title: "La La Land", year: 2016, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg", tags: ["romance", "music", "drama"] },
  { id: "amelie", title: "Amelie", year: 2001, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/nSxDa3M9aMvGVLoItzWTepQ5h5d.jpg", tags: ["romance", "comedy", "feelgood"] },
  { id: "truman-show", title: "The Truman Show", year: 1998, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/vuza0WqY239yBXOadKlGwJsZJFE.jpg", tags: ["drama", "comedy", "satire"] },
  { id: "cinema-paradiso", title: "Cinema Paradiso", year: 1988, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/9JhfVOveaY00o8njQu2Xrp4YWud.jpg", tags: ["drama", "romance", "nostalgia"] },
  { id: "city-of-god", title: "City of God", year: 2002, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/k7eYdWvhYQyRQoU2TB2A2Xu2TfD.jpg", tags: ["crime", "drama", "coming-of-age"] },
  { id: "oldboy", title: "Oldboy", year: 2003, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/pWDtjs568ZfOTMbURQBYuT4Qxka.jpg", tags: ["thriller", "mystery", "revenge"] },
  { id: "handmaiden", title: "The Handmaiden", year: 2016, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/dLlH4aNHdnmf62umnInL8xPlPzw.jpg", tags: ["thriller", "romance", "mystery"] },
  { id: "portrait-lady-fire", title: "Portrait of a Lady on Fire", year: 2019, poster: "https://media.themoviedb.org/t/p/w300_and_h450_face/2LquGwEhbg3soxSCs9VNyh5VJd9.jpg", tags: ["romance", "drama", "period"] },
  { id: "godfather-2", title: "The Godfather Part II", year: 1974, poster: "https://image.tmdb.org/t/p/w500/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg", tags: ["crime", "drama", "mafia"] },
  { id: "green-mile", title: "The Green Mile", year: 1999, poster: "https://image.tmdb.org/t/p/w500/velWPhVMQeQKcxggNEU8YmIo52R.jpg", tags: ["drama", "fantasy", "prison"] },
];

export const jevMovieById = new Map(jevMovies.map((movie) => [movie.id, movie]));

export const jevCatalogState = jevMovies
  .map((movie) => `${movie.id}| ${movie.title} (${movie.year}). ${movie.tags.join(", ")}.`)
  .join("\n");
