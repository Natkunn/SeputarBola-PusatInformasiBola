const dbPromised = idb.open("seputar-bola", 1, function (upgradeDb) {
    let articlesObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "id"
    });
    articlesObjectStore.createIndex("name", "name", { unique: false });
});
const saveForLater = (team) => {
    dbPromised
        .then(db => {
            let tx = db.transaction("teams", "readwrite");
            let store = tx.objectStore("teams");
            store.put(team);
            return tx.complete;
        })
        .then(() => {
            console.log("Tim berhasil di simpan.");
        });
}
const deleteTeam = (idTeam) => {
    dbPromised
        .then(db => {
            let tx = db.transaction('teams', 'readwrite');
            let store = tx.objectStore('teams');
            store.delete(idTeam);
            return tx.complete;
        })
        .then(() => {
            console.log('Item deleted');
            window.history.go(-1);
        });
    //     const tx = db.transaction("teams", "readwrite")
    //     return tx.objectStore("teams").delete(parseInt(team))
    // })
    // .then(teams => {
    //     console.log('Team berhasil di hapus')
    //     return teams;
    // });
}
const getAll = () => {
    return new Promise(resolve => {
        dbPromised
            .then(db => {
                let tx = db.transaction("teams", "readonly");
                let store = tx.objectStore("teams");
                return store.getAll();
            })
            .then(teams => {
                resolve(teams);
            });
    });
}

const getById = (id) => {
    return new Promise(resolve => {
        dbPromised
            .then(db => {
                let tx = db.transaction("teams", "readonly");
                let store = tx.objectStore("teams");
                return store.get(id);
            })
            .then(team => {
                resolve(team);
            });
    });
}