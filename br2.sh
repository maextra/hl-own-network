composer archive create -t dir -n .

composer network install --card PeerAdmin@hlfv1 --archiveFile record-book@0.0.1.bna

composer network start --networkName record-book --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card

composer card import --file networkadmin.card

composer network ping --card admin@record-book

composer-rest-server -c admin@record-book -n never -u true -w true
