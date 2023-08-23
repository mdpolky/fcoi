import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserState {
  displayName: String;
  email: String;
  accessToken: String;
}

const initialState: UserState = {
  displayName: "default user",
  email: "default@gmail.com",
  accessToken: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setYahooUser: (state, action: PayloadAction<UserState>) => {
      return action.payload;
    },
  },
});

export const { setYahooUser } = userSlice.actions;

export default userSlice.reducer;
