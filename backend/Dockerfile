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

# Install Python3 and pip
RUN apt-get update && apt-get install -y python3 python3-pip

# Display Python user base directory
RUN echo $(python3 -m site --user-base)

# Set the PATH environment variable to include the user base directory
ENV PATH /root/.local/bin:${PATH}

# Copy dependencies file
COPY dependencies.txt .

# Install Python dependencies
RUN pip3 install --user -r dependencies.txt

# Copy the application code
COPY . .

# Run the application using uvicorn
CMD python manage.py runserver 0.0.0.0:$PORT


