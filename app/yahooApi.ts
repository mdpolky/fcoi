import { BASE_URL } from "@env";

const base_url = BASE_URL;

/*
interface league {
  league_key: String;
  league_id: String;
  name: String;
  url: String;
  logo_url: String;
  password: String;
  draft_status: String;
  num_teams: Number;
  edit_key: String;
  weekly_deadline: String;
  league_update_timestamp: String;
  scoring_type: String;
  league_type: String;
  renew: String;
  renewed: String;
  felo_tier: String;
  iris_group_chat_id: String;
  short_invitation_url: String;
  allow_add_to_dl_extra_pos: Number;
  is_pro_league: String;
  is_cash_league: String;
  current_week: Number;
  start_week: String;
  start_date: String;
  end_week: String;
  end_date: String;
  is_finished: Number;
  is_plus_league: String;
  game_code: String;
  season: String;
} 
*/

export async function getLeagues(accessToken: String) {
  console.log(accessToken);
  try {
    const reqOptions = {
      method: "Get",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    };
    const response = await fetch(base_url + "/leagues", reqOptions);
    const json = await response.json();
    console.log(json);
    /*
    console.log(
      json.fantasy_content.users[0].user[1].games[0].game[1].leagues[0]
        .league[0]
    );
    */
    return json;
  } catch (err) {
    console.error(err);
  }
}

export async function getLeagueByKey(league_key: String) {
  try {
    const response = await fetch(base_url + "/league/" + league_key);
    const json = await response.json();
    return json;
  } catch (err) {
    console.error(err);
  }
}
