# python-bigquery-run

This Projects creates a simple hello world for google cloud run.

The follow commands are used to deploy them in the cloud run from google cloud shell.


```
gcloud config set project [project-id]
gcloud builds submit — tag gcr.io/[project-id]/[servicename]
gcloud beta run deploy — image gcr.io/[project-id]/helloworld — region us-central1 [servicename]
```

Happy cloud running !!
