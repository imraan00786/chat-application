npm install express mongoose dotenv cors body-parser socket.io bcryptjs jsonwebtoken multer aws-sdk crypto axios swagger-ui-express @huggingface/inference


MongoDB Vector Search Setup
vector: { type: [Number], default: [] }


And create Atlas Vector Search index on vector field:
{
  "mappings": {
    "dynamic": false,
    "fields": {
      "vector": {
        "dimensions": 384,
        "similarity": "cosine",
        "type": "knnVector"
      }
    }
  }
}
