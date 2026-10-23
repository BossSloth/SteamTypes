export interface AppRatingAuxData {
  descriptor_images?: RatingDescriptorImage[];

  descriptors?: string[];

  esrb_online_interactions_not_rated?: boolean;

  esrb_online_music_not_rated?: boolean;

  interactive_elements?: string[];

  official_id?: string;
}

export interface AppRating {
  aux_data?: AppRatingAuxData;

  banned?: boolean;

  rating?: string;

  rating_agency?: RatingAgency;

  required_age?: number;

  source?: AppRatingSource;

  use_age_gate?: boolean;
}

export enum RatingAgency {
  Invalid = 0,
  ESRB = 1,
  PEGI = 2,
  BBFC = 3,
  USK = 4,
  OFLC_AU = 5,
  OFLC_NZ = 6,
  CERO = 7,
  GRAC = 8,
  GMEDIA = 9,
  DEJUS = 10,
  IMDA = 11,
  FPB = 12,
  TESRI = 13,
  RARS = 14,
  AGCOM = 15,
  IGRS = 16,
  Steam_Germany = 17,
  Steam_Australia = 18,
  CADPA = 19,
}

export enum AppRatingSource {
  Invalid = 0,
  Official = 1,
  Generated = 2,
}

export enum RatingDescriptorImage {
  Invalid = 0,
  CERO_Love = 1,
  CERO_SexualContent = 2,
  CERO_Violence = 3,
  CERO_Horror = 4,
  CERO_DrinkingSmoking = 5,
  CERO_Gambling = 6,
  CERO_Crime = 7,
  CERO_Drugs = 8,
  CERO_Language = 9,
}
