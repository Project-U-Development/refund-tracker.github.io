export AWS_KEY_ID="$1"
export AWS_SECRET_ACCESS_KEY="$2"
export AWS_DEFAULT_REGION="eu-central-1"
export AWS_BUCKET="$3"

aws s3 cp client-pages/ s3://$AWS_BUCKET --recursive --content-type "text/html" --exclude "*.*" --acl public-read
aws s3 cp client-pages/ s3://$AWS_BUCKET --recursive --exclude "*" --include "*.*" --acl public-read
