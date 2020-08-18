
PIP=pip3
DATA_DIR=data
DATA_URI=https://archive.ics.uci.edu/ml/machine-learning-databases/00427/Datasets_Healthy_Older_People.zip
DATA_DEST=raw

# := means evaluate, [] are a bit like if, so if curl isn't defined it's false and it will ignore echo curl and go to wget, || equivalent-ish to OR
# so translates to 'if curl is installed, use it, else use wget'
DOWNLOAD:=$(shell [ `command -v curl` ] && echo curl || echo wget)

# curl and wget use different output flags..
ifeq ($(DOWNLOAD), curl)
	DOWNLOAD_FLAG=-o
else
	DOWNLOAD_FLAG=-O
endif

# Initialise development enviromment
init:
	$(PIP) install pipenv --upgrade && \
	export PIPENV_VENV_IN_PROJECT=1 && pipenv install --dev

# Download data
data: FORCE
	mkdir -p $(DATA_DIR)/$(DATA_DEST) && \
	$(DOWNLOAD) $(DATA_URI) $(DOWNLOAD_FLAG) $(DATA_DIR)/data.zip && \
	unzip -ojqq $(DATA_DIR)/data.zip "S[12]_Dataset/d*" -d $(DATA_DIR)/$(DATA_DEST)

FORCE:
