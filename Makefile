
PIP=pip3
DATA_DIR=data
DATA_URI=https://archive.ics.uci.edu/ml/machine-learning-databases/00427/Datasets_Healthy_Older_People.zip
DATA_DEST=raw

# Initialise development enviromment
init:
	$(PIP) install pipenv --upgrade && \
	export PIPENV_VENV_IN_PROJECT=1 && pipenv install --dev

# Download data
data: FORCE
	mkdir -p $(DATA_DIR)/$(DATA_DEST) && \
	curl $(DATA_URI) --output $(DATA_DIR)/data.zip && \
	unzip -ojqq $(DATA_DIR)/data.zip "S[12]_Dataset/d*" -d $(DATA_DIR)/$(DATA_DEST)

FORCE:
