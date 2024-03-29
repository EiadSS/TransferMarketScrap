import json
from io import StringIO
from telnetlib import EC

import pandas as pd
import requests
from bs4 import BeautifulSoup
from django.http import HttpResponse, JsonResponse
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
}

options = webdriver.ChromeOptions()
options.add_argument("--headless=new")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
agent = headers['User-Agent']
options.add_argument(f'user-agent={agent}')
driver = webdriver.Chrome(options=options, service=Service(ChromeDriverManager().install()))


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


def profile(request, name: str) -> JsonResponse:
    playerId = findId(name)
    url = f"https://www.transfermarkt.com/{name}/profil/spieler/{playerId}"

    page = requests.get(url, headers=headers)
    soup = BeautifulSoup(page.text, "html.parser")

    frame = soup.find('div', {"class": "modal-trigger"})
    frame = frame.find("img")["src"]

    table = soup.find('div', {
        "class": "info-table info-table--right-space min-height-audio"})

    if table is None:
        table = soup.find('div', {
            "class": "info-table info-table--right-space"})

    info = {"picture": frame}
    j = 0
    prev = ""
    for line in table.text.split('\n'):
        if line.strip():
            key = line.strip()
            key = key.replace(":", "")
            if j % 2 == 0:
                info[key] = ""
                prev = key
            else:
                if prev == "Citizenship":
                    info[prev] = key
                else:
                    info[prev] = key
            j += 1
    info["id"] = playerId
    return JsonResponse(info)


def injuries(request, name: str, playerId: str):
    url = f"https://www.transfermarkt.com/{name}/verletzungen/spieler/{playerId}/plus/1"
    response = requests.get(url, headers=headers)

    # Read only the specific table of interest (index 1)

    table = pd.read_html(StringIO(response.text))

    result = {"header": ["Season", "Injury", "From", "Until", "Days", "Games Missed"], "body": table[0].values.tolist()}

    return JsonResponse(result)


def stats(request, name: str, playerId: str):
    grid = {"header": ["Season", "Competition", "Appearances", "Goals",
                        "Assists", "Y-YR-R", "Minutes"]}

    url = f"https://www.transfermarkt.com/{name}/leistungsdatendetails/spieler/{playerId}/saison//verein/0/liga/0/wettbewerb//pos/0/trainer_id/0"
    response = requests.get(url, headers=headers)

    # Read only the specific table of interest (index 1)
    table = pd.read_html(StringIO(response.text))[1]

    result = []

    # Loop through each row of the table
    for index, row in table.iterrows():
        temp1 = row.values
        result.append(
            [temp1[0], temp1[2], temp1[4], temp1[5], temp1[6], temp1[7], temp1[8]])

    result.pop()

    grid["body"] = result

    return JsonResponse(grid)


def value(request, name: str, playerId: str):
    price = {"result": requests.get(
        f"https://transfermarkt-api.vercel.app/players/{playerId}/market_value").json()[
        'marketValueHistory']}

    return JsonResponse(price)


def transfers(request, name: str, playerId: str):
    driver.get(
        f"https://www.transfermarkt.us/{name}/transfers/spieler/{playerId}")

    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH,
                                        '//*[@id="main"]/main/div[2]/div[1]/tm-transfer-history/div/div[2]'))
    )
    response = driver.find_element(By.XPATH,
                                   '//*[@id="main"]/main/div[2]/div[1]/tm-transfer-history/div')

    soup = BeautifulSoup(response.get_attribute("outerHTML"), "html.parser")
    table = soup.find_all('div',
                          {"class": "grid tm-player-transfer-history-grid"})
    result = []
    for t in table:
        temp = []
        for i in t.find_all('div'):
            temp.append(i.text)
        result.append(temp)

    grid = {"header": ["Season", "Date", "From", "To", "Market Value", "Fee"], "body": result}

    return JsonResponse(grid)


def findId(name):
    driver.get(
        f"https://www.transfermarkt.us/schnellsuche/ergebnis/schnellsuche?query={name}")

    element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH,
                                        '//*[@id="yw0"]/table/tbody/tr/td[1]/table/tbody/tr[1]/td[2]/a'))
    )

    tag = element.get_attribute("href").split('/')[-1]
    return tag


