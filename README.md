# trellisdocs

## Run Locally (all at once)
You can build and run the whole application at once using docker/podman compose
```
podman compose up --build
```

NOTE: sometimes the webapp will exit on first initialization, if it does just restart it manually

To run each service individually, look at the README in that service folder.

## Run Locally (individiaul terminals)
Webapp
```
cd webapp 
npm run dev
```

App
```
cd api 
podman compose up -d 
uv run main.py
```

Seed script
```
cd scripts
uv run mock-data.py
```