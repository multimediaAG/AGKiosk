cd ../
npm install
npx @zeit/ncc build index.ts -o ./docker/app
cd ./docker
rm -f layouts
rm -f partials
cp -r ../views app/views
cp -r ../public app/public
PACKAGE_VERSION=$(cat ../package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')
docker build -t hrueger/agkiosk:v$PACKAGE_VERSION .
rm -r app