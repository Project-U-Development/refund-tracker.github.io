export DEPLOY_DIR="client-build"

# Copy the site directory to a temporary location
mkdir -p $DEPLOY_DIR
cp -a ./client/. $DEPLOY_DIR

# Remove components.html page, it should not appear on production
rm $DEPLOY_DIR/components.html

# Remove node_modules, as we only need them during development
rm -rf $DEPLOY_DIR/node_modules

# We also do not need package.json and package-lock.json on production
rm $DEPLOY_DIR/package.json
rm $DEPLOY_DIR/package-lock.json

# Remove the .html extension from all pages for URLs without .html suffix
for filename in $DEPLOY_DIR/*.html; do
  original="$filename"

  # Get the filename without the path/extension
  filename=$(basename "$filename")
  extension="${filename##*.}"
  filename="${filename%.*}"

  # Move it
  mv $original $DEPLOY_DIR/$filename
done

