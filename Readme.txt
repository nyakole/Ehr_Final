sudo apt install docker
sudo apt install docker-composer
sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker

sudo apt install nodejs
sudo apt install npm

curl -sSL https://bit.ly/2ysbOFE​ | bash -s


cd fabric-samples/test-network
./network.sh down
./network.sh up createChannel -ca -s couchdb
./network.sh deployCC -ccn fabcar -ccp ../../../Ehr_Final/chaincode-javascript/ -ccl javascript

npm install
npm start
Alll Done Now Enjoy