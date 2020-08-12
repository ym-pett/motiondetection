# Initialise development enviromment
PIP=pip3
init:
	$(PIP) install pipenv --upgrade
	export PIPENV_VENV_IN_PROJECT=1 && pipenv install --dev
