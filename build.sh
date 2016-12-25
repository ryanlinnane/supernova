echo 'build phase'
git pull origin master
npm install
gulp deploy
sudo systemctl restart landing
