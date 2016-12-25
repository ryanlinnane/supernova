echo 'build phase'
git fetch origin
git reset --hard origin/master
npm install
gulp deploy
