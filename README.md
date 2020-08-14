# Motion dectection

This repository contains (or at least will contain) some experiments
on data collected from using wearable
sensor data collected for recognition of activities in clinical environments,
available from from the [UCI Machine Learning Repository](https://archive.ics.uci.edu/ml/datasets/Activity+recognition+with+healthy+older+people+using+a+batteryless+wearable+sensor#).

## Development

### Environment

On any system with `python3` (v3.8), `pip3` and `make` installed, setting up
the development environment should be as simple as opening a terminal
at the project root and typing:

```
make init
```

Activating the virtual environment can be done by executing:

```
pipenv shell
```

or

```
. .venv/bin/activate
```

### Data

The data can be automatically downloaded using the following command:

```
make data
```

