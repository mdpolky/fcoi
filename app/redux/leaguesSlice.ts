import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface LeagueState {
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

export interface LeaguesState extends Array<LeagueState> {}

const initialState: LeaguesState = [];

export const leaguesSlice = createSlice({
  name: "leagues",
  initialState,
  reducers: {
    setYahooLeagues: (state, action: PayloadAction<LeaguesState>) => {
      return action.payload;
    },
  },
});

export const { setYahooLeagues } = leaguesSlice.actions;

export default leaguesSlice.reducer;
