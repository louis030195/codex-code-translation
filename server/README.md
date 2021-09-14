# server

This is a basic server built using Rust, Tonic and minimal dependencies.

## Usage

```bash
cargo run
```

## Deploy to Google Cloud Run

```bash
gcloud auth configure-docker

GCP_REGION="my region"
GCP_PROJECT="my project"

# Boring stuff because gcp run can't pull from dockerhub
DOCKERHUB_REGISTRY_TAG=louis030195/codex-code-translation-server:1.0.6
GOOGLE_REGISTRY_TAG=gcr.io/${GCP_PROJECT}/louis030195/codex-code-translation-server:1.0.6
docker pull ${DOCKERHUB_REGISTRY_TAG}
docker tag ${DOCKERHUB_REGISTRY_TAG} ${GOOGLE_REGISTRY_TAG}
docker push ${GOOGLE_REGISTRY_TAG}

gcloud run deploy codex-code-translation \
--image=${GOOGLE_REGISTRY_TAG} \
--platform=managed \
--allow-unauthenticated \
--project=${GCP_PROJECT} \
--region=${GCP_REGION} \
--use-http2 \
--port=9999 \
--set-env-vars=OPENAI_KEY="MY PRECIOUS KEY" \
--set-env-vars=OPENAI_ORG="MY OPENAI ORG" \
--max-instances 1

# Get URL
ENDPOINT=$(\
  gcloud run services list \
  --project=${GCP_PROJECT} \
  --region=${GCP_REGION} \
  --platform=managed \
  --format="value(status.address.url)" \
  --filter="metadata.name=codex-code-translation") 
ENDPOINT=${ENDPOINT#https://} && echo ${ENDPOINT}

# Call
DATA='{"translation": {"input_code": "def generate_gpt_27()", "input_language": "python", "output_language": "java"}}'
grpcurl -proto proto/proto/translations.proto -d "${DATA}" ${ENDPOINT}:443 translations.CodeTranslationService.TranslateCode
```
