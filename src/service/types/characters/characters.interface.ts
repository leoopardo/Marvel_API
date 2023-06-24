export interface CharactersQuery {
  ts?: string;
  apikey?: string;
  hash?: string;
  name?: string;
  nameStartsWith?: string;
  modifiedSince?: string;
  comics?: number;
  series?: number;
  events?: number;
  stories?: number;
  orderBy: "name" | "modified" | "-name" | "-modified";
  limit: number;
}

export interface CharactersResponse {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  resourceURI: string;
  comics: {
    available: number;
    collectionURI: string;
    items: {
      resourceURI: string;
      name: string;
    }[];

    returned: number;
  };
  series: {
    available: number;
    collectionURI: string;
    items: {
      resourceURI: string;
      name: string;
    }[];

    returned: number;
  };
  stories: {
    available: number;
    collectionURI: string;
    items: {
      resourceURI: string;
      name: string;
      type: string;
    }[];

    returned: number;
  };
  events: {
    available: number;
    collectionURI: string;
    items: {
      resourceURI: string;
      name: string;
    }[];

    returned: number;
  };
  urls: {
    type: string;
    url: string;
  }[];
}

export interface CharactersData {
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: CharactersResponse[];
  };
}
