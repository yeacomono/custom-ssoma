from setuptools import setup, find_packages

with open('requirements.txt') as f:
	install_requires = f.read().strip().split('\n')

# get version from __version__ variable in ssoma/__init__.py
from ssoma import __version__ as version

setup(
	name='ssoma',
	version=version,
	description='This module is for ssoma',
	author='Sebastian',
	author_email='luisi@overskull.pe',
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
