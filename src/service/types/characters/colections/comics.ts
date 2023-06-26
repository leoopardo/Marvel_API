export interface ComicsResponse {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: 1;
  variantDescription: string;
  description: string;
  modified: string;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: number;
  textObjects: {
    type: string;
    language: string;
    text: string;
  }[];
  resourceURI: string;
  urls: {
    type: string;
    url: string;
  }[];

  series: {
    resourceURI: string;
    name: string;
  };
  variants: [];
  collections: [];
  collectedIssues: [];
  dates: {
    type: string;
    date: string;
  }[];

  prices: {
    type: string;
    price: number;
  }[];

  thumbnail: {
    path: string;
    extension: string;
  };
  images: {
    path: string;
    extension: string;
  }[];
  creators: {
    available: number;
    collectionURI: string;
    items: {
      resourceURI: string;
      name: string;
      role: string;
    }[];
    returned: number;
  };
  characters: {
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
    items: [];
    returned: number;
  };
}

export interface ComicsData {
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: ComicsResponse[];
  };
}
