## TransferMarket webscrapper 
A full-stack application that scrapes football transfer market data, giving football fans the chance to research over 850,000 players.

## How it works
I utilized Selenium and Pandas to scrape player profiles and retrieve player IDs. Once you have the player IDs, you can access all their other information, which is represented in tables. Pandas is particularly useful for scraping tables. Each request made to the backend utilizes the player ID to find the page and then scrape the information, which is then returned in JSON format.

## Installation
To run the frontend locally, clone the repo and use the package manager [npm](https://www.npmjs.com/) to run in development mode:
```bash
git clone https://github.com/EiadSS/TransferMarketScrap.git
cd TransferMarketScrap
cd frontend
npm install
npm run dev
```
on your browser go to http://localhost:5173/

for the backend 
```bash
cd TransferMarketScrap
cd backend
python manage.py runserver
```
**Base URL**: The base URL for all API requests is [http://127.0.0.1:8000/app/](http://127.0.0.1:8000/app/)

## DOCS
- **GET /profile/{player name}**: Retrieve player profile.

#### Example

Request:
http://127.0.0.1:8000/app/profile/marcus%20rashford
Response:
```json
{
  "picture": "https://img.a.transfermarkt.technology/portrait/header/258923-1674473054.jpg?lm=1",
  "Date of birth/Age": "Oct 31, 1997 (26)",
  "Place of birth": "Manchester",
  "Height": "1.85 m",
  "Citizenship": "England / St. Kitts & Nevis",
  "Position": "Attack - Left Winger",
  "Foot": "Right",
  "Player agent": "Relatives",
  "Current club": "Manchester United",
  "Joined": "Jan 1, 2016",
  "Contract expires": "Jun 30, 2028",
  "Last contract extension": "Jul 18, 2023",
  "Outfitter": "Nike",
  "Social Media": "",
  "id": "258923"
}
```
- **GET /stats/{playerName}/{playerId}**: Retrieve player stats.

#### Example

Request:
http://127.0.0.1:8000/app/stats/marcus%20rashford/258923
Response:
```json
{
"header": [],
"body": []
}
```
The stats for marcus rashford are too long to fit on this file

- **GET /injuries/{playerName}/{playerId}**: Retrieve player injuries.

#### Example

Request:
http://127.0.0.1:8000/app/injuries/marcus%20rashford/258923
Response:
```json
{
"header": [
"Season",
"Injury",
"From",
"Until",
"Days",
"Games Missed"
],
"body": [
[
"23/24",
"Ill",
"Dec 11, 2023",
"Dec 13, 2023",
"2 days",
1
],
[
"22/23",
"Leg injury",
"May 11, 2023",
"May 24, 2023",
"13 days",
2
],
[
"22/23",
"Muscle injury",
"Apr 8, 2023",
"Apr 19, 2023",
"11 days",
3
],
[
"22/23",
"unknown injury",
"Mar 19, 2023",
"Mar 31, 2023",
"12 days",
3
],
[
"22/23",
"Muscle injury",
"Sep 4, 2022",
"Sep 19, 2022",
"15 days",
3
],
[
"21/22",
"bronchitis",
"May 4, 2022",
"May 19, 2022",
"15 days",
1
],
[
"21/22",
"Dead leg",
"Jan 13, 2022",
"Jan 17, 2022",
"4 days",
1
],
[
"21/22",
"Shoulder injury",
"Jul 14, 2021",
"Oct 15, 2021",
"93 days",
15
],
[
"20/21",
"Shoulder injury",
"Nov 8, 2020",
"Nov 20, 2020",
"12 days",
3
],
[
"19/20",
"Back injury",
"Jan 16, 2020",
"Jun 5, 2020",
"141 days",
13
],
[
"19/20",
"Hip injury",
"Sep 22, 2019",
"Sep 30, 2019",
"8 days",
3
],
[
"18/19",
"Ankle injury",
"Mar 18, 2019",
"Mar 26, 2019",
"8 days",
2
]
]
}
```
The same idea applied for other endpoints such as value, and transfers.
