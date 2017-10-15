echo 'build phase'
git fetch origin
git reset --hard origin/master
npm install
node_modules/gulp/bin/gulp.js deploy