#FROM python:latest
#WORKDIR /app
#
#COPY . /app
#
#ENV PYTHONUNBUFFERED=1
#
#RUN pip install --trusted-host pypi.python.org -r dependencies.txt
#
#RUN apt-get update && apt-get install -y wget unzip && \
#    wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
#    apt install -y ./google-chrome-stable_current_amd64.deb && \
#    rm google-chrome-stable_current_amd64.deb && \
#    apt-get clean
#
#RUN pip install --upgrade pip
#
#EXPOSE 8000
#
#CMD ["python", "manage.py", "runserver"]

ARG PORT=443
FROM cypress/browsers:latest
RUN apt-get install python3 -y
RUN echo $(python3 -m site --user-base)
COPY dependencies.txt .
ENV PATH /home/root/.local/bin:${PATH}
RUN apt-get update && apt-get install -y python3-pip && pip install -r dependencies.txt
COPY . .
CMD uvicorn main:app --host 0.0.0.0 --port $PORT
