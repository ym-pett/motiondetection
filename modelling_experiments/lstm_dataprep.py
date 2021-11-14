# script for cleaning and formatting of data

from pathlib import Path
import matplotlib.pyplot as plt

import numpy as np
import pandas as pd
from scipy.interpolate import interp1d

DATA_ROOT = Path('..') / 'data'

def interpolate(y, xnew):
    """Linear interpolation."""
    
    # We need at least two samples
    if len(y) == 1:
        y = [y[0]] * 2
        x = [min(xnew), max(xnew)]
    else:
        x = np.linspace(min(xnew), max(xnew), len(y))

    # f is a function which approximates the relationship between x and y
    f = interp1d(x, y)

    # Get the new y values.
    newy = f(xnew)
    return newy

def interpolate_sensor_data(df, n):
    """Iterpolate the sensor data using n points on a normalized time scale."""
    data = {}
    for column in ['participant', 'activity', 'activity_label', 'activity_sequence']:
        data[column] = [df.iloc[0][column]] * n
    t_norm = np.linspace(0, 1, n)
    data['t_norm'] = t_norm
    for column in ['front', 'lateral', 'vertical', 'rssi', 'phase', 'frequency']:
        data[column] = interpolate(df[column].values, t_norm)
    return pd.DataFrame(data)

dfs = []
activity_labels = ['bed', 'chair', 'lying', 'ambulating']
default_names = ['time', 'front', 'vertical', 'lateral', 'sensor_id', 'rssi', 'phase', 'frequency', 'activity']
for data_file in Path(DATA_ROOT).rglob('d[12]p??[FM]'):
    df = pd.read_csv(data_file, names=default_names)
    df['activity_label'] = df['activity'].apply(lambda i: activity_labels[i - 1])
    df['gender_label'] = str(data_file)[-1]
    df['participant'] = data_file.name
    
    # Add a column indicating order of the activities for a particiapnt.
    df = df.sort_values(by=['time'])
    df['activity_sequence'] = (df['activity'].shift(1) != df['activity']).cumsum()
    dfs.append(df)

sensor_df = pd.concat(dfs, axis='index')
sensor_df = sensor_df.sort_values(by=['participant', 'time'])

norm_df = (sensor_df.groupby(['participant', 'activity_sequence'])
           .apply(lambda df: interpolate_sensor_data(df, 128))
           .reset_index(drop=True))
print(norm_df.columns)


