import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface LeagueState {
  league_key: String;
  league_id: Number;
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
  is_pro_league: Number;
  is_cash_league: Number;
  current_week: Number;
  start_week: Number;
  start_date: String;
  end_week: Number;
  end_date: String;
  is_finished: Number;
  is_plus_league: Number;
  game_code: String;
  season: Number;
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
