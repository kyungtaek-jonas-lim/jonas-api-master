# Project Name
### *`jonas-api-master`*

## Author
- **KyungTaek Lim (Jonas Lim)**
- Software Engineer
- **Email:** kyungtaekjonaslim@gmail.com
- **LinkedIn:** [KyungTaek Jonas Lim](https://www.linkedin.com/in/kyungtaek-jonas-lim)
- **GitHub:** [kyungtaek-jonas-lim](https://github.com/kyungtaek-jonas-lim)

## Description
- Api Integration Service
	- AI
		- [OpenAI](https://github.com/kyungtaek-jonas-lim/jonas-api-master/blob/main/src/routes/v1/ai/openai.ts)
		- [Hugging Face (GPT2)](https://github.com/kyungtaek-jonas-lim/jonas-api-master/blob/main/src/routes/v1/ai/gpt2.ts)
	- [Google OIDC (OAuth2.0)](https://github.com/kyungtaek-jonas-lim/jonas-api-master/blob/main/ref/oidc/google/google_oidc_index.md)
	- [MongoDB](https://github.com/kyungtaek-jonas-lim/jonas-api-master/blob/main/ref/mongodb_index.md)

## Reference
- Node.js
- TypeScript
- Port : 3000

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)

## Introduction
API Integration Service on AWS (Lambda, ECR) (TO-BE)

## Features
- AI
	- OpenAI
	- GPT2 (HuggingFace)

## Library
- `axios`
	- MIT License
- `dotenv`
	- MIT License
- `express`
	- MIT License
- `luxon`
	- MIT License
- `jsonwebtoken`
	- MIT License
- `mongoose`
	- MIT License

## Installation
Follow these instructions to set up your development environment.

1. **Clone the repository:**

   ```bash
   git clone https://github.com/kyungtaek-jonas-lim/jonas-api-master.git
   cd jonas-api-master
   ```

2. **Setup Environment:**
	- Install Library
		```bash
		# Basic
		npm install axios@1.7.9 dotenv@16.4.7 express@4.21.2 luxon@3.5.0 typescript@5.7.2 ts-node@10.9.2 jsonwebtoken@9.0.2 mongoose@8.9.5
		npm install @types/axios @types/dotenv @types/express @types/luxon @types/jsonwebtoken
		```
	- rename `Dockerfile-sample` to `Dockerfile`
	- rename `.env_sample` to `.env`
	- rename `buildspec-sample.yml` to `buildspec.yml`
	- modify `AWS_ACCOUNT_ID`, `AWS_REGION`, `ECR_REPOSITORY_NAME`, `ECS_CONTAINER_NAME` in `buildspec.yml`

3. **Create APIs:**
	- OpenAI
		1. **Sign Up or Log In**: Go to [OpenAI's website](https://platform.openai.com/signup) and create an account or log in to your existing account.
		2. **Navigate to API Settings**: Once logged in, go to the [API section](https://platform.openai.com/account/api-keys).
		3. **Create a New API Key**:
			- Click on **Create new secret key**.
			- Your new API key will be displayed. **Make sure to copy it immediately**, as it will not be shown again.
		4. **Store the API Key**: Keep your key secure and use it in your application to authenticate API requests.
			- Put your API Key into `.env` file or Dockerfile as a environment variable, `OPENAI_API_KEY`.

	- Hugging Face (GPT2)
		1. **Sign Up or Log In**: Go to [Hugging Face's website](https://huggingface.co/join) and create an account or log in to your existing account.
		2. **Access Tokens Page**: Once logged in, navigate to the [Access Tokens page](https://huggingface.co/settings/tokens).
		3. **Create a New Token**:
			- Click on **New token** and provide a name for your token.
			- Select the appropriate permissions (e.g., read, write).
			- Click **Generate token**.
		4. **Save the Token**: Copy the generated token and store it securely, as it will not be shown again.
			- Put your API Key into `.env` file or Dockerfile as a environment variable, `OPENAI_CHAT_COMPLETION_URL`.
	
	- [Google OIDC](https://github.com/kyungtaek-jonas-lim/jonas-api-master/blob/main/ref/oidc/google/google_oidc_1_preperation.md)

4. **Start Application:**
	- Start application
		```bash
		npx ts-node ./src/app.ts
		```
5. **Install MongoDB & mongosh**
	- [MongoDB Install](https://github.com/kyungtaek-jonas-lim/jonastudy/blob/main/concept/no_sql/mongodb/mongodb_install_en.md) ([en](https://github.com/kyungtaek-jonas-lim/jonastudy/blob/main/concept/no_sql/mongodb/mongodb_install_en.md) / [ko](https://github.com/kyungtaek-jonas-lim/jonastudy/blob/main/concept/no_sql/mongodb/mongodb_install_ko.md))
	- Create database & collections using `mongosh`
		```bash
		mongosh
		use jonas-api-master
		show collections
		db.createCollection("<Item>")
		show collections
		```