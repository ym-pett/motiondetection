PIP=pip3
PYTHON=python3
VENV=.venv
VENV_EXISTS = `[ -d "$(VENV)" ]`
IN_VENV = `[ ! -z "$(VIRTUAL_ENV)" ]`

# Initialise development enviromment
init: prerequisites virtualenv

prerequisites:
	@echo Upgrading pip... && $(PIP) install pipenv --upgrade > /dev/null && echo done;

virtualenv:
	@echo Creating virtual environment using $(PYTHON)...; \
	mkdir -p $(VENV); \
	export PIPENV_VENV_IN_PROJECT=1 && pipenv --bare install --dev;

clean-all: clean-venv clean-images

clean-venv: FORCE
	if $(VENV_EXISTS); then \
		echo Removing existing virtual environment; \
		chmod -R u+rwx "$(VENV)"; \
		rm -rf "$(VENV)"; \
		echo Done.; \
	fi;

clean-images: FORCE
	@cd notebooks; \
	rm -f *.png *.jpg *.jpeg *.gif;

FORCE:

