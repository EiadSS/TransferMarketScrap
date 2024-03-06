FROM python:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the entire current directory into the container's working directory
COPY . /app

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Install project dependencies
RUN pip install --no-cache-dir -r dependencies.txt

# Install Chrome and other necessary packages
RUN apt-get update && \
    apt-get install -y wget unzip && \
    wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    apt install -y ./google-chrome-stable_current_amd64.deb && \
    rm google-chrome-stable_current_amd64.deb && \
    apt-get clean

# Upgrade pip
RUN pip install --upgrade pip

# Expose the port specified by the environment variable
EXPOSE $PORT

# Command to run the Gunicorn server
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:$PORT"]



