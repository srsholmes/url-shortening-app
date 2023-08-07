FROM node:16

# Add Yarn globally installed packages to the PATH
ENV PATH="/root/.yarn/bin:$PATH"
# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the application code to the working directory
COPY . .

# Specify the command to run when the container starts
CMD ["yarn", "dev"]
