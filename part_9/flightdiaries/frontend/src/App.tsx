import { useState, useEffect } from 'react';
import { type DiaryEntry, type Weather, type Visibility, Weather as WeatherEnum, Visibility as VisibilityEnum } from './types';
import axios from 'axios';
import diaryService from './diaryService';

const weatherOptions = Object.values(WeatherEnum);
const visibilityOptions = Object.values(VisibilityEnum);

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>('' as Visibility);
  const [weather, setWeather] = useState<Weather>('' as Weather);
  const [comment, setComment] = useState('');

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    diaryService.getAllDiaries().then(data => {
      setDiaries(data);
    });
  }, []);

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const diaryToAdd = { date, visibility, weather, comment };

    diaryService.createDiary(diaryToAdd)
      .then(returnedDiary => {
        setDiaries(diaries.concat(returnedDiary));

        setDate('');
        setVisibility('' as Visibility);
        setWeather('' as Weather);
        setComment('');
        setErrorMessage(null);
      })
      .catch(error => {
        if (axios.isAxiosError(error)) {
          const serverData = error.response?.data;

          if (serverData && typeof serverData === 'object' && 'error' in serverData && Array.isArray(serverData.error)) {

            const messages = serverData.error.map((issue: unknown) => {
              if (issue && typeof issue === 'object' && 'message' in issue) {
                return String(issue.message);
              }
              return "Invalid field";
            });

            setErrorMessage(messages.join(' '));
          }

          else if (serverData && typeof serverData === 'object' && 'error' in serverData) {
            setErrorMessage(String(serverData.error));
          } else if (typeof serverData === 'string') {
            setErrorMessage(serverData);
          } else {
            setErrorMessage(error.message || "Unknown error occurred");
          }
        } else {
          setErrorMessage("An unexpected error occurred");
        }

        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  }

  return (
    <div>
      <h2>Add new entry</h2>

      {errorMessage && (
        <div style={{ color: 'red', marginBottom: '15px', fontWeight: 'bold' }}>
          {errorMessage}
        </div>
      )}

      <form onSubmit={diaryCreation}>
        <div>
          date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div style={{ margin: '10px 0' }}>
          <span>visibility: </span>
          {visibilityOptions.map(option => (
            <label key={option} style={{ marginRight: '10px' }}>
              <input
                type="radio"
                name="visibility"
                value={option}
                checked={visibility === option}
                onChange={(e) => setVisibility(e.target.value as Visibility)}
              />
              {option}
            </label>
          ))}
        </div>

        <div style={{ margin: '10px 0' }}>
          <span>weather: </span>
          {weatherOptions.map(option => (
            <label key={option} style={{ marginRight: '10px' }}>
              <input
                type="radio"
                name="weather"
                value={option}
                checked={weather === option}
                onChange={(e) => setWeather(e.target.value as Weather)}
              />
              {option}
            </label>
          ))}
        </div>

        <div>
          comment
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>

      <h2>Diary entries</h2>
      {diaries.map(diary => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>
            visibility: {diary.visibility} <br />
            weather: {diary.weather}
          </p>
          {diary.comment && <p>comment: {diary.comment}</p>}
        </div>
      ))}
    </div>
  );
};

export default App;
