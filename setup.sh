docker exec -t pseudobox-db mkdir work
docker cp ./init/backup.sql pseudobox-db:/work/
docker cp ./init/bash.sh pseudobox-db:/work/
docker exec -t pseudobox-db sh ./work/bash.sh

npm install