export interface Mission {

  // Fields match lab instuctions and API response

  flight_number: number;
  mission_name: string;
  launch_year: string;
  details: string | null;
  rocket_name: string;
  rocket_type: string;
  mission_patch_small: string | null;
  article_link: string | null;
  wikipedia: string | null;
  video_link: string | null;
}
