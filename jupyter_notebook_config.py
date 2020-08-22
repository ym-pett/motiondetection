import os

project_root = os.path.abspath(os.path.dirname(__file__))
data = os.path.join(project_root, 'data')

ipython_dir = os.path.join(project_root, 'notebooks', '.ipython')
os.environ['IPYTHONDIR'] = ipython_dir
startup_dir = os.path.join(ipython_dir, 'profile_default', 'startup')
os.makedirs(startup_dir, exist_ok=True)

with open(os.path.join(startup_dir, '00-startup.py'), 'w') as file_out:
    file_out.write(f'PROJECT_ROOT = "{project_root}"\n')
    file_out.write(f'DATA_ROOT = "{data}"\n')

c.NotebookApp.notebook_dir = './notebooks' # pylint: disable=undefined-variable
