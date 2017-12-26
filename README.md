# TRAKT

Website built using Django + React via webpack.

## Running Locally

--------------------------------------------------------------------------------
#### Setup gcloud account and credentials
gcloud lives in ```~/.config/gcloud/```
all your authentication credentials can be found in that folder.  The following command are meant to ensure you have all neseccary creds to either deploy or run the app locally.
Use ```gcloud config list``` to list the current authentication configuration.

- set desired project, in this case it would be 'trakt-183713'
```
gcloud project list
gcloud config set project [PROJECT-ID]
```
- set desired account to ACTIVE
```
gcloud auth list
gcloud config set account scott.m.campbell11@gmail.com
```

- If needed, create an additional 'config' account and make ACTIVE
```
gcloud config list
gcloud config configurations create trakt-config
```

- lastly, run this command to 'authenticate' local machine for use with gcloud API's (cloud storage)
```
gcloud auth application-default login
```
--------------------------------------------------------------------------------
#### Setup virtual environment

- install python 3.6 globally with homebrew
```
brew install python3
```

- navigate to project directory
- create virtual env with python 3.6
```
virtualenv --python=python3.6 env
```

- install python dependancies with pip
```
pip install -r requirements.txt
```

- Install React/Node dependencies
```
npm install
```

- Start the django server
```
python manage.py runserver
```

run the --watch command on webpack to auto generate new bundle.js files when changes are detected in your code.  Terminal command located in package.json.

```
npm run webpack
```
manually compile JavaScript files with

```
npm pack
```

Start a Grunt watcher to compile LESS to CSS when changes are detected

```
grunt
```

### local sqlite3 db authentication

username: scottcampbell
password: developer password

#### test users
username: John
last_name: Lennon
password: Test123
email: lennon@thebeatles.com

### GitLab Authentication

username: scott.m.campbell11
password: developer password
email: scott.m.campbell11@gmail.com


### File Uploads

https://docs.djangoproject.com/en/1.11/topics/http/file-uploads/


### seting CORS on Google Cloud Storage

guide --> https://cloud.google.com/storage/docs/cross-origin

```
gsutil cors set cors-json-file.json gs://trakt
```

----------------------------------------------------------------------------
To connect to gcloud cloud SQL client, run this

```
gcloud auth login
gcloud config set project <PROJECT_ID>
gcloud sql instances describe <INSTANCE_NAME>
```

Initialize gcloud Cloud SQL instance (hint: you will need the 'cloud_sql_proxy' exec file)

```
./cloud_sql_proxy -instances="essy-178102:us-central1:essy-db"=tcp:5432
```

This step establishes a connection from your local computer to your Cloud SQL instance for local testing purposes.

----------------------------------------------------------------------------
Write google app default credentials
```
gcloud auth application-default
```

-------- DEPLOY APP ----------

Copy local static folder and upload to cloud storage static folder
```
python manage.py collectstatic
gsutil rsync -R static/ gs://trakt/static
```

Connect to the Postgres DB in cloud, and do any migrations if neseccary
```
./cloud_sql_proxy -instances="trakt-183713:us-central1:trakt-prod-db-1"=tcp:5432
python manage.py makemigrations
python manage.py migrate
```

Now deploy the app to App Engine

```
gcloud app deploy
```


---- DEBUG APP ------
```
gcloud app --project [PROJECT-ID] instances enable-debug
gcloud app --project [PROJECT-ID] instances disable-debug
