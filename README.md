# parkIt

parkIt is a web application to link homeowners with free driveway space to college students looking to park their car, but are trying to avoid the extremely expensive garages and apartment parking lots

## Setup for localhost

First, clone the code to your system, after that we have two parts to our setup, the backend and the frontend:

1. [Backend](#backend)
2. [Frontend](#frontend)

### Backend <a name="backend"></a>

To run our backend we first need to install our python/django dependencies. This can be done by pip installing our requirements.txt file, I recommend doing this in a python virtual environment but its not necessary.
#### Virtual Env setup
If you would like, to setup the venv you will have to run the following commands:
```
pip install virtualenv
```
Then create a new project folder
```
python -m venv <virtual-environment-name(typically env)>
```
Finally to activate the environment

```
source env/bin/activate
```
to deactivate you can simply type deactivate

#### Setup Backend
You can also skip the venv and just do the following

```
pip install -r requirements.txt
```
Then to launch your backend server just run:
```
python backend/manage.py runserver
```

### Frontend <a name="frontend"></a>

For the frontend to work you must have Node.js installed as well as npm.
Once you install that setup is pretty straightforward:

To install needed JS requirements simply run:
```
npm install
```
Then to run the server navigate to frontend folder and once inside run:

```
npm run dev
```
Navigate to the address, which should be localhost:5173, and it is all setup!



