# vr-engine
Lehigh University's 2019 "Rewriting The Script" project is designed to test the effects of simulated interracial interactions on people's view of interracial issues.

This repo holds the scripts used with the High Fidelity VR platform to set up the simulation.

This simulation is currently incomplete as of the end of the REU project, but a report of all known issues is in the works and will replace this readme file.
Said report will also contain documentation of how all known relevant aspects of High Fidelity work, to make up for HF's abysmal documentation.

CONTENTS:

Engine: Contains all the scripts responsible for making the simulation run
  -engineCore: Contains all logic for animation and is the main driver coordinating all the other scripts
  -Entities: Contains all scripts that are to be attached to the various types of entities that can be interacted with.
  -Spawners: Contains all scripts that are responsible for spawning the various interactible entities into the environment.
  
Reference_Scripts: Contains all the code snippets that were either just for testing purposes or ended up incomplete. Not much value in this folder aside from a reference point for some of the scripts we learned from.
