export interface KeywordGroup {
  id: string;
  title: string;
  category: 'general' | 'celebrity' | 'movie';
  keywords: string[];
  tag?: string;
}

export const GENERAL_KEYWORDS: string[] = [
  'movie domain names for sale',
  'buy movie domain',
  'film domain names for sale',
  'cinema domain names for sale',
  'actor domain names for sale',
  'actress domain names for sale',
  'celebrity domain names for sale',
  'director domain names for sale',
  'hollywood domain names for sale',
  'bollywood domain names for sale',
  'netflix domain names for sale',
  'movie streaming domain names for sale',
  'movie review domain names for sale',
  'movie news domain names for sale',
  'movie blog domain names for sale',
  'watch movies online',
  'watch movies online free',
  'watch movies online free no sign up',
  'full movie online',
  'full movie download',
  'movie download sites',
  'best movie streaming sites',
  'movie domain name generator',
  'movie domain name ideas',
  'movie website domain names',
  'film production domain names',
  'movie production domain names',
  'indie film domain names',
  'documentary domain names',
  'animation domain names',
  'anime domain names',
  'cartoon domain names',
  'comedy movie domain names',
  'action movie domain names',
  'horror movie domain names',
  'thriller movie domain names',
  'romance movie domain names',
  'sci fi movie domain names',
  'fantasy movie domain names',
  'drama movie domain names',
  'adventure movie domain names',
  'crime movie domain names',
  'mystery movie domain names',
  'war movie domain names',
  'western movie domain names',
  'musical movie domain names',
  'family movie domain names',
  'kids movie domain names',
  'christmas movie domain names',
  'halloween movie domain names',
];

export const CELEBRITY_NAMES: string[] = [
  'Tom Cruise',
  'Dwayne Johnson',
  'Leonardo DiCaprio',
  'Brad Pitt',
  'Johnny Depp',
  'Robert Downey Jr',
  'Chris Hemsworth',
  'Chris Evans',
  'Scarlett Johansson',
  'Jennifer Lawrence',
  'Emma Watson',
  'Tom Hanks',
  'Will Smith',
  'Denzel Washington',
  'Morgan Freeman',
  'Keanu Reeves',
  'Ryan Reynolds',
  'Ryan Gosling',
  'Hugh Jackman',
  'Christian Bale',
];

export const MOVIE_TITLES: string[] = [
  'The Godfather',
  'The Dark Knight',
  'Inception',
  'Interstellar',
  'Titanic',
  'Avatar',
  'Avengers Endgame',
  'Avengers Infinity War',
  'Iron Man',
  'Spider-Man',
  'Star Wars',
  'Harry Potter',
  'Lord of the Rings',
  'Jurassic Park',
  'The Matrix',
  'Gladiator',
  'Forrest Gump',
  'The Shawshank Redemption',
  'Pulp Fiction',
  'Fight Club',
];

export function getCelebrityKeywords(name: string): string[] {
  return [
    `${name} movies`,
    `${name} new movie`,
    `${name} best movies`,
    `${name} net worth`,
    `${name} age`,
    `${name} height`,
    `${name} wife`,
    `${name} girlfriend`,
    `${name} house`,
    `${name} domain name`,
    `${name} domain for sale`,
    `buy ${name} domain`,
  ];
}

export function getMovieKeywords(title: string): string[] {
  return [
    `${title} watch online`,
    `${title} watch online free`,
    `${title} full movie`,
    `${title} full movie online`,
    `${title} cast`,
    `${title} trailer`,
    `${title} review`,
    `${title} plot`,
    `${title} ending explained`,
    `${title} domain name`,
    `${title} domain for sale`,
    `buy ${title} domain`,
  ];
}

export const CELEBRITY_GROUPS: KeywordGroup[] = CELEBRITY_NAMES.map((name) => ({
  id: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
  title: name,
  category: 'celebrity',
  tag: 'Actor / Celebrity',
  keywords: getCelebrityKeywords(name),
}));

export const MOVIE_GROUPS: KeywordGroup[] = MOVIE_TITLES.map((title) => ({
  id: title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
  title: title,
  category: 'movie',
  tag: 'Iconic Film',
  keywords: getMovieKeywords(title),
}));

// The exact sequence in the original user prompt
export const ALL_RAW_KEYWORDS: string[] = [
  ...GENERAL_KEYWORDS,
  ...CELEBRITY_NAMES.flatMap((name) => getCelebrityKeywords(name)),
  ...MOVIE_TITLES.flatMap((title) => getMovieKeywords(title)),
];
