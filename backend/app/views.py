from telnetlib import EC

import requests
from bs4 import BeautifulSoup
from django.http import HttpResponse, JsonResponse
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
}

service = Service(
    executable_path="C:\Program Files\ChromeDriver\chromedriver-win64\chromedriver.exe")

options = webdriver.ChromeOptions()
options.add_argument('--ignore-certificate-errors')
options.add_argument('--ignore-ssl-errors')
driver = webdriver.Chrome(options=options, service=service)

id = 0


def index(request, name):
    return HttpResponse("Hello, world. You're at the polls index.")


def profile(request, name: str):
    name = name.split(" ")
    firstName, lastName = name[0], name[1]
    findId(firstName, lastName)
    url = f"https://www.transfermarkt.com/{firstName}-{lastName}/profil/spieler/{id}"

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
            key = line.strip().replace('\xa0', "")
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

    return JsonResponse(info)


def injuries(request, name: str):
    name = name.split(" ")

    table = [["Season", "Injury", "From", "until", "Days", "Games missed"]]

    driver.get(
        f'https://www.transfermarkt.us/{name[0]}-{name[1]}/verletzungen/spieler/{id}/plus/1')

    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH,
                                        '//*[@id="yw1"]/table/tbody'))
    )

    rows = driver.find_element(By.XPATH,
                               '//*[@id="yw1"]/table/tbody').find_elements(
        By.TAG_NAME, 'tr')

    for row in rows:
        temp = []
        for r in row.find_elements(By.TAG_NAME, 'td'):
            temp.append(r.get_attribute("textContent"))
        if temp:
            table.append(temp)

    result = {"result": table}

    return JsonResponse(result)


def stats(request, name: str):
    name = name.split(" ")

    driver.get(
        f"https://www.transfermarkt.us/{name[0]}-{name[1]}/leistungsdatendetails/spieler/{id}/saison//verein/0/liga/0/wettbewerb//pos/0/trainer_id/0")

    table = {"header": ["Season", "Competition", "Club", "Appearances", "Goals",
                        "Assists", "Y-YR-R", "Minutes"]}

    body = []

    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH,
                                        '//*[@id="yw1"]/table/tbody'))
    )

    rows = driver.find_element(By.XPATH,
                               '//*[@id="yw1"]/table/tbody').find_elements(
        By.TAG_NAME, 'tr')

    for row in rows:
        i = 0
        temp = []
        for r in row.find_elements(By.TAG_NAME, 'td'):
            if i == 3:
                temp.append(
                    r.find_element(By.TAG_NAME, 'a').get_attribute("title"))

            elif i == 7:
                temp.append(r.get_attribute("textContent").replace('\xa0', ""))

            elif i != 1:
                temp.append(r.get_attribute("textContent"))
            i += 1
        if temp:
            body.append(temp)

    table["body"] = body

    return JsonResponse(table)


def value(request, name: str):
    name = name.split(" ")

    value = {"result": requests.get(
        f"https://transfermarkt-api.vercel.app/players/{id}/market_value").json()[
        'marketValueHistory']}

    return JsonResponse(value)


def transfers(request, name: str):
    name = name.split(" ")

    driver.get(
        f"https://www.transfermarkt.com/{name[0]}-{name[1]}/transfers/spieler/{id}")

    table = []

    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH,
                                        '//*[@id="main"]/main/div[2]/div[1]/tm-transfer-history/div'))
    )

    rows = driver.find_element(By.XPATH,
                               '//*[@id="main"]/main/div[2]/div[1]/tm-transfer-history/div').find_elements(
        By.TAG_NAME, 'div')

    for row in rows:
        temp = []
        for r in row.find_elements(By.TAG_NAME, 'div'):
            temp.append(r.get_attribute("textContent"))
        if temp:
            table.append(temp)

    print(table)

    result = {"result": table}

    return JsonResponse(result)


def findId(firstName, lastName):
    driver.get(
        f"https://www.transfermarkt.us/schnellsuche/ergebnis/schnellsuche?query={firstName}+{lastName}")

    element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH,
                                        '//*[@id="yw0"]/table/tbody/tr/td[1]/table/tbody/tr[1]/td[2]/a'))
    )

    global id
    id = element.get_attribute("href").split('/')[-1]
