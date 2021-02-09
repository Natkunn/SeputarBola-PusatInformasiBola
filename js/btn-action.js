document.addEventListener("DOMContentLoaded", () => {
    let urlParams = new URLSearchParams(window.location.search);
    let idTeam = new URLSearchParams(window.location.search).get('id');
    idTeam = parseInt(idTeam);
    let isFromSaved = urlParams.get("saved");
    let btnSave = document.getElementById("save");
    let btnDelete = document.getElementById("delete");
    if (isFromSaved) {
        btnSave.style.display = 'none';
        btnDelete.style.display = 'block';
        var itemDel = getTeamById();
        getSavedTeamById();
    } else {
        btnDelete.style.display = 'none';
        var item = getTeamById();
    }
    btnSave.onclick = () => {
        console.log("Tombol FAB di klik.");
        item.then(team => {
            saveForLater(team);
            btnSave.style.display = 'none';
            M.toast({ html: 'Tim berhasil disimpan', classes: 'rounded' });
        });
    };
    btnDelete.onclick = () => {
        console.log("Tombol Delete di klik.");
        itemDel.then(() => {
            deleteTeam(idTeam);
        });
    };
});
let btnBack = document.getElementById("go-back");
btnBack.onclick = () => {
    history.go(-1);
}