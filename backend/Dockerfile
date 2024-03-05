FROM python:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the contents of the host's 'backend' directory into the container's '/app' directory
COPY backend/ .

# Copy the requirements.txt file into the container
COPY dependencies.txt .

# Upgrade pip
RUN pip install --upgrade pip

# Install Python dependencies listed in requirements.txt
RUN pip install --trusted-host pypi.python.org --no-cache-dir -r dependencies.txt

# Install additional system dependencies (e.g., Google Chrome)
RUN apt-get update && apt-get install -y wget unzip && \
    wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    apt install -y ./google-chrome-stable_current_amd64.deb && \
    rm google-chrome-stable_current_amd64.deb && \
    apt-get clean

# Set the default command to run when the container starts
CMD ["python", "manage.py"]
