import { createSlice } from "@reduxjs/toolkit"

let id = 1
const getNextId = () => id++

const slice = createSlice({
  name: 'quote_state',
  initialState: {
    displayAllQuotes: true,
    highlightedQuote: null,
    quotes: [
      {
        id: getNextId(),
        quoteText: "Don't cry because it's over, smile because it happened.",
        authorName: "Dr. Seuss",
        apocryphal: false,
      },
      {
        id: getNextId(),
        quoteText: "So many books, so little time.",
        authorName: "Frank Zappa",
        apocryphal: false,
      },
      {
        id: getNextId(),
        quoteText: "Be yourself; everyone else is already taken.",
        authorName: "Oscar Wilde",
        apocryphal: false,
      },
    ],
  },
  reducers: {
    toggleVisibility(state) {
      state.displayAllQuotes = !state.displayAllQuotes
    },
    deleteQuote(state, action) {
      state.quotes = state.quotes
        .filter(qt => qt.id !== action.payload)
    },
    editQuoteAuthenticity(state, action) {
      const qt = state.quotes
        .find(qt => qt.id === action.payload)
      qt.apocryphal = !qt.apocryphal
    },
    setHighlightedQuote(state, action) {
      state.highlightedQuote = state.highlightedQuote === action.payload
        ? null
        : action.payload
    },
    createQuote: {
      prepare(authorName, quoteText) {
        const newQuote = {
          authorName,
          quoteText,
          apocryphal: false,
          id: getNextId()
        }
        return { payload: newQuote }
      },
      reducer(state, action) {
        state.quotes.push(action.payload)
      }
    }
  }
})

export default slice.reducer

export const {
  toggleVisibility,
  deleteQuote,
  editQuoteAuthenticity,
  setHighlightedQuote,
  createQuote
} = slice.actions