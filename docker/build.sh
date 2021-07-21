cd ../
npm install
npm run build
cd ./docker
rm -f app/layouts
rm -f app/partials
mkdir app
cp -r ../dist app
cp ../package.json app/package.json
cp -r ../views app/views
cp -r ../public app/public
PACKAGE_VERSION=$(cat ../package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')
docker build -t hrueger/agkiosk:v$PACKAGE_VERSION .
rm -r app