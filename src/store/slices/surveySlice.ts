import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SurveyState {
  surveys: Survey[];
  currentSurvey: Survey | null;
}

export interface Survey {
  id: string;
  title: string;
  questions: Question[];
  expirationDate?: string;
}

export interface Question {
  id: string;
  type: 'multiple_choice' | 'text' | 'rating';
  text: string;
  options?: string[];
}

const mockSurveys: Survey[] = [
  {
    id: '1',
    title: 'Customer Satisfaction Survey',
    questions: [
      {
        id: '1-1',
        type: 'rating',
        text: 'How satisfied are you with our product?'
      },
      {
        id: '1-2',
        type: 'text',
        text: 'What improvements would you suggest for our product?'
      },
      {
        id: '1-3',
        type: 'multiple_choice',
        text: 'How likely are you to recommend our product to others?',
        options: ['Very likely', 'Somewhat likely', 'Neutral', 'Unlikely', 'Very unlikely']
      }
    ],
    expirationDate: '2023-12-31'
  },
  // ... (other mock surveys)
];

const initialState: SurveyState = {
  surveys: mockSurveys,
  currentSurvey: null,
};

const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    setSurveys: (state, action: PayloadAction<Survey[]>) => {
      state.surveys = action.payload;
    },
    setCurrentSurvey: (state, action: PayloadAction<Survey>) => {
      state.currentSurvey = action.payload;
    },
    addSurvey: (state, action: PayloadAction<Survey>) => {
      state.surveys.push(action.payload);
    },
    updateSurvey: (state, action: PayloadAction<Survey>) => {
      const index = state.surveys.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.surveys[index] = action.payload;
      }
    },
    deleteSurvey: (state, action: PayloadAction<string>) => {
      state.surveys = state.surveys.filter(s => s.id !== action.payload);
    },
    setExpirationDate: (state, action: PayloadAction<{ id: string, date: string }>) => {
      const survey = state.surveys.find(s => s.id === action.payload.id);
      if (survey) {
        survey.expirationDate = action.payload.date;
      }
    },
  },
});

export const {
  setSurveys,
  setCurrentSurvey,
  addSurvey,
  updateSurvey,
  deleteSurvey,
  setExpirationDate,
} = surveySlice.actions;
export default surveySlice.reducer;